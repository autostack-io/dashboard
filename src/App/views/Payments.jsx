import React from "react";

import axios from "axios";
import update from "react-addons-update";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

import PaymentsMethods from '../components/payments/PaymentsMethods';
import PaymentsInformation from '../components/payments/PaymentsInformation';

function getSteps(user) {
  return [`Bem vindo, ${user.name}!`, 'Selecione um meio de pagamento', 'Concluir'];
}

function GetStepContent(props) {
	const { activeStep, user, invoice, payment } = props;	

  switch (activeStep) {
    case 0:
      return <PaymentsInformation user={user} invoice={invoice} />;
		case 1:
			return <PaymentsMethods invoice={invoice} payment={payment} />;
		case 2:
			if (activeStep) {
				return (
					<div>
						Processado!
					</div>
				);
			} else {
				return (
					<div>
						Processando...
					</div>
				);
			}

    default:
      return 'Unknown step';
  }
}

const styles = theme => ({
	loading: {
		top: 0,
		height: '100%',
    width: '100%',
		position: 'fixed',
		display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
	},
	progress: {
		
  },
	appBar: {
		marginBottom: theme.spacing.unit,
	},
  content: {
		margin: '0 auto',
		maxWidth: '970px',
	},
	controllers: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
	},
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
	},
	wrapper: {
    margin: theme.spacing.unit,
		position: 'relative',
		display: 'inline',
  },
});

class Payments extends React.Component {
	state = {
		activeStep: 0,
		loading: true,
		loadingButton: false,
		user: {
			name: null,
		},
		items: [],
		payment: {
			senderHash: null,
			paymentMethods: null,
			brand: null,
			fields: {
				creditCard: '',
				name: '',
				dueDate: '',
				cvv: '',
				cpf: '',
				birthDate: '',
				tel: '',
				handleChange: name => event => {
					let value = event.target.value;

					switch (name) {
						case "creditCard":
							value = value.replace(/\s/g,'');	
							
							this.setState(state => {
								return update(state, {
									payment: {fields: {[name]: {$set: value}}}
								});
							});
							
							if (value.length === 6) {
								window.PagSeguroDirectPayment.getBrand({
									cardBin: value,
										success: (response) => {
											this.setState(state => {
												return update(state, {
													payment: {brand: {$set: response.brand}}
												});
											});
										},
										error: (response) => {
											this.setState(state => {
												return update(state, {
													payment: {brand: {$set: response}}
												});
											});
										},
										complete: (response) => {}
									});
							} else if (value.length < 6) {
								this.setState(state => {
									return update(state, {
										payment: {brand: {$set: null}}
									});
								});
							}
							break;
						case "name":
							if(/^[a-zA-Z\s]*$/g.test(value)) {
								value = value.replace(/^\s*\s*$/,'');
								value = value.replace(/ +(?= )/g,'');
								this.setState(state => {
									return update(state, {
										payment: {fields: {[name]: {$set: value.toUpperCase()}}}
									});
								});
							}
							break;
						case "cvv":
							if(/^\d{0,6}$/g.test(value)) {
								this.setState(state => {
									return update(state, {
										payment: {fields: {[name]: {$set: value}}}
									});
								});
							}
							break;
						default:
							this.setState(state => {
								return update(state, {
									payment: {fields: {[name]: {$set: value}}}
								});
							});
							break;
					}
				},
			},
		},
	};

  handleNext = () => {
		switch (this.state.activeStep) {
			case 1:
				if (!this.state.loadingButton) {
					this.setState({
						loadingButton: true,
					},
					() => {
						const { payment } = this.state;

						window.PagSeguroDirectPayment.createCardToken({
							cardNumber: payment.fields.creditCard,
							brand: payment.brand.name,
							cvv: payment.fields.cvv,
							expirationMonth: payment.fields.dueDate.split("/")[0],
							expirationYear: payment.fields.dueDate.split("/")[1],
							success: (response) => {
								axios.post('http://localhost:8000/api/v1/payments/pagseguro/create', {
									sender: {
										hash: payment.senderHash,
									},
									paymentMethod: {
										creditCard: {
											token: response.card.token,
											holder: {
												name: payment.fields.name,
												birthDate: payment.fields.birthDate,
												documents: [{
													type: "CPF",
													value: payment.fields.cpf,
												}],
												phone: {
													areaCode: "61",
													number: "983490102",
												},
											},
										},
									},
								}, {
									headers: {
										api_token: 'zjuWfEHGlsECNO8eAYh4WU0ijGjg8OhN798f1UR9Wd2tC7i1Jay5G4NSZFEM6YYA',
									}
								}).then(response => {
									console.log(response);
									this.setState(state => ({
										loadingButton: false,
										activeStep: state.activeStep + 1,
									}));
								}).catch(error => {
									console.log(error);
								}).then(() => {});
							},
							error: (response) => {
								console.log(response);
							},
							complete: (response) => {}
						});
					});
				}
				break;	
			default:
				this.setState(state => ({
					activeStep: state.activeStep + 1,
				}));
				break;
		}
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
	};
	
	componentDidMount() {
		const { match } = this.props;

		axios.get('http://localhost:8000/api/pagseguro/session')
		.then(response => {
			window.PagSeguroDirectPayment.setSessionId(response.data.id);
			window.PagSeguroDirectPayment.onSenderHashReady(response => {
				this.setState(state => {
					return update(state, {
						payment: {senderHash: {$set: response.senderHash}},
					});
				});
			});
		}).catch(error => {
			console.log(error);
		}).then(() => {});

		axios.get('http://localhost:8000/api/payments/payment/' + match.params.id)
		.then(response => {
			console.log(response.data);

			this.setState(state => {
				return update(state, {
					user: {name: {$set: response.data.profile.name}},
					items: {$push: [{
						name: response.data.accession.plan.name,
						value: response.data.payment.value,
					}]},
					loading: {$set: false},
				});
			});

		}).catch(error => {
			console.log(error);
		}).then(() => {});
	}

  render() {
		const { classes } = this.props;

		const { activeStep, loading, loadingButton, user, invoice, payment } = this.state;		

		const steps = getSteps(user);

    return (
      <div className={classes.root}>
				{loading ? (
					<div className={classes.loading}>
						<CircularProgress />
					</div>
				) : (
					<div>
						<div className={classes.content}>
							<Stepper activeStep={activeStep} alternativeLabel>
								{steps.map(label => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
							<div className={classes.body}>
								{this.state.activeStep === steps.length ? (
									<div>
										<Typography className={classes.instructions}>Todos os passos foram completados</Typography>
										<div className={classes.controllers}>
											<Button onClick={() => {alert("asd")}}>Proseguir</Button>
										</div>
									</div>
								) : (
									<div>
										<div className={classes.instructions}>
											<GetStepContent activeStep={activeStep} user={user} invoice={invoice} payment={payment} />
										</div>
										<div className={classes.controllers}>
											<Button
												disabled={activeStep === 0}
												onClick={this.handleBack}
												className={classes.backButton}
											>
												Voltar
											</Button>
											<div className={classes.wrapper}>
												<Button
													variant="contained"
													color="primary"
													disabled={loadingButton}
													onClick={this.handleNext}
												>
													{activeStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
												</Button>
												{loadingButton && <CircularProgress size={24} className={classes.buttonProgress} />}
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
      </div>
    );
  }
}

Payments.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(Payments);

//<Button onClick={this.handleReset}>Proseguir</Button>

/*
<Paper elevation={1}>
						<div style={{ padding: 8 * 3 }}>
							<Typography variant="h4" component="h3">
							Seja bem-vindo!
							</Typography>
							<Typography component="p">
								Estamos contentes em te-lo conosco. Mas para que possamos dá continuidade à contratação de serviços, é necessário concluir algumas etapas.
							</Typography>
							<Typography component="p">
								Ao clicar no botão "Próximo", você concorda com nossos <Link to="#">termos de contratação de serviços</Link>.
							</Typography>	
						</div>
					</Paper>
*/
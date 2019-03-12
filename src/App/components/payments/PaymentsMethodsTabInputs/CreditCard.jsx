import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
	CreditCard as CreditCardIcon,
	Mastercard,
	Visa,
	Amex,
	Elo,
} from '../../PaymentFont/PaymentFont';


import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const styles = theme => ({
	margin: {
    margin: theme.spacing.unit,
  },
});

class CreditCard extends Component {
	state = {
		brand: null,
		error: false,
	};

	componentDidUpdate() {
		const { payment } = this.props;

		if (this.state.brand && payment.fields.creditCard.length < 6) {
			this.setState({
				brand: null,
				error: false,
			});
		}

		if (payment.brand && payment.fields.creditCard.length >= 6 && !this.state.brand) {
			if (payment.brand.error) {
				if (!this.state.error) {
					this.setState({
						brand: <CreditCardIcon />,
						error: true,
					});
				}
			} else {
				switch (payment.brand.name.toLowerCase()) {
					case "mastercard":
						this.setState({
							brand: <Mastercard />,
						});
						break;
					case "visa":
						this.setState({
							brand: <Visa />,
						});
						break;
					case "amex":
						this.setState({
							brand: <Amex />,
						});
						break;
					case "elo":
						this.setState({
							brand: <Elo />,
						});
						break;
					default:
						this.setState({
							brand: <CreditCardIcon />,
						});
						break;
				}

				this.setState({
					error: false,
				});
			}
		}
	}

  render() {
		const { classes, payment } = this.props;
		const { brand, error } = this.state;

    if (error) {
			return (
				<FormControl error required fullWidth className={classes.margin}>
					<InputLabel htmlFor="cc">Número do cartão</InputLabel>
					<Input
						value={payment.fields.creditCard}
						onChange={payment.fields.handleChange('creditCard')}
						id="cc"
						placeholder="0000 0000 0000 0000"
						inputComponent={TextMaskCustom}
						startAdornment={
							<InputAdornment position="start">
								{brand ? (
									brand
								) : (
									<CreditCardIcon />
								)}
							</InputAdornment>
						}
					/>
				</FormControl>
			);
		} else {
			return (
				<FormControl required fullWidth className={classes.margin}>
					<InputLabel htmlFor="cc">Número do cartão</InputLabel>
					<Input
						value={payment.fields.creditCard}
						onChange={payment.fields.handleChange('creditCard')}
						id="cc"
						placeholder="0000 0000 0000 0000"
						inputComponent={TextMaskCustom}
						startAdornment={
							<InputAdornment position="start">
								{brand ? (
									brand
								) : (
									<CreditCardIcon />
								)}
							</InputAdornment>
						}
					/>
				</FormControl>
			);
		}
  }
}

CreditCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CreditCard);

//"https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/visa.png"

/*
<TextField
				required
				id="cc"
				label="Número do cartão"
				placeholder="0000 0000 0000 00000"
				className={classes.textField}
				margin="normal"
				value={numberformat}
        onChange={this.handleChange('numberformat')}
				InputProps={{
          startAdornment: (
            <InputAdornment position="start">
        			{brand ? (
								<Img style={{height: '16px'}} src={brand} />
							) : (
								<CreditCardIcon />
							)}
            </InputAdornment>
          ),
        }}
			/>
*/
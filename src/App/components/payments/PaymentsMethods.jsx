import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import PaymentsMethodsTab from "./PaymentsMethodsTab";

const styles = theme => ({
	loading: {
		top: 0,
		height: '100%',
    width: '100%',
		display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
	},
	margin: {
    margin: theme.spacing.unit,
  },
});

class PaymentsMethods extends Component {

	state = {
		loading: true,
	};

	componentDidMount() {
		this.setState({
			loading: false,
		});
	}

  render() {
		const { loading } = this.state;
		const { classes, payment } = this.props;
		

    return (
			<div>
				{loading ? (
					<div className={classes.loading}>
						<CircularProgress />
					</div>
				) : (
					<PaymentsMethodsTab payment={payment} />
				)}
			</div>
    );
  }
}

PaymentsMethods.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PaymentsMethods);

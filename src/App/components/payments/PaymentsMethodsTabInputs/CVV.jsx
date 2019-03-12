import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit,
	},
});

class CVV extends Component {
	render() {
		const { classes, payment } = this.props;

		return (
			<FormControl required fullWidth className={classes.margin}>
				<InputLabel shrink htmlFor="cvv">Código de segurança</InputLabel>
				<Input
					value={payment.fields.cvv}
					onChange={payment.fields.handleChange("cvv")}
					id="cvv"
					placeholder="CVV"
				/>
			</FormControl>
		);
	}
}

CVV.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CVV);
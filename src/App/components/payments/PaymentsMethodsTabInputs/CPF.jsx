import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const TextMaskCustom = (props) => {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
			placeholderChar={"\u2000"}
		/>
	);
};

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
};

const styles = theme => ({
	margin: {
		margin: theme.spacing.unit,
	},
});

class CPF extends Component {
	render() {
		const { classes, payment } = this.props;

		return (
			<FormControl required fullWidth className={classes.margin}>
				<InputLabel shrink htmlFor="cpf">CPF do portador</InputLabel>
				<Input
					value={payment.fields.cpf}
					onChange={payment.fields.handleChange("cpf")}
					id="cpf"
					placeholder="000.000.000-00"
					inputComponent={TextMaskCustom}
				/>
			</FormControl>
		);
	}
}

CPF.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CPF);
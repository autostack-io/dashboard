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
			mask={[/[0-1]/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
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

class DateInput extends Component {
	render() {
		const { classes, payment } = this.props;

		return (
			<FormControl required fullWidth className={classes.margin}>
				<InputLabel shrink htmlFor="dueDate">Validade do cartão</InputLabel>
				<Input
					value={payment.fields.dueDate}
					onChange={payment.fields.handleChange("dueDate")}
					id="dueDate"
					placeholder="MM/AAAA"
					inputComponent={TextMaskCustom}
				/>
			</FormControl>
		);
	}
}

DateInput.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DateInput);
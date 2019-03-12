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
			mask={["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
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

class Tel extends Component {
	render() {
		const { classes, payment } = this.props;

		return (
			<FormControl required fullWidth className={classes.margin}>
				<InputLabel shrink htmlFor="tel">Telefone do portador</InputLabel>
				<Input
					value={payment.fields.Tel}
					onChange={payment.fields.handleChange("Tel")}
					id="tel"
					placeholder="(00) 00000-0000"
					inputComponent={TextMaskCustom}
				/>
			</FormControl>
		);
	}
}

Tel.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Tel);
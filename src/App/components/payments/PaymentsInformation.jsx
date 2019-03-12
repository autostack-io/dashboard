import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import PaymentsInformationTable from "./PaymentsInformationTable";

const styles = theme => ({

});

function PaymentsInformation(props) {
	return (
		<PaymentsInformationTable {...props} />
	);
}

PaymentsInformation.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PaymentsInformation);


/*
	import axios from "axios";

componentDidMount() {
	axios.post('http://localhost:8000/v1/payments/pagseguro/session', {
		token: "A3EE56337FB7431084821C2FFAA6230E",
	}).then(response => {
		
	}).catch(error => {
		console.log(error);
	});
}
*/
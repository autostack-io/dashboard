import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
}

function createRow(id, desc, stats, plan, price) {
	return { id, desc, stats, plan, price };
}

function subtotal(items) {
	return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
});

function SpanningTable(props) {
	const { classes, invoice} = props;

	const rows = invoice.itens.map((row, id) => createRow(id, ...row));
	const TAX_RATE = 0.00;
	const invoiceSubtotal = subtotal(rows);
	const invoiceTaxes = TAX_RATE * invoiceSubtotal;
	const invoiceTotal = invoiceSubtotal - invoiceTaxes;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Serviços</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Plano</TableCell>
						<TableCell align="right">Valor</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id}>
							<TableCell>{row.desc}</TableCell>
							<TableCell align="right">{row.stats}</TableCell>
							<TableCell align="right">{row.plan}</TableCell>
							<TableCell align="right">{ccyFormat(row.price)}</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell rowSpan={3} />
						<TableCell colSpan={2}>Subtotal</TableCell>
						<TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Descontos</TableCell>
						<TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
						<TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Total</TableCell>
						<TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Paper>
	);
}

SpanningTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpanningTable);
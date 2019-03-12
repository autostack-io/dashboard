import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";

const WithWidth = toRenderProps(withWidth());

const styles = theme => ({
	root: {
		width: "100%",
		//marginTop: theme.spacing.unit * 3,
		//overflowX: 'auto',
	},
	table: {
		//minWidth: 700,
		//marginTop: theme.spacing.unit,
	},
	tableRow: {
		cursor: "pointer",
	},
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
	id += 1;

	switch (carbs.toLowerCase()) {
	case "ativo":
		carbs = <div style={{color: "green"}}>Ativo</div>;
		break;

	case "suspenso":
		carbs = <div style={{color: "orange"}}>Suspenso</div>;
		break;
	default:
		break;
	}

	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData("ocit.com.br", "Starter", "Mensal", "Ativo", "15/02/2019"),
	createData("ocit.com.br", "Starter", "Mensal", "Ativo", "15/02/2019"),
	createData("ocit.com.br", "Starter", "Mensal", "Ativo", "15/02/2019"),
	createData("ocit.com.br", "Starter", "Mensal", "Ativo", "15/02/2019"),
	createData("ocit.com.br", "Starter", "Mensal", "Ativo", "15/02/2019"),
	createData("novasecurity.com.br", "Pro", "Anual", "Suspenso", "-"),
];


function SimpleTable(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<WithWidth>
				{({ width }) => {
					console.log(width);

					switch (width) {
					case "xs": return (
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Domínio</TableCell>
									<TableCell align="right">Status</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow 
										key={row.id}
										className={classes.tableRow} 
										onClick={() => {console.log("teste:" + row.id);}}
									>
										<TableCell component="th" scope="row">{row.name}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					);
					case "sm": return (
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Domínio</TableCell>
									<TableCell align="right">Plano</TableCell>
									<TableCell align="right">Status</TableCell>
									<TableCell align="right">Próximo faturamento</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow 
										key={row.id}
										className={classes.tableRow} 
										onClick={() => {console.log("teste:" + row.id);}}
									>
										<TableCell component="th" scope="row">{row.name}</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					);
					default: return (
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Domínio</TableCell>
									<TableCell align="right">Plano</TableCell>
									<TableCell align="right">Preíodo de faturamento</TableCell>
									<TableCell align="right">Status</TableCell>
									<TableCell align="right">Próximo faturamento</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow 
										key={row.id}
										className={classes.tableRow} 
										onClick={() => {console.log("teste:" + row.id);}}
									>
										<TableCell component="th" scope="row">{row.name}</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					);
					}
				}}
			</WithWidth>
		</div>
	);
}

SimpleTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
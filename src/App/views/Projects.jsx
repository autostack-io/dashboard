import React from "react";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SimpleTable from "../components/SimpleTable"

const styles = theme => ({
  root: {
		padding: '0 24px',
		marginTop: theme.spacing.unit * 3,
  },
});

class Projects extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={12} sm={3} md={6}>
						<Typography variant="h6">
							Meus projetos
						</Typography>
					</Grid>

					<Grid item xs={12} sm={5} md ={4}>
						<TextField
							id="standard-full-width"
							placeholder="Digite um nome de domínio"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sm={4} md={2}>
						<Button fullWidth variant="contained" color="primary" className={classes.button}>
							Criar Projeto
						</Button>
					</Grid>

					<Grid item xs={12}>
						<SimpleTable />
					</Grid>
				</Grid>
			</div>
		);
	}
}

Projects.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Projects);
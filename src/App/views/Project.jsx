import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
	root: {
		padding: "0 24px",
		marginTop: theme.spacing.unit * 3,
	},
});

class Projects extends React.Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid container spacing={8}>
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant="h5" component="h3">
									This is a sheet of paper.
								</Typography>
								<Typography component="p">
									Paper can be used to build surface or other elements for your application.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant="h5" component="h3">
									This is a sheet of paper.
								</Typography>
								<Typography component="p">
									Paper can be used to build surface or other elements for your application.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant="h5" component="h3">
									This is a sheet of paper.
								</Typography>
								<Typography component="p">
									Paper can be used to build surface or other elements for your application.
								</Typography>
							</CardContent>
						</Card>
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
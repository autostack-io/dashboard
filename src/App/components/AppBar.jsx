import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Redirect } from "react-router-dom";

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	toolbar: {
		paddingLeft: 16,
		paddingRight: 16,
	},
};

function ButtonAppBar(props) {
	const { classes, toggleDrawer, auth } = props;

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar variant="dense" className={classes.toolbar}>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={toggleDrawer("left", true)}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Autostack
					</Typography>
					{auth.isAuthenticated ? (
						<Button color="inherit" onClick={auth.authenticate()}>Logout</Button>
					) : (
						<Button color="inherit" onClick={() => <Redirect to={{ pathname: "/login"}}/>}>Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

ButtonAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
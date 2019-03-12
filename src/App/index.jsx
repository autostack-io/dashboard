import React, { Component } from "react";

import update from "react-addons-update";

import "typeface-roboto";

import CssBaseline from "@material-ui/core/CssBaseline";

import {
	MuiThemeProvider,
	createMuiTheme
} from "@material-ui/core/styles";

import pink from "@material-ui/core/colors/pink";

import {
	BrowserRouter as Router,
	Route,
	Redirect
} from "react-router-dom";

import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import Project from "./views/Project";
import Projects from "./views/Projects";
import Payments from "./views/Payments";

import { isAuthenticated } from "./authenticate";

const auth = {
	isAuthenticated: true,
	authenticate(cb) {
		this.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		this.isAuthenticated = false;
		setTimeout(cb, 100);
	}
};

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				auth.isAuthenticated ? (
					<div>
						<Component {...props} />
					</div>
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
}

const theme = createMuiTheme({
	palette: {
		//type: 'dark',
		primary: {
      main: '#1e88e5',
    },
		secondary: pink,
	},
	typography: {
		useNextVariants: true,
	},
});

class App extends Component {
	componentWillMount() {
		isAuthenticated().then((res) => {
			
		}, (err) => {
			if (err) {
				
			} else {
				
			}
		});
	}

	state = {
		AppDrawer: {
			top: false,
			left: false,
			bottom: false,
			right: false,
		},
		login: {
			user: "",
			pass: "",
		},
	};

	toggleDrawer = (side, open) => () => {
		this.setState({
			AppDrawer: {
				[side]: open,
			}
		});
	};

	login = {
		handleChange(event) {
			this.setState(state => {
				return update(state, {
					login: {user: {$set: event.target.value}},
				});
			});
		},
		handleSubmit(event) {
			//alert('A name was submitted: ' + this.state.value);
			event.preventDefault();
		}
	}

	render() {
		return (
			<React.Fragment>
				<CssBaseline />
				<MuiThemeProvider theme={theme}>
					<div className="App">
						<Router>
							<div>
								<Route path="/login" render={props => <Login {...props} auth={auth} login={this.login}  />} />
								<PrivateRoute path="/" exact component={Dashboard} />
								<PrivateRoute path="/projects" exact component={Projects} />
								<PrivateRoute path="/projects/project/:id" component={Project} />
								<PrivateRoute path="/payments" exact component={Payments} />
								<PrivateRoute path="/payments/:id" component={Payments} />
							</div>
						</Router>
					</div>
				</MuiThemeProvider>
			</React.Fragment>
		);
	}
}

export default App;

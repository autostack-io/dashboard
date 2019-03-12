import React from "react";

import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.toggleDrawer = props;
	}

	render() {
		return (
			<div>
				<AppBar toggleDrawer={this.toggleDrawer} />
				<AppDrawer title="Dashboard">
					<div>asd</div>
				</AppDrawer>
			</div>
		);
	}
}

export default Dashboard;
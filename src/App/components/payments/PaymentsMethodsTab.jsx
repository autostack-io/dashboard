import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import CreditCard from "./PaymentsMethodsTabInputs/CreditCard";
import Name from "./PaymentsMethodsTabInputs/Name";
import DueDate from "./PaymentsMethodsTabInputs/DueDate";
import CVV from "./PaymentsMethodsTabInputs/CVV";
import Tel from "./PaymentsMethodsTabInputs/Tel";
import CPF from "./PaymentsMethodsTabInputs/CPF";
import BirthDate from "./PaymentsMethodsTabInputs/BirthDate";

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
  },
});

class PaymentsMethodsTab extends React.Component {
  state = {
		value: 0,
		pr: true,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
		const { classes, theme, payment } = this.props;
		
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Cartão de crédito" />
						<Tab label="Débito online" />
            <Tab label="Boleto bancário" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
						<Grid container spacing={24}>
							<Grid item xs={6}>
								<CreditCard payment={payment}/>
							</Grid>
							<Grid item xs={6}>
								<Name payment={payment}/>
							</Grid>
							<Grid item xs={6}>
								<DueDate payment={payment}/>
							</Grid>
							<Grid item xs={6}>
								<CVV payment={payment}/>
							</Grid>
							<Grid item xs={4}>
								<CPF payment={payment}/>
							</Grid>
							<Grid item xs={4}>
								<BirthDate payment={payment}/>
							</Grid>
							<Grid item xs={4}>
								<Tel payment={payment}/>
							</Grid>
							<Grid item xs={12}>
								<FormGroup row>
									<FormControlLabel
										control={
											<Switch
												checked={this.state.pr}
												//onChange={this.handleChange('checkedB')}
												value="pr"
												color="primary"
											/>
										}
										label="Renovar automaticamente (pagamento recorrente)"
									/>
								</FormGroup>
							</Grid>
						</Grid>
					</TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

PaymentsMethodsTab.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PaymentsMethodsTab);
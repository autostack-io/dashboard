import React from "react";

import { Redirect } from "react-router-dom";

import PropTypes from "prop-types";

import authenticate from "./authenticate";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Mail from "@material-ui/icons/Mail";
import Lock from "@material-ui/icons/Lock";

const styles = theme => ({
  root: {
    margin: "0 auto",
    maxWidth: 350,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
  box: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  }
});

class Login extends React.Component {
  state = {
    user: "",
    pass: "",
		redirectToReferrer: false,
  };
  
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    authenticate(this.state.user, this.state.pass).then((res) => {
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("expires_in", res.data.expires_in);
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);
      
      this.setState({ redirectToReferrer: true });
    }, (err) => {
      console.log(err);
    });

    event.preventDefault();
  }

  render() {
    const { classes } = this.props;

    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
        <div className={classes.root}>
          <div className={classes.box}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                fullWidth
                required
                id="email"
                label="E-mail"
                placeholder="Digite seu endereço de e-mail"
                type="email"
                autoComplete="username email"
                name="user"
                value={this.state.user}
                onChange={this.handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                required
                id="password"
                label="Senha"
                placeholder="Digite sua senha"
                helperText="Não compartilhe com estranhos."
                type="password"
                autoComplete="current-password"
                name="pass"
                value={this.state.pass}
                onChange={this.handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />

              <Button type="submit" variant="contained" color="primary" className={classes.button} fullWidth>
                Entrar
              </Button>
            </form>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
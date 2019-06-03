import React, {Component} from 'react'
import {render} from 'react-dom'
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import LoginRegister from '../Signin';
import Button from '@material-ui/core/Button';
import { accountActions } from '../../_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    // padding: 20
  },
  footer: {
    padding: '10px'
  },
  controls: {
    margin: [[theme.spacing.unit * 2, 0]],
    padding: theme.spacing.unit
  },
  
});

class SigninForm extends Component {
  state = {
    disableLocal: false,
    disableRegister: true,
    disableRegisterProviders: true,
    registerFailed: '',
    submitted: false
  };

  render() {
    const {classes, errors} = this.props;
    console.log("ERRORS:",errors);
    const header = (
        <div>
        <div className="row">
            
        </div>
        <div className="register_title" style={{marginTop:"50px"}}>
            <p style={{fontSize: '30px'}}>
                Log In
            </p>
        </div>
        </div>
        
    );

    const footer = (
      <div className={classes.footer}>
        <img className="foot_image float-right" src="/assets/image/Bitmap.png" style={{width:"40%"}}></img>
      </div>
    );

    return (
      <div className={classes.root} style={{height: '500px'}}>
        <CssBaseline/>
        <LoginRegister header={header} footer={footer}
                       onLogin={this.handleLogin}
                       onLoginWithProvider={this.handleLoginWithProvider}
                       onRegister={this.handleRegister.bind(this)}
                       onRegisterWithProvider={this.handleRegisterWithProvider}

                       disableLocal={this.state.disableLocal}
                       disableRegister={this.state.disableRegister}
                       disableRegisterProviders={this.state.disableRegisterProviders}
        />
       
      </div>
    );
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
  };

  handleLogin = content => {
    alert(`Logging in with content '${JSON.stringify(content)}'`);
  };

  handleLoginWithProvider = providerId => {
    alert(`Logging in with provider '${providerId}'`);
  };

  handleRegister = content => {
    this.setState({ submitted: true });
    const { dispatch } = this.props;
    dispatch(accountActions.login(content['email'], content['password']));
  };

  handleRegisterWithProvider = providerId => {
    alert(`Registering with provider '${providerId}'`);
  };
}

function mapStateToProps(state) {
  const { loggingIn, loggingError } = state.authentication;
  const { alert } = state;
  return {
    loading: loggingIn,
    errors: loggingError,
    alert,
  };
}


export default withRouter(connect(mapStateToProps)(withStyles(styles)(SigninForm)));
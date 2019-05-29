import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import ValidatedTextField from './components/ValidatedTextField';
import LoginRegisterError from "./components/LoginRegisterError";

const styles = theme => ({
  root: {
		flexGrow: 1,
		width: "70%",
		margin: 'auto',
		marginTop: theme.spacing.unit * 8
	},
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  field: {
    marginTop: theme.spacing.unit
  },
  actions: {
    marginTop: theme.spacing.unit * 2
  }
});


class LocalUserRegister extends Component {
  static propTypes = {
    onRegister: PropTypes.func,
    registerFailed: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    }
  }

  render() {
    const {
      classes,
      registerFailed,
      errors
    } = this.props;
    const {canSubmit} = this.state;
    return (
        <div className={classes.root}>
          <Formsy className={classes.form}
                  onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}>
            <Grid container spacing={24}>
							<Grid item xs={12} sm={4}>
								<div>         
								<ValidatedTextField
										name="firstname"
										autoComplete="firstname"
										validations="minLength:2"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="First Name"
								/>

								<ValidatedTextField
										name="lastname"
										autoComplete="lastname"
										validations="minLength:2"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Last Name"
								/>

								<ValidatedTextField
										name="email"
										autoComplete="email"
										validations="minLength:2"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Email"
								/>
								
								</div>
							</Grid>

							<Grid item xs={12} sm={4}>         
								<ValidatedTextField
										name="brasize"
										autoComplete="brasize"
										validations="minLength:1"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Bra Size"
								/>

								<ValidatedTextField
										name="pantysize"
										autoComplete="pantysize"
										validations="minLength:1"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Panty Size"
								/>
								<ValidatedTextField
										name="bottomsize"
										autoComplete="bottomsize"
										validations="minLength:1"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Bottom Size"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>         
								<ValidatedTextField
										name="topsize"
										autoComplete="topsize"
										validations="minLength:1"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Top Size"
								/>

								<ValidatedTextField
										type="password"
										name="password"
										autoComplete="new-password"
										validations="minLength:2"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Create a password"
								/>

								<ValidatedTextField
										type="password"
										name="repeated_password"
										autoComplete="new-password"
										validations="equalsField:password"
										validationErrors={{
											equalsField: "Needs to be the same password as above"
										}}
										required
										className={classes.field}
										label="Enter password again"
								/>
							</Grid>

            </Grid>

            {
              registerFailed && <LoginRegisterError message={errors.email}/>
            }

            {
              registerFailed && <LoginRegisterError message={errors.password1}/>
            }

            <div className="header_title">
              <Button classes={{label:"createAccoSub"}} type="submit"
                  		>Create Account</Button>
							
            </div>

          </Formsy>
        </div>
    );
  }

  disableSubmit = () => {
    this.setState({canSubmit: false})
  };

  enableSubmit = () => {
    this.setState({canSubmit: true})
  };

  submit = model => {
    if (this.props.onRegister) {
      this.props.onRegister(model);
    }
  }

}

function mapStateToProps(state) {
  const { registering, errors } = state.registration;
  console.log("Register Error:",state.registration);
  return {
    loading: registering,
    errors: errors
  };
}

export default connect(mapStateToProps)(withStyles(styles)(LocalUserRegister));

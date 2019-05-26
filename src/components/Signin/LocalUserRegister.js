import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Formsy from 'formsy-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

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
      registerFailed
    } = this.props;
    const {canSubmit} = this.state;
    return (
        <div className={classes.root} style={{marginTop:"30px"}}>
          <Formsy className={classes.form}
                  onValid={this.enableSubmit} onInvalid={this.disableSubmit}
                  onValidSubmit={this.submit}>
            <Grid container spacing={12}>
							<Grid item xs={12} sm={12}>         
								<ValidatedTextField
										name="topsize"
										autoComplete="topsize"
										validations="minLength:1"
										validationErrors={{
											minLength: "Too short"
										}}
										required
										className={classes.field}
										label="Email Address"
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
										label="Password"
								/>
							</Grid>

            </Grid>

            {
              registerFailed && <LoginRegisterError message={registerFailed}/>
            }

            <div className="header_title" style={{marginTop:"50px"}}>
              <Button classes={{label:"createAccoSub"}} type="submit" style={{width:'95%'}}
                  		>Log in</Button>
							
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

export default withStyles(styles)(LocalUserRegister);

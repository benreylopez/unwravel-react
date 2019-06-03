import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

import RegisterForm from "../RegisterForm"
import LoginForm from "../LoginForm"
import SigninForm from "../SigninForm"
import Grid from '@material-ui/core/Grid';

import { accountActions } from '../../_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

const Styles = theme => ({
    login: {
        width: "41.78px",
        height: "17px",
        font_family: "Montserrat",
        font_size: "24px",
        font_weight: 400,
        line_height: "17px",
        text_align: "center",
        letter_spacing: "0.3818184px",
    },

    paper: {
    
    },
});
class ProductPage extends  Component {

	static defaultProp = {
		user: { loggedIn: false, user: { key: null } },
	}
	
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			setOpen: false,
			loved:true,
			bras:false,
			panties:false,
			lingerie:false
		}
	}

	componentDidMount() {
		const { user, dispatch } = this.props;
		dispatch(accountActions.me(user));
	}

	handleChange = name => event => {
		this.setState({[name]: event.target.checked});
		console.log(this.state);
	}


  render() {
	const {classes, account} = this.props;
	const {loved, bras, panties, lingerie} = this.state;
    return (
      <div className = "Bigcontainer">
        <div className="row">
            <div className="col-md-4">
                <img src="/assets/image/logo.png"></img>
            </div>
            <div className="col-md-5 col-1">
                
            </div>
            <div className="col-md-3 marginauto">
                {account !== undefined && <p className="username">{account.firstname} {account.lastname} </p>}
                <img src="/assets/image/profileicon.png"></img>
            </div>
        </div>
        <div className="row my-5">
          <div className="col-md-9 col-12">

          </div>
          <div className="col-md-3 col-12 sidebar_button middle">
            <p className="filters">FILTERS</p>
			<FormGroup>
			<FormControlLabel control={<Checkbox className = "" checked={loved} onChange={this.handleChange('loved')}/> } label="Loved"></FormControlLabel>
			<FormControlLabel control={<Checkbox className = "" checked={bras} onChange={this.handleChange('bras')}/>} label="Bras"></FormControlLabel>
			<FormControlLabel control={<Checkbox checked={panties} onChange={this.handleChange('panties')}/>} label="Panties"></FormControlLabel>
			</FormGroup>
          </div>
        </div>
      </div>
      );
    }
}

function mapStateToProps(state) {
  const { authentication, account } = state;
  console.log("user:  ", authentication.user);
  console.log("account:  ", account);
  return { user: authentication.user, account: account.account};
}


export default withRouter(connect(mapStateToProps)(withStyles(Styles)(ProductPage)));

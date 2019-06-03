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
import { portfolioService } from '../../_services';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
      setOpen: false
    }
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(accountActions.me(user));
    portfolioService.list().then((response) => {
      console.log("portfolios--:", response.data)
      this.setState({
        portfolios: response.data,
      })
    })
  }

  render() {
    const {classes, account} = this.props;
    return (
      <div>
        <div className="row">
            <div className="col-md-4 col-5">
                <img className="logo" src="/assets/image/logo.png"></img>
            </div>
            <div className="col-md-5 col-1">
                
            </div>
            <div className="col-md-3 middle col-5 profile_logo">
                {account !== undefined && <p>{account.firstname} {account.lastname} </p>}
                <img className="logo" src="/assets/image/profileicon.png"></img>
            </div>
        </div>
        <div className="row my-5">
          <div className="col-md-1 col-12">
          </div>
          <div className="col-md-8 col-12">
            <div className="size_bar row">
              <div className="col-md-3 col-6 profile_logo size_bar_item">
                <p>Top Size:</p>
                {account !== undefined && <p className="size">{account.topsize} </p>}
              </div>
              <div className="col-md-3 col-6 profile_logo size_bar_item">
                <p>Bottom Size:</p>
                {account !== undefined && <p className="size">{account.bottomsize} </p>}
              </div>
              <div className="col-md-3 col-6 profile_logo size_bar_item">
                <p>Panty Size:</p>
                {account !== undefined && <p className="size">{account.pantysize} </p>}
              </div>
              <div className="col-md-3 col-6 profile_logo size_bar_item">
                <p>Bra Size:</p>
                {account !== undefined && <p className="size">{account.brasize} </p>}
              </div>
            </div>
            <div className="mainProduct my-5">
              <h2>Your registry is empty! Start adding gifts!</h2>
            </div>

          </div>
          <div className="col-md-3 col-12 sidebar_button middle">
            <Button classes={{label:"add_friend"}} type="submit"
                      >Add Friends 
              <img style={{marginLeft: "20px"}} src="/assets/image/lingerie.png"></img>
            </Button>

            <Button classes={{label:"add_friend"}} type="submit"
                      >Add Gifts 
              <img style={{marginLeft: "20px"}} src="/assets/image/lingerie.png"></img>
            </Button>
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

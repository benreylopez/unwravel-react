import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

import RegisterForm from "../RegisterForm"
import LoginForm from "../LoginForm"
import SigninForm from "../SigninForm"
import Grid from '@material-ui/core/Grid';

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

class Header extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false
    }
  }

  render() {
    const {classes} = this.props;
    return (
        <div className="row">
            <div className="col-md-4 col-5">
                <img className="logo" src="/assets/image/logo.png"></img>
            </div>
            <div className="col-md-5 col-1">
                
            </div>
            <div className="col-md-3 middle col-5">
              <Link
               to="/frontend/login/"
               style={{textDecoration: 'inherit'}}
              >
                <Button classes={{label: "btn rectangle login"}}>Login</Button>
              </Link>
            </div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
            >
              <DialogContent classes={classes.paper} style={{margin:"auto", marginTop:"50px"}}>
                <Grid container spacing={24}>
                  <Grid item sm={4} xs={12}></Grid>
                  <Grid item sm = {4} xs={12}>
                    <SigninForm />
                  </Grid>
                  <Grid item sm={4} xs={12}></Grid>
                </Grid>
              </DialogContent>
            </Modal>
            
        </div>
      );
    }
}



export default withStyles(Styles)(Header);

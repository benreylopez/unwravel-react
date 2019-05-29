import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from "../Header"
import HeaderHome from "../HeaderHome"
import HeaderMain from "../HeaderMain"
import NavBar from "../NavBar"
import HomePage from "../HomePage"
import SigninForm from "../SigninForm"

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'

class LoginForm extends  Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      setOpen: false
    }
  }

  render() {
    return (
        <div>
            <HomePage />
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
            >
              <DialogContent style={{margin:"auto", marginTop:"50px"}}>
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

export default LoginForm;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

const Styles = {
    login: {
        width: "41.78px",
        height: "17px",
        font_family: "Montserrat",
        font_size: "24px",
        font_weight: 400,
        line_height: "17px",
        text_align: "center",
        letter_spacing: "0.3818184px",
    }
};

class Header extends  Component {
  state = {
    isAuthenticated: false
  }

  render() {
    return (
        <div className="row">
            <div className="col-md-4 col-5">
                <img className="logo" src="/assets/image/logo.png"></img>
            </div>
            <div className="col-md-5 col-1">
                
            </div>
            <div className="col-md-3 middle col-5">
                <Button classes={{label: "btn rectangle login"}}>Login</Button>
            </div>
            
        </div>
      );
    }
}



export default withStyles(Styles)(Header);

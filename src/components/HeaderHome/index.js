import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const Styles = {
    createAcco: {
        width: '114.33px',
        height: '17px',
        font_family: 'Montserrat',
        font_size: '34px',
        font_weight: '400',
        line_height: '17px',
        text_align: 'center',
        letter_spacing: '0.3818184px'
    }
};

class HeaderHome extends  Component {
  state = {
    isAuthenticated: false
  }

  render() {
    return (
        <div className="header_title">
            <p>
                GET WHAT MAKES YOU FEEL SEXY IN
            </p>
            <div className="accountBtn">        
                <Button classes={{label: "btn rectangle createAcco"}} href={"/frontend/register/"}>Create Account</Button>
                <Button classes={{label: "btn rectangle findBride"}}>Find the Bride</Button>
            </div>
            <div style={{marginTop:'50px'}}>
                Are you already registered?
                <a href="/frontend/login/"> Login</a>
            </div>

        </div>
      );
    }
}



export default withStyles(Styles)(HeaderHome);

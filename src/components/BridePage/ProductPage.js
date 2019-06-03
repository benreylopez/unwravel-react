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
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import Masonry from 'react-masonry-component';
import Photo from './Photo';
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
const masonryOptions = {
    transitionDuration: 0
};
class ProductPage extends  Component {

	static defaultProp = {
		user: { loggedIn: false, user: { key: null } },
	}
	
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			setOpen: false,
			loved:false,
			bras:false,
			panties:true,
			lingerie:false,
			selectedPT1:[],
			selectedPT2:[],
			selectedPT3:[],
			selectedPT4:[],
			Cnt:12,
			pCnt:0,
			tCnt:0
		}
	}


  componentDidMount() {
    const { user, dispatch } = this.props;
	dispatch(accountActions.me(user));
	var jData=[];
    portfolioService.list().then((response) => {
		jData = response.data;
		console.log(jData);
		this.setState({
			portfolios: jData,
		})
		const {selectedPT1,selectedPT2,selectedPT3,selectedPT4} = this.state;
		var cnt = 0;
		var tCnt = 0;
		jData.map((i) => {
			if(i.product_category === "Panties")
			{
				if(cnt < this.state.Cnt)
				{
					switch(cnt % 4){
					case 0:
						selectedPT1.push(i);
						break;
					case 1:
						selectedPT2.push(i);
						break;
					case 2:
						selectedPT3.push(i);
						break;
					case 3:
						selectedPT4.push(i);
						break;
					}
					cnt++;
				}
				tCnt++;
			}

		})
		this.setState({
			pCnt:cnt, tCnt:tCnt, selectedPT1:selectedPT1, selectedPT2:selectedPT2, selectedPT3:selectedPT3, selectedPT4:selectedPT4
		})
	})

  }
  handleChange = name => event => {
	this.setState({[name]: event.target.checked});
	if(name === "loved")
	{
		this.state.loved = event.target.checked;
	}
	if(name === "bras")
	{
		this.state.bras = event.target.checked;
	}
	if(name === "panties")
	{
		this.state.panties = event.target.checked;
	}
	if(name === "lingerie")
	{
		this.state.lingerie = event.target.checked;
	}
	this.setProducts();
	console.log(this.state);
  }
  setProducts(){
	const selectedPT1 = [];
	const selectedPT2 = [];
	const selectedPT3 = [];
	const selectedPT4 = [];
	var cnt = 0;
	var tCnt = 0;
	this.state.portfolios.map(i => {
	  if(((i.product_category === "Loved" && this.state.loved === true) ||
	  (i.product_category === "Bras" && this.state.bras === true) ||
	  (i.product_category === "Panties" && this.state.panties === true) ||
	  (i.product_category === "Lingerie" && this.state.lingerie === true) ))
	{
		if(cnt < this.state.Cnt)
		{
			switch(cnt % 4){
			case 0:
				selectedPT1.push(i);
				break;
			case 1:
				selectedPT2.push(i);
				break;
			case 2:
				selectedPT3.push(i);
				break;
			case 3:
				selectedPT4.push(i);
				break;
			}
			cnt++;
		}
		tCnt ++;
	}
	})
	
	this.setState({
		pCnt:cnt, tCnt:tCnt, selectedPT1:selectedPT1,selectedPT2:selectedPT2,selectedPT3:selectedPT3,selectedPT4:selectedPT4
	})
  }
  handleLearn(){
	const cnt = this.state.Cnt;
	this.setState({Cnt:cnt+12});
	this.state.Cnt = cnt + 12;
	this.setProducts();
  }
  render() {
	const {classes, account} = this.props;
	const {loved, bras, panties, lingerie} = this.state;
	// const childElements = this.state.selectedPT.map(function (i, index){
	// 	return (
	// 		<Photo photoUrl={i.product_imageurl[0]} key={index}/>
	// 	)
	// })
	console.log("STATE",this.state);
	return (
      <div className = "Bigcontainer">
        <div className="row">
            <div className="col-md-4 col-5">
                <img className="prologo" src="/assets/image/logo.png"></img>
            </div>
            <div className="col-md-5 col-1">
                
            </div>
            <div className="col-md-3 userMark col-6">
                {account !== undefined && <p className="userName">{account.firstname} {account.lastname} </p>}
                <img className="prouser" src="/assets/image/profileicon.png"></img>
            </div>
        </div>
        <div className="row my-5">
			<div className="col-md-9 col-12 row">
				<div className="col-md-3 col-sm-6 col-12">
					{this.state.selectedPT1.map((i,index) => 
						<Photo photoUrl={i.product_imageurl[0]} key={index}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12" style={{marginTop:'104px'}}>
				{this.state.selectedPT2.map((i,index) => 
						<Photo photoUrl={i.product_imageurl[0]} key={index}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12">
				{this.state.selectedPT3.map((i,index) => 
						<Photo photoUrl={i.product_imageurl[0]} key={index}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12" style={{marginTop:'104px'}}>
				{this.state.selectedPT4.map((i,index) => 
						<Photo photoUrl={i.product_imageurl[0]} key={index}/>
					)}
				</div>
				<div style={{margin:'auto'}}>
					<p className="viewProduct"> You've viewed {this.state.pCnt} of {this.state.tCnt} products</p>
					<div className="btnLearn" onClick={this.handleLearn.bind(this)}>
						<span className="labLearn">Learn more</span>
					</div>
				</div>
			</div>
			<div className="col-md-3 col-12" style={{padding:'0 60px'}}>
				<p className="filters">FILTERS</p>
				<FormGroup>
				<FormControlLabel control={<Checkbox className = "" checked={loved} onChange={this.handleChange('loved')} style={{color:'rgb(149, 126, 184)'}}/> } label="Loved" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel control={<Checkbox className = "" checked={bras} onChange={this.handleChange('bras')} style={{color:'rgb(149, 126, 184)'}}/>} label="Bras" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel control={<Checkbox checked={panties} onChange={this.handleChange('panties')} style={{color:'rgb(149, 126, 184)'}}/>} label="Panties" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel control={<Checkbox checked={lingerie} onChange={this.handleChange('lingerie')} style={{color:'rgb(149, 126, 184)'}}/>} label="Lingerie" labelPlacement = "start"></FormControlLabel>
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

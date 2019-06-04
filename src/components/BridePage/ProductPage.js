import React, { Component } from 'react';



import { accountActions } from '../../_actions';
import { portfolioService } from '../../_services';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import Photo from './Photo';
import { FlapperSpinner } from "react-spinners-kit";

class ProductPage extends  Component {

	
	constructor(props) {
		super(props);
		this.state = {
			loading:true,
			open: false,
			setOpen: false,
			loved:false,
			bras:false,
			panties:false,
			lingerie:false,
			selectedPT1:[],
			selectedPT2:[],
			selectedPT3:[],
			selectedPT4:[],
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
			loading: false
		})
		
		const {selectedPT1,selectedPT2,selectedPT3,selectedPT4} = this.state;
		var tCnt = 0;
		jData.map((i) => {
			if(i.product_category === "Panties")
			{
					switch(tCnt % 4){
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
				tCnt++;
			}

		})
		this.setState({
			tCnt:tCnt, selectedPT1:selectedPT1, selectedPT2:selectedPT2, selectedPT3:selectedPT3, selectedPT4:selectedPT4
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
	var tCnt = 0;
	this.state.portfolios.map(i => {
	  if(((i.product_category === "Loved" && this.state.loved === true) ||
	  (i.product_category === "Bras" && this.state.bras === true) ||
	  (i.product_category === "Panties" && this.state.panties === true) ||
		(i.product_category === "Lingerie" && this.state.lingerie === true) ||
		(this.state.loved === false && this.state.bras === false && this.state.panties === false && this.state.lingerie === false)))
	{
			switch(tCnt % 4){
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
		tCnt ++;
	}
	})
	
	this.setState({
		tCnt:tCnt, selectedPT1:selectedPT1,selectedPT2:selectedPT2,selectedPT3:selectedPT3,selectedPT4:selectedPT4
	})
  }
  handleLearn(){
	const cnt = this.state.Cnt;
	this.setState({Cnt:cnt+12});
	this.state.Cnt = cnt + 12;
	this.setProducts();
  }
  render() {
	const {account} = this.props;
	const {loved, bras, panties, lingerie} = this.state;
	const {loading} = this.state;
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
			<div className="col-md-9 col-12">
				<FlapperSpinner
					size={50}
					color="rgb(149, 126, 184)"
					loading={loading}
				/>
				{!loading && <div className="row"><div className="col-md-3 col-sm-6 col-12">
					{this.state.selectedPT1.map((i,index) => 
						<Photo info = {i} key={index} lolstate={2}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12" style={{marginTop:'104px'}}>
				{this.state.selectedPT2.map((i,index) => 
						<Photo info = {i} key={index} lolstate={1}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12">
				{this.state.selectedPT3.map((i,index) => 
						<Photo info = {i} key={index} lolstate={0}/>
					)}
				</div>
				<div className="col-md-3 col-sm-6 col-12" style={{marginTop:'104px'}}>
				{this.state.selectedPT4.map((i,index) => 
						<Photo info = {i} key={index} lolstate={2}/>
					)}
				</div></div>}

			</div>
			<div className="col-md-3 col-12" style={{padding:'0 60px'}}>
				<p className="filters">FILTERS</p>
				<FormGroup>
				<FormControlLabel className="Ifilters" control={<Checkbox className = "IAM" checked={loved} onChange={this.handleChange('loved')} style={{color:'rgb(149, 126, 184)'}}/> } label="Loved" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel className="Ifilters" control={<Checkbox className = "IAM" checked={bras} onChange={this.handleChange('bras')} style={{color:'rgb(149, 126, 184)'}}/>} label="Bras" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel className="Ifilters" control={<Checkbox className = "IAM" checked={panties} onChange={this.handleChange('panties')} style={{color:'rgb(149, 126, 184)'}}/>} label="Panties" labelPlacement = "start"></FormControlLabel>
				<FormControlLabel className="Ifilters" control={<Checkbox className = "IAM" checked={lingerie} onChange={this.handleChange('lingerie')} style={{color:'rgb(149, 126, 184)'}}/>} label="Lingerie" labelPlacement = "start"></FormControlLabel>
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


export default withRouter(connect(mapStateToProps)(ProductPage));

import React, {Component} from 'react';
import {accountActions} from '../../_actions';
import {portfolioService} from '../../_services';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FeedPhoto from './FeedPhoto';
import {FlapperSpinner} from "react-spinners-kit";
import BHeader from '../BHeader'
import {uid} from 'react-uid'

class ProductPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false,
      setOpen: false,
      loved: false,
      bras: false,
      panties: false,
      lingerie: false,
      selectedPT1: [],
      selectedPT2: [],
      selectedPT3: [],
      selectedPT4: [],
      tCnt: 0
    }
  }

  componentDidMount() {
    var jData = [];
    portfolioService
      .list()
      .then((response) => {
        jData = response.data;
        console.log(jData);
        jData.sort((a, b) => b.rank - a.rank);
        this.setState({portfolios: jData, loading: false})

        const {selectedPT1, selectedPT2, selectedPT3, selectedPT4} = this.state;
        var tCnt = 0;
        jData.map((i) => {
            switch (tCnt % 4) {
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
          })
        this.setState({tCnt: tCnt, selectedPT1: selectedPT1, selectedPT2: selectedPT2, selectedPT3: selectedPT3, selectedPT4: selectedPT4})
      })

  }
  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
    if (name === "loved") {
      this.state.loved = event.target.checked;
    }
    if (name === "bras") {
      this.state.bras = event.target.checked;
    }
    if (name === "panties") {
      this.state.panties = event.target.checked;
    }
    if (name === "lingerie") {
      this.state.lingerie = event.target.checked;
    }
    this.setProducts();
    console.log(this.state);
  }
  setProducts() {
    const selectedPT1 = [];
    const selectedPT2 = [];
    const selectedPT3 = [];
    const selectedPT4 = [];
    var tCnt = 0;
    this
      .state
      .portfolios
      .map(i => {
        if (((i.lol === 2 && this.state.loved === true) || (i.product_category === "Bras" && this.state.bras === true) || (i.product_category === "Panties" && this.state.panties === true) || (i.product_category === "Lingerie" && this.state.lingerie === true) || (this.state.loved === false && this.state.bras === false && this.state.panties === false && this.state.lingerie === false))) {
          switch (tCnt % 4) {
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
    this.setState({tCnt: tCnt, selectedPT1: selectedPT1, selectedPT2: selectedPT2, selectedPT3: selectedPT3, selectedPT4: selectedPT4})
  }
  handleLearn() {
    const cnt = this.state.Cnt;
    this.setState({
      Cnt: cnt + 12
    });
    this.state.Cnt = cnt + 12;
    this.setProducts();
  }
  render() {
    const {loved, bras, panties, lingerie} = this.state;
    const {loading} = this.state;

    return (
      <div className="Bigcontainer">

        <BHeader/>
        <div className="row my-5">
          <div className="col-md-9 col-12">
            <FlapperSpinner size={50} color="rgb(149, 126, 184)" loading={loading}/> {!loading && <div className="row">
              <div className="col-md-3 col-sm-6 col-12">
                {this
                  .state
                  .selectedPT1
                  .map((i, index) => <FeedPhoto info={i} key={uid(i)}/>)}
              </div>
              <div
                className="col-md-3 col-sm-6 col-12"
                style={{
                marginTop: '104px'
              }}>
                {this
                  .state
                  .selectedPT2
                  .map((i, index) => <FeedPhoto info={i} key={uid(i)}/>)}
              </div>
              <div className="col-md-3 col-sm-6 col-12">
                {this
                  .state
                  .selectedPT3
                  .map((i, index) => <FeedPhoto info={i} key={uid(i)}/>)}
              </div>
              <div
                className="col-md-3 col-sm-6 col-12"
                style={{
                marginTop: '104px'
              }}>
                {this
                  .state
                  .selectedPT4
                  .map((i, index) => <FeedPhoto info={i} key={uid(i)}/>)}
              </div>
            </div>}

          </div>
          <div
            className="col-md-3 col-12"
            style={{
            padding: '0 60px'
          }}>
            <p className="filters">FILTERS</p>
            <FormGroup>
              <FormControlLabel
                className="Ifilters"
                control={< Checkbox className = "IAM" checked = {
                loved
              }
              onChange = {
                this.handleChange('loved')
              }
              style = {{color:'rgb(149, 126, 184)'}}/>}
                label="Loved"
                labelPlacement="start"></FormControlLabel>
              <FormControlLabel
                className="Ifilters"
                control={< Checkbox className = "IAM" checked = {
                bras
              }
              onChange = {
                this.handleChange('bras')
              }
              style = {{color:'rgb(149, 126, 184)'}}/>}
                label="Bras"
                labelPlacement="start"></FormControlLabel>
              <FormControlLabel
                className="Ifilters"
                control={< Checkbox className = "IAM" checked = {
                panties
              }
              onChange = {
                this.handleChange('panties')
              }
              style = {{color:'rgb(149, 126, 184)'}}/>}
                label="Panties"
                labelPlacement="start"></FormControlLabel>
              <FormControlLabel
                className="Ifilters"
                control={< Checkbox className = "IAM" checked = {
                lingerie
              }
              onChange = {
                this.handleChange('lingerie')
              }
              style = {{color:'rgb(149, 126, 184)'}}/>}
                label="Lingerie"
                labelPlacement="start"></FormControlLabel>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;

import React, {Component} from 'react';
import {accountActions} from '../../_actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Footer from '../Footer'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import BHeader from '../BHeader'
import Button from '@material-ui/core/Button';
import {portfolioService} from '../../_services';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles'
import {withStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	formControl: {
	  margin: theme.spacing(1),
	  minWidth: 120,
	},
	selectEmpty: {
	  marginTop: theme.spacing(2),
	},
  });

class EditProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.cancelEdit = this
      .cancelEdit
      .bind(this);

    this.firstnameChange = this
      .firstnameChange
      .bind(this);
    this.lastnameChange = this
      .lastnameChange
      .bind(this);
    this.brasizeChange = this
      .brasizeChange
      .bind(this);
    this.bottomsizeChange = this
      .bottomsizeChange
      .bind(this);
    this.pantysizeChange = this
      .pantysizeChange
      .bind(this);
    this.topsizeChange = this
      .topsizeChange
      .bind(this);
  }

  componentDidMount() {
    console.log(this.props.account);
    const account = this.props.location.state.account;
    this.setState({
      firstname: account.firstname,
      lastname: account.lastname,
      brasize: account.brasize,
      pantysize: account.pantysize,
      bottomsize: account.bottomsize,
      topsize: account.topsize
    });
  }

  firstnameChange(event) {
    this.setState({firstname: event.target.value});
  }

  lastnameChange(event) {
    this.setState({lastname: event.target.value});
  }

  brasizeChange(event) {
	console.log("BRASIZE", event.target.value);
	this.setState({brasize: event.target.value});
  }

  pantysizeChange(event) {
    this.setState({pantysize: event.target.value});
  }

  bottomsizeChange(event) {
    this.setState({bottomsize: event.target.value});
  }

  topsizeChange(event) {
    this.setState({topsize: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const {firstname,lastname,brasize,bottomsize,topsize,pantysize} = this.state;
    console.log(this.state);
    portfolioService.editProfile({firstname:firstname, lastname:lastname, brasize:brasize, pantysize:pantysize, bottomsize:bottomsize, topsize:topsize}).then((response)=>{
        // if(response.status === 200)
        //     this.props.history
    })

  }
  cancelEdit() {
    this
      .props
      .history
      .go(-1);
  }
  render() {
    const {
      firstname,
      lastname,
      brasize,
      pantysize,
      bottomsize,
      topsize
	} = this.state
	// const {classes} = this.props;
    return (
      <div>
        <div className="Bigcontainer">
          <BHeader></BHeader>
          <div className="row" style={{
            marginTop: '50px'
          }}>
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <h2 style={{marginBottom:'60px',display:'flex',justifyContent:'center'}}>Profile</h2>
              <form onSubmit={e => this.handleSubmit(e)}>
                <FormControl className='class-input'>
                  <InputLabel htmlFor="firstname">First Name*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="firstname"
                    value={firstname}
                    defaultValue='Hello'
                    onChange={this.firstnameChange}/>
                </FormControl>

                <FormControl className='class-input'>
                  <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="lastname"
                    value={lastname}
                    defaultValue='Hello'
                    onChange={this.lastnameChange}/>
                </FormControl>

				{/* <FormControl required className={classes.formControl}>
					<InputLabel htmlFor="age-required">Bra Size</InputLabel>
					<Select
					onChange={this.brasizeChange}
					value={brasize}
					variant="filled"
					name='age'
					inputProps={{
					  id: 'age-required'
					}}
					className={classes.selectEmpty}
					>
					<MenuItem value={'XS'}>XS</MenuItem>
					<MenuItem value={'S'}>S</MenuItem>
					<MenuItem value={'M'}>M</MenuItem>
					<MenuItem value={'L'}>L</MenuItem>
					<MenuItem value={'XL'}>XL</MenuItem>
					<MenuItem value={'DD'}>DD</MenuItem>
					</Select>
				</FormControl> */}

                <FormControl className='class-input'>
                  <InputLabel htmlFor="brasize">Bra Size*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="brasize"
                    value={brasize}
                    defaultValue='Hello'
                    onChange={this.brasizeChange}/>
                </FormControl>

                <FormControl className='class-input'>
                  <InputLabel htmlFor="pantysize">Panty Size*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="pantysize"
                    value={pantysize}
                    defaultValue='Hello'
                    onChange={this.pantysizeChange}/>
                </FormControl>

                <FormControl className='class-input'>
                  <InputLabel htmlFor="bottomsize">Bottom Size*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="bottomsize"
                    value={bottomsize}
                    defaultValue='Hello'
                    onChange={this.bottomsizeChange}/>
                </FormControl>

                <FormControl className='class-input'>
                  <InputLabel htmlFor="topsize">Top Size*</InputLabel>
                  <Input
                  required
                    className="inputEmail"
                    id="topsize"
                    value={topsize}
                    defaultValue='Hello'
                    onChange={this.topsizeChange}/>
                </FormControl>

                <div className="classFlex">
                  <Button className='col-md-5 pinkButton1' type="submit">Save
                  </Button>
                  <div className='col-md-2'></div>
                  <Button className='col-md-5 pinkButton1' onClick={this.cancelEdit}>Cancel
                  </Button>
                </div>
              </form>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    )

  }
}
function mapStateToProps(state) {

  return {account: state.account.account};
}

// export default withRouter(connect(mapStateToProps)(withStyles(useStyles)(EditProfilePage)));
export default withRouter(connect(mapStateToProps)((EditProfilePage)));
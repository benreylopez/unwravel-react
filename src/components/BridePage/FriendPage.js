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
import { portfolioService } from '../../_services';

class FriendPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
		email:''
	}
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}
  handleChange(event){
	this.setState({email:event.target.value});
  }
  handleSubmit(event){
	event.preventDefault();
	console.log("FORM",this.state.email);
	portfolioService.addFriend({email:this.state.email});
  }
  render() {
    return (
      <div>
        <div className="Bigcontainer">
          <BHeader></BHeader>
          <div className="row" style={{
            marginTop: '100px'
          }}>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <form onSubmit={e => this.handleSubmit(e)}>
                <FormControl style={{
                  display: 'flex'
                }}>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input className="inputEmail" id="email" aria-describedby="my-helper-text" type="email" onChange={this.handleChange}/>
                </FormControl>
                <Button className='pinkButton' type="submit">Add Friend
                </Button>
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

export default FriendPage
// export default withStyles(useStyles)(FriendPage)
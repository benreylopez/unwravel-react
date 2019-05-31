import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import Header from './components/Header';
import HomePage from './components/HomePage';
import SignupForm from './components/SignupForm';
import RegisterForm from './components/RegisterForm';
import SigninForm from './components/SigninForm';
import LoginForm from './components/LoginForm';
import BridePage from './components/BridePage';
import ProductPage from './components/BridePage/ProductPage';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './_helpers';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      // dispatch(alertActions.clear());
    });
  }
  render(){
  	const { user } = this.props;
    return (
      <Router history={history} basename={process.env.SUBDIRECTORY}>
        <div className="page">
          <Route
            exact
            path="/"
            render={() => (
              user
                ? <Redirect to="/portfolio" />
                : <HomePage />
            )}
          />
          <Route
            path="/portfolio"
            component={BridePage}
          />
          <Route
            path="/frontend/login"
            component={LoginForm}
          />
          <Route
            path="/frontend/register"
            component={RegisterForm}
          />
          <Route
            path="/bride/product_page"
            component={ProductPage}
          />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    user: authentication.user,
  };
}

export default connect(mapStateToProps)(App);

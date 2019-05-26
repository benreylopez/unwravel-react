import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import WebFont from 'webfontloader';
import SignupForm from './components/SignupForm';
import RegisterForm from './components/RegisterForm';
import SigninForm from './components/SigninForm';

const config = {
    apiKey: "AIzaSyDx15o-XIi4AQV66Y88MIAo6Yb1VcdRdxc",
    authDomain: "unwravel-51461.firebaseapp.com",
    databaseURL: "https://unwravel-51461.firebaseio.com",
    projectId: "unwravel-51461",
    storageBucket: "unwravel-51461.appspot.com",
    messagingSenderId: "78343525863",
    appId: "1:78343525863:web:77a4493071e86bb0"
};

firebase.initializeApp(config);

WebFont.load({
    google: {
        families: ['Montserrat', 'Playfair Display SC']
    }});

// ReactDOM.render(<App />, document.getElementById('root'));

const Root = () =>
<Router>
      <div id="app">
      
    <Route exact path="/" component={App} />
    <Route exact path="/frontend/signup" component={ SignupForm } />
    <Route exact path="/frontend/register" component={ RegisterForm } />
    <Route exact path="/frontend/signin" component={ SigninForm } />
    {/* <Route exact path="/frontend/main" component= { Main } />
    <Route exact path="/frontend/React-table" component= { ReactTable } />
      <Route exact path="/frontend/SecondForm" component= { SecondForm } />
      <Route exact path="/frontend/ForgotLoginDetails" component= { ForgotLoginForm } /> */}
  </div>
</Router>

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

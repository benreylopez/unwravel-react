import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import Header from './components/Header';
import HomePage from './components/HomePage';

class App extends Component {
  render(){
    return (
      <HomePage />
    );
  }
}

export default App;

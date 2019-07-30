import React, { Component } from 'react';
import './App.css';
import signUp from './components/signUp';
import signIn from './components/signIn';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/signup" component={signUp} />
        <Route path="/signin" component={signIn} />
      </BrowserRouter>
    )
  }
}

export default App;

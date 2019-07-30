import React, { Component } from 'react';
import './App.css';
import signUp from './components/signUp';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route path="/signup" component={signUp} />
      </BrowserRouter>
    )
  }
}

export default App;

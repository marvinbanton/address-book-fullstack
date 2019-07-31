import React, { Component } from 'react';
import './App.css';
import signUp from './components/signUp';
import signIn from './components/signIn';
import addressBook from './components/addressBook';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route strict path="/signup" component={signUp} />
        <Route strict path="/signin" component={signIn} />
        <Route strict path="/addressbook" component={addressBook} />
      </BrowserRouter>
    )
  }
}

export default App;

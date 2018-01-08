import React, { Component } from 'react';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { Route, Switch } from 'react-router-dom';

export default class Auth extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
      </Switch>
    );
  }
}
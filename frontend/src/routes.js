import React from 'react';
import Home from './containers/Home/Home';
import Settings from './containers/Settings/Settings';
import Card from './containers/Card/Card';
import Transactions from './containers/Transactions/Transactions';
import { Route, Switch } from 'react-router-dom';

export default () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/settings' component={Settings}/>
    <Route path='/transactions' component={Transactions}/>
    <Route path='/cards/:id' component={Card}/>
  </Switch>
);

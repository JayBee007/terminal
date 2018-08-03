import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Auth from '../components/Auth';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={() => <Auth Component={Home} />} />
    <Route path="/login" exact component={Login} />
    <Route path="/register" exact component={Register} />
  </Switch>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Team from './Team';

import Auth from '../components/Auth';
import UnAuth from '../components/UnAuth';


const Routes = () => (
  <Switch>
    <Route path="/" exact render={(props) => <Auth Component={Home} {...props} />} />
    <Route path="/login" exact render={(props) => <UnAuth Component={Login} {...props} />} />
    <Route path="/register" exact render={(props) => <UnAuth Component={Register} {...props} />} />
    <Route path="/team/:action" exact render={(props) => <Auth Component={Team} {...props} />} />
  </Switch>
);

export default Routes;

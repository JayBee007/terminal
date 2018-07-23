import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Home from './Home';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/register" exact component={Register} />
  </Switch>
);

export default Routes;

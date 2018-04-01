import React from 'react';
import { Route, Switch } from 'react-router-dom';

import userIsAuthenticated from './components/HoC/userIsAuthenticated';
import userIsNotAuthenticated from './components/HoC/userIsNotAuthenticated';

import Login from './components/Login';
import Pokemons from './components/Pokemons';

import './sass/main.scss';

const App = () => {
  return(
    <Switch>
      <Route path='/' exact component={userIsNotAuthenticated(Login)}/>
      <Route path='/pokemons' exact component={userIsAuthenticated(Pokemons)}  />
      <Route component={userIsNotAuthenticated(Login)}/>
    </Switch>
  );
}

export default App;

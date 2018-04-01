import React from 'react';
import { Route, Switch } from 'react-router-dom';

import userIsAuthenticated from './components/HoC/userIsAuthenticated';
import userIsNotAuthenticated from './components/HoC/userIsNotAuthenticated';

import Login from './components/Login';

import './sass/main.scss';

const App = () => {
  return(
    <Switch>
      <Route path='/' exact component={Login}/>

    </Switch>
  );
}
//<Route component={userIsNotAuthenticated(Login)}/>
//<Route path='/pokemons' exact component={userIsAuthenticated(Pokemons)}  />
export default App;

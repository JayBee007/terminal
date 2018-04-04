import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Nav from '../Nav';
import PokemonList from '../PokemonList';
import Favorites from '../Favorites';

const Pokemons = (props) => {
  return(
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path='/pokemons/' exact component={PokemonList}  />
        <Route path='/pokemons/favorites' exact component={Favorites}  />
      </Switch>
    </React.Fragment>
  )
}

export default Pokemons;

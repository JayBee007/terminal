import { combineReducers } from 'redux';

import auth from './authReducer';
import login from './loginReducer';
import pokemons from './getPokemonReducer';
import like from './likePokemonReducer';
import fav from './pokemonFavReducer';

const rootReducer = combineReducers({
  auth,
  login,
  pokemons,
  like,
  fav
});

export default rootReducer;

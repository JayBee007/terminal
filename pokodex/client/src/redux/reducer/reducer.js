import { combineReducers } from 'redux';

import auth from './authReducer';
import login from './loginReducer';
import pokemons from './getPokemonReducer';

const rootReducer = combineReducers({
  auth,
  login,
  pokemons,

});

export default rootReducer;

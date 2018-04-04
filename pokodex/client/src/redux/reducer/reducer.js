import { combineReducers } from 'redux';

import auth from './authReducer';
import login from './loginReducer';
import pokemon from './getPokemonReducer';

const rootReducer = combineReducers({
  auth,
  login,
  pokemon,

});

export default rootReducer;

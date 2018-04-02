import { combineReducers } from 'redux';

import auth from './authReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  auth,
  login
});

export default rootReducer;

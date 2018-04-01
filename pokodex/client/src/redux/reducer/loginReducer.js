import C from '../constant';

const initialState = {
  requesting: null,
  successful: null,
  errors: null,
}

const loginReducer = (state=initialState, action) => {
  switch(action.type) {
    case C.LOGIN_REQUESTING:
      return {...state, requesting: true, successful: false, errors: false};
    case C.LOGIN_SUCCESS:
      return {...state, requesting: false, successful: true, errors: false};
    case C.LOGIN_ERROR:
      return {...state, requesting: false, successful: false, errros: action.errors}
    default:
      return state;
  }
}

export default loginReducer;

import C from '../constant';

const initialAuthState = {
    auth: false,
    token: null,
};

const auth = (state=initialAuthState,action) => {
  switch(action.type) {
    case C.AUTHENTICATED:
      return {...state, auth:true, token: action.token};
    case C.UNAUTHENTICATED:
      return {...state, auth:false, token: null};
    default:
      return state;
  }

}

export default auth;

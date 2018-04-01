import C from '../constant';

const initialAuthState = {
    auth: false,
};

const auth = (state=initialAuthState,action) => {
  switch(action.type) {
    case C.AUTHENTICATED:
      return {...state, auth:true};
    case C.UNAUTHENTICATED:
      return {...state, auth:false};
    default:
      return state;
  }

}

export default auth;

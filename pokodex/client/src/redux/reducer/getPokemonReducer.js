import C from '../constant';

const initialState = {
  requesting: null,
  successful: null,
  errors: null,
}

const getPokemonReducer = (state=initialState, action) => {
  switch(action.type) {
    case C.GET_POKEMON_REQUEST:
      return {...state, requesting: true, successful: false, errors: false};
    case C.GET_POKEMON_SUCCESS:
      return {...state, requesting: false, successful: true, errors: false, data: action.data};
    case C.GET_POKEMON_ERROR:
      return {...state, requesting: false, successful: false, errors: action.errors}
    default:
      return state;
  }
}

export default getPokemonReducer;

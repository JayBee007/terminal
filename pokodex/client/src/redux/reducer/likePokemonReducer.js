import C from '../constant';

const initialState = {
  requesting: null,
  successful: null,
  errors: null,
}

const likePokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.POST_POKEMON_LIKE_REQUEST:
      return {...state, requesting: true, successful: false, errors: false }
    case C.POST_POKEMON_LIKE_SUCCESS:
      return {...state, requesting: false, successful: true, errors: false }
    case C.POST_POKEMON_LIKE_ERROR:
      return {...state, requesting: false, successful: false, errors: action.errors }
    default:
      return state;
  }
}

export default likePokemonReducer;

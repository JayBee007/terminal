import C from '../constant';

const initialState = {
  requesting: null,
  successful: null,
  errors: null,
  data: []
}

const pokemonFavReducer = (state=initialState, action) => {
  switch(action.type) {
    case C.GET_POKEMON_FAV_REQUEST:
      return {...state, requesting: true, successful: false, errors: false};
    case C.GET_POKEMON_FAV_SUCCESS:
      return {...state, requesting: false, successful: true, errors: false, data: action.data};
    case C.GET_POKEMON_FAV_ERROR:
      return {...state, requesting: false, successful: false, errors: action.errors}
    case C.GET_POKEMON_UPDATE:
      const data = state.data.map(pokemon => {
        if(pokemon.id === action.pokemon.id) {
          return action.pokemon;
        }else {
          return pokemon;
        }
      });
      return {...state, data};
    default:
      return state;
  }
}

export default pokemonFavReducer;

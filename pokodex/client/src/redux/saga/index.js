import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import pokemonSaga from './getPokemons';
import likePokemonSaga from './likePokemon';
import favPokemonSaga from './favPokemons';

export default function* rootSaga() {
  yield all([
    authSaga(),
    pokemonSaga(),
    likePokemonSaga(),
    favPokemonSaga()
  ]);
}

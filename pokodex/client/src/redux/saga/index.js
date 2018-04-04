import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import pokemonSaga from './getPokemons';

export default function* rootSaga() {
  yield all([
    authSaga(),
    pokemonSaga()
  ]);
}

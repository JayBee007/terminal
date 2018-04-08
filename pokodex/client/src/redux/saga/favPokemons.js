import { take, call, fork, put, cancel } from 'redux-saga/effects';
import request from '../../utils/request';

import C from '../constant';

function favPokemonApi() {

  // return request.get('http://localhost:3000/pokemons/favorites').then(res => {
    return request.get(`/pokemons/favorites`).then(res => {
      return res.data;
    }).catch(err => {
      throw err.response.data;
    });
}


function* favPokemon() {
  let result;
  try {
    result = yield call(favPokemonApi)
    yield put({ type: C.GET_POKEMON_FAV_SUCCESS, data:result });
  }catch (errors) {
    yield put({ type: C.GET_POKEMON_FAV_ERROR, errors })
  }

  return result;
}

function* favPokemonWatcher () {

  while (true) {

    yield take(C.GET_POKEMON_FAV_REQUEST);
    const task = yield fork(favPokemon);

  }


}

export default favPokemonWatcher;

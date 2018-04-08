import { take, call, fork, put, cancel } from 'redux-saga/effects';
import request from '../../utils/request';

import C from '../constant';
import { authenticated, unauthenticated, getPokemonUpdate} from '../action';

function likePokemonApi(id, name, avatar, abilities, types) {
  const data = {id, name, avatar, abilities, types};
  // return request.post('http://localhost:3000/pokemons/favorites', data).then(res => {
    return request.get(`/pokemons/favorites`).then(res => {
      return res.data;
    }).catch(err => {
      throw err.response.data;
    });
}


function* likePokemon(id, name, avatar, abilities, types) {
  let result;
  try {
    result = yield call(likePokemonApi, id, name, avatar, abilities, types)
    yield put({ type: C.POST_POKEMON_LIKE_SUCCESS });
    yield put(getPokemonUpdate(result));
  }catch (errors) {
    yield put({ type: C.POST_POKEMON_LIKE_ERROR, errors })
  }

  return result;
}

function* likePokemonWatcher () {

  while (true) {

    const { id, name, avatar, abilities, types } = yield take(C.POST_POKEMON_LIKE_REQUEST);
    const task = yield fork(likePokemon, id, name, avatar, abilities, types);

  }


}

export default likePokemonWatcher;

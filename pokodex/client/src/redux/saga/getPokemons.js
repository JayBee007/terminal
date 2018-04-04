import { take, call, fork, put, cancel } from 'redux-saga/effects';
import request from '../../utils/request';

import C from '../constant';
import { authenticated, unauthenticated} from '../action';

function getPokemonApi(limit, offset) {

  // return request.get(`http://localhost:3000/pokemons/list/?limit=${limit}&offset=${offset}`).then(res => {
  return request.get(`https://pokodex.herokuapp.com/pokemons/list/?limit=${limit}&offset=${offset}`).then(res => {
    return res.data;
  }).catch(err => {
    return err;
  })
}


function* getPokemonFlow(limit,offset) {
  let res;
  try {
    res = yield call(getPokemonApi, limit, offset)
    yield put({ type: C.GET_POKEMON_SUCCESS, data:res });
  }catch (errors) {
    yield put({ type: C.GET_POKEMON_ERROR, errors })
  }

  return res;
}

function* pokemonWatcher () {

  while (true) {

    const { limit, offset } = yield take(C.GET_POKEMON_REQUEST);

    const task = yield fork(getPokemonFlow, limit, offset);

    const action = yield take([C.GET_POKEMON_ERROR]);

    if (action.type === C.GET_POKEMON_ERROR) yield cancel(task);

  }


}

export default pokemonWatcher;

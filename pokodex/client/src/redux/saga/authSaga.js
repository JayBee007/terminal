import { take, call, fork, put, cancel } from 'redux-saga/effects';
import request from '../../utils/request';
import axios from 'axios';

import C from '../constant';
import { authenticated, unauthenticated} from '../action';

function loginApi(accessToken) {
  // return request.post('http://localhost:3000/auth/facebook', {access_token:accessToken}).then(res => {
  return request.post('/auth/facebook', {access_token:accessToken}).then(res => {
    return res.headers['x-auth-token'];
  }).catch(err => {
    throw err;
  })
}

function* logout () {
  yield put({type:C.UNAUTHENTICATED});
  localStorage.removeItem('state');
}

function* loginFlow(accessToken) {
  let token;
  try {
    token = yield call(loginApi, accessToken)
    axios.defaults.headers.common['x-auth-token'] = token;
    yield put({ type: C.LOGIN_SUCCESS });
    yield put(authenticated(token));

  }catch (errors) {
    yield put({ type: C.LOGIN_ERROR, errors })
  }

  return token;
}

function* loginWatcher () {

  while (true) {

    const { accessToken } = yield take(C.LOGIN_REQUESTING);

    const task = yield fork(loginFlow, accessToken);

    const action = yield take([C.UNAUTHENTICATED, C.LOGIN_ERROR]);

    if (action.type === C.UNAUTHENTICATED) yield cancel(task)

    yield call(logout)
  }


}

export default loginWatcher;

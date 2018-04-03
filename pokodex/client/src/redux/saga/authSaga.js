import { take, call, fork, put, cancel } from 'redux-saga/effects';
import axios from 'axios';

import C from '../constant';
import { authenticated, unauthenticated} from '../action';

function loginApi(accessToken) {

  return axios.post('http://localhost:3000/auth/facebook', {access_token:accessToken}).then(res => {
    return res.headers['x-auth-token'];
  }).catch(err => {
    return err;
  })
}

function* logout () {
  yield put({type:C.UNAUTHENTICATED});
  localStorage.removeItem('auth')
}

function* loginFlow(accessToken) {
  let token;
  try {
    token = yield call(loginApi, accessToken)
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

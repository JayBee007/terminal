import { take, call } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import C from '../constant';

function* loginWatcher () {

  while (true) {

    yield take(C.LOGIN_REQUESTING);

    // const task = yield fork(loginFlow)
  }


}

export default loginWatcher;

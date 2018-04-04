import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import throttle from 'lodash.throttle';

import store, { sagaMiddleware } from './src/redux/store';
import rootSaga from './src/redux/saga';
import { saveState } from './src/utils/localStorage';
import { setAuthToken } from './src/utils/request';

sagaMiddleware.run(rootSaga);

const token = JSON.parse(localStorage.getItem("state")).auth.token;
setAuthToken(token);

store.subscribe(throttle(() => {
  saveState({
    auth: store
      .getState()
      .auth
  });
}, 1000));

import App from './src/App';

const root = document.getElementById("root");
const Index = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, root);

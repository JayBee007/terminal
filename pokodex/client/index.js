import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import throttle from 'lodash.throttle';

import store, { sagaMiddleware } from './src/redux/store';
import rootSaga from './src/redux/saga';
import { saveState } from './src/utils/localStorage';

sagaMiddleware.run(rootSaga);

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

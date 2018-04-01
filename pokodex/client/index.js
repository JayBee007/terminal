import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store, { sagaMiddleware } from './src/redux/store';
import rootSaga from './src/redux/saga';

sagaMiddleware.run(rootSaga);

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

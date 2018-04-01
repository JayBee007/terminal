import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import state from '../reducer';

export const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);


const store = createStoreWithMiddleware(state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

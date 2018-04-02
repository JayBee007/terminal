import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { loadState } from '../../utils/localStorage';

import state from '../reducer';

export const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

const persistedState = loadState();

const store = createStoreWithMiddleware(state,persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

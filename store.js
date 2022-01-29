import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';

import rootReducer from './src/redux/index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;

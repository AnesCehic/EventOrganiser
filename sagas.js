import {all} from 'redux-saga/effects';

import {testSaga} from '@redux/TestRedux/sagas';

export default function* rootSaga() {
  yield all([testSaga()]);
}

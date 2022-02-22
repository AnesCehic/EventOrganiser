import {combineReducers} from 'redux';

import {reducer as testReducer} from './TestRedux/reducer';

export default combineReducers({
  testReducer: testReducer,
});

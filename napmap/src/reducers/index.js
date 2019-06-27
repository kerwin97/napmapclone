import { combineReducers } from 'redux';
//just combines all reducrs into reducers
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  //the auth piece of state is produced by AuthReducer
});

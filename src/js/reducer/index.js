import { combineReducers } from 'redux-immutable';
import sidebar from './sidebar';
import metadata from './metadata';

export default combineReducers({
  sidebar,
  metadata,
});

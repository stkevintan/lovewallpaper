import { combineReducers } from 'redux';
import sidebar from './sidebar';
import metadata from './metadata';

export default combineReducers({
  sidebar,
  metadata,
});

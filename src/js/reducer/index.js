import { combineReducers } from 'redux-immutable';
import ui from './ui';
import metadata from './metadata';

export default combineReducers({
  ui,
  metadata,
});

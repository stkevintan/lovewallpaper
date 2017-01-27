import { combineReducers } from 'redux';
import sidebar from './sidebar';
// import importDirectory from 'import-directory';

// const reducers = importDirectory(module);
export default combineReducers({
  sidebar,
});

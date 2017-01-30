import { Map } from 'immutable';
import { SET_SIDEBAR_STATUS, SET_SNACKBAR_STATUS } from '../constants';

export default function ui(state, action) {
  if (action.type === SET_SIDEBAR_STATUS) {
    const show = typeof action.show === 'undefined' ? !state.getIn(['sidebar', 'show']) : action.show;
    return state.setIn(['sidebar', 'show'], show);
  }
  if (action.type === SET_SNACKBAR_STATUS) {
    const show = typeof action.show === 'undefined' ?
      !state.getIn(['snackbar', 'show']) : action.show;
    return state.set('snackbar', Map({ show, message: action.message || '' }));
  }
  return state;
}

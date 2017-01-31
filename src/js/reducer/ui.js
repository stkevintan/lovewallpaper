import { SET_SIDEBAR_STATUS, SET_SNACKBAR_STATUS, SET_MODAL_STATUS } from '../constants';

export default function ui(state, action) {
  if (action.type === SET_SIDEBAR_STATUS) {
    const show = typeof action.show === 'undefined' ? !state.getIn(['sidebar', 'show']) : action.show;
    return state.setIn(['sidebar', 'show'], show);
  }
  if (action.type === SET_SNACKBAR_STATUS) {
    const show = typeof action.show === 'undefined' ?
      !state.getIn(['snackbar', 'show']) : action.show;
    return state.update('snackbar', map => map.merge({
      show,
      message: action.message,
      timeout: action.timeout,
    }));
  }
  if (action.type === SET_MODAL_STATUS) {
    return state.update('modal', map => map.merge({
      show: action.show,
      message: action.message,
    }));
  }
  return state;
}

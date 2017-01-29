import { SET_SIDEBAR_STATUS } from '../constants';

export default function sidebar(state, action) {
  if (action.type === SET_SIDEBAR_STATUS) {
    const show = typeof action.show === 'undefined' ? !state.get('show') : action.show;
    return state.set('show', show);
  }
  return state;
}

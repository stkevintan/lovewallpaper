import { SET_SIDEBAR_STATUS } from '../action/sidebar';

const initialState = {
  show: false,
};

export default function sidebar(state = initialState, action) {
  if (action.type === SET_SIDEBAR_STATUS) {
    return { ...state, show: typeof action.show === 'undefined' ? !state.show : action.show };
  }
  return state;
}

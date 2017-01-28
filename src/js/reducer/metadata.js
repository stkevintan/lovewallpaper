import { LOAD_METADATA, LOAD_LIST } from '../constants';

export default function (state = null, action) {
  if (action.type === LOAD_METADATA) return action.metadata;
  if (action.type === LOAD_LIST) {
    // location
    const keyArr = action.path.split('.');
    const patch = {};
    let iter = patch;
    for (const key of keyArr) {
      iter[key] = {};
      iter = iter[key];
    }
    iter = action.metadata;
    return { ...state, ...patch };
  }
  return state;
}

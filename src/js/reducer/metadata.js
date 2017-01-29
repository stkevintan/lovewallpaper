import Immutable from 'immutable';
import { LOAD_METADATA, LOAD_LIST } from '../constants';


export default function (state, action) {
  if (action.type === LOAD_METADATA) return Immutable.fromJS(action.metadata);
  if (action.type === LOAD_LIST) {
    // cannot load-list before load-metadata
    if (state.isEmpty()) throw Error('Cannot call load-list before load-metadata');
    return state.updateIn(action.position, map => map.merge(action.content));
  }
  return state;
}

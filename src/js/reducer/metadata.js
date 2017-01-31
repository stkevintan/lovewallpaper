import Immutable from 'immutable';
import { LOAD_METADATA, LOAD_LIST, LOAD_MORE } from '../constants';


export default function (state, action) {
  if (action.type === LOAD_METADATA) return Immutable.fromJS(action.metadata);
  // cannot load-list before load-metadata
  // else if (state.isEmpty()) throw Error('Cannot call load-list before load-metadata');
  if (action.type === LOAD_LIST) {
    return state.updateIn(action.position, map => map.merge(action.content));
  }
  if (action.type === LOAD_MORE) {
    return state.updateIn(action.position, map =>
      map
        .update('link', m => m.merge(action.content.link))
        .update('data', a => a.concat(action.content.data))
    );
  }
  return state;
}

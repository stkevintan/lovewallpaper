import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';

import { INITIAL_STATE } from './constants';
import reducers from './reducer';

const logger = createLogger({
  stateTransformer: (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    return state;
  },
});

function configureStore(initialState) {
  const store = createStore(reducers, initialState, compose(
        applyMiddleware(thunk, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');

      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

const store = configureStore(INITIAL_STATE);
export default store;

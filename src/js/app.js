import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Layout from './container/Layout';
import Home from './container/Home';

import theme from './theme';
import configureStore from './configureStore';
import { INITIAL_STATE } from './constants';

const store = configureStore(INITIAL_STATE);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const Skeletons = (
  <MuiThemeProvider muiTheme={theme}>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
);


ReactDOM.render(<Skeletons />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';

import Layout from './container/Layout';
import Home from './container/Home';

import theme from './theme';

import configureStore from './configureStore';
import { INITIAL_STATE } from './constants';
import { loadMetadata } from './action/bootstrap';


const ipcRenderer = require('electron').ipcRenderer;

const store = configureStore(INITIAL_STATE);
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


class Skeletons extends React.Component {
  constructor(props) {
    super(props);
    ipcRenderer.send('bootstrap');
    ipcRenderer.on('bootstrap-reply', (e, data) => {
      store.dispatch(loadMetadata(data));// dispatch the data
    });

    this.state = { loaded: false };
    store.subscribe(() => {
      const loaded = !!store.getState().metadata;
      if (this.state.loaded !== loaded) {
        this.setState({ loaded });
      }
    });
  }
  render() {
    const mainWin = (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} />
          <Route path="/home" component={Home} />
        </Route>
      </Router>
    );

    const loadingWin = <div style={{ textAlign: 'center' }}>Loading</div>;

    return (
      <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
          { this.state.loaded ? mainWin : loadingWin }
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Skeletons />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import Layout from './container/Layout';
import Splash from './container/Splash';
import theme from './theme';

import Recommend from './container/Recommend';
import Wallpaper from './container/Wallpaper';
import Ranking from './container/Ranking';
import Category from './container/Category';
import Everyday from './container/Everyday';

import store from './store';

import { loadMetadata } from './action/loader';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Skeletons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
    store.subscribe(() => {
      const loaded = !store.getState().get('metadata').isEmpty();
      if (this.state.loaded !== loaded) {
        this.setState({ loaded });
      }
    });
    store.dispatch(loadMetadata());
  }
  render() {
    const mainWin = (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Recommend} />
          <Route path="image">
            <Route path="wallpaper" component={Wallpaper} />
            <Route path="recommend" component={Recommend} />
            <Route path="ranking" component={Ranking} />
            <Route path="category/:id" component={Category} />
            <Route path="everyday/:id" component={Everyday} />
          </Route>
        </Route>
      </Router>
    );


    return (
      <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
          { this.state.loaded ? mainWin : <Splash /> }
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Skeletons />, document.getElementById('root'));


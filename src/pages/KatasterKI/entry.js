/**
 * This is a special entry point for the strassencheck-app as a stand alone version
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import '~/utils/polyfills';
import history from '~/history';
import { updateHistory } from '~/AppState';
import Store from '~/store';
import App from './KatasterKI';

history.listen((location) => Store.dispatch(updateHistory(location)));
Store.dispatch(updateHistory(history.location));

ReactDOM.render(
  <Provider store={Store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

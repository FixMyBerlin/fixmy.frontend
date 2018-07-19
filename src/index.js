import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router-dom/Router';
import createBrowserHistory from 'history/createBrowserHistory';

import { updateHistory } from '~/modules/App/AppState';

import { init as initStyle } from './style-utils';

import Store from './redux/store';
import App from './modules/App';

const root = document.getElementById('root');
const history = createBrowserHistory();

history.listen(location => Store.dispatch(updateHistory(location)));
Store.dispatch(updateHistory(history.location));

if (root) {
  initStyle();

  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    root
  );
}

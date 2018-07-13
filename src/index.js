import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { init as initStyle } from './style-utils';

import Store from './redux/store';
import App from './modules/App';

const root = document.getElementById('root');

if (root) {
  initStyle();

  ReactDOM.render(
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    root
  );
}

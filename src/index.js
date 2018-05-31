import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';

import Store from './redux/store';
import App from './modules/App';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    root
  );
}

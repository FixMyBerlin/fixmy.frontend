import '~/utils/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '~/App';
import Store from '~/store';

import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://b02fc2d532694a8c956365811b70b13a@o1174824.ingest.sentry.io/6294496',
  tracesSampleRate: 0.0,
});

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

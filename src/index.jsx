import '~/utils/polyfills';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from '~/App';
import Store from '~/store';

import * as Sentry from '@sentry/react';
import config from '~/config';

Sentry.init({
  dsn: config.sentryDsn,
  tracesSampleRate: 0.0,
});

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

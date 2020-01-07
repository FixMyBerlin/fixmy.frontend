import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '~/utils/polyfills';
import history from '~/history';
import { updateHistory, detectEmbedMode } from '~/AppState';
import Store from '~/store';
import App from '~/App';

history.listen((location) => Store.dispatch(updateHistory(location)));
Store.dispatch(updateHistory(history.location));
Store.dispatch(detectEmbedMode(history.location));

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

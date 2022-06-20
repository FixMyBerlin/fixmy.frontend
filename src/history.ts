// eslint-disable-next-line import/no-self-import
import { createBrowserHistory } from 'history';
import ReactPiwik from 'react-piwik';

import config from '~/config';

const browserHistory = createBrowserHistory();

// piwik-react has an open issue script tag in the dom,
// which doesn't work in a Jest environment.
// As a workaround, the resulting error is caught here.
// The error is described well in this similar package https://github.com/joernroeder/piwik-react-router/issues/48
// There was an unsucessfull attempt to solve this at https://github.com/guillaumeparis2000/react-piwik/pull/24

let history: ReturnType<typeof createBrowserHistory>;
try {
  const piwik = new ReactPiwik({
    url: config.piwik.url,
    siteId: config.piwik?.siteId || 1,
    ...config.piwik.options,
  });

  history = piwik.connectToHistory(browserHistory);
} catch (e) {
  // Fix Piwik loading in Jest environment
  if (
    e.message === "Cannot read properties of undefined (reading 'parentNode')"
  ) {
    history = browserHistory;
  } else {
    throw e;
  }
}

// Export history as a constant, even though it was mutable before
// to handle exception
const constHistory = history;

export default constHistory;

import { createBrowserHistory } from 'history';
import ReactPiwik from 'react-piwik';

import config from '~/config';

const browserHistory = createBrowserHistory();

// piwik-react-router has an open issue where it will try and attach a
// script tag in the dom, which doesn't work in a Jest environment.
// As a workaround, the resulting error is caught here.
// See https://github.com/joernroeder/piwik-react-router/issues/48

let history: ReturnType<typeof createBrowserHistory>;
try {
  const piwik = new ReactPiwik({
    url: config.piwik.url,
    siteId: config.piwik?.siteId || 1,
    ...config.piwik.options,
  });

  history = piwik.connectToHistory(browserHistory);
} catch (e) {
  if (e.message === "Cannot read property 'parentNode' of undefined") {
    history = browserHistory;
  } else {
    throw e;
  }
}

// Export history as a constant, even though it was mutable before
// to handle exception
const constHistory = history;

export default constHistory;

import ReactPiwik from 'react-piwik';
import { createBrowserHistory } from 'history';

import config from '~/config';

const piwikSiteId = config.piwik.siteId[config.region] || 1;
const piwik = new ReactPiwik({
  url: config.piwik.url,
  siteId: piwikSiteId,
  ...config.piwik.options
});

const history = piwik.connectToHistory(
  createBrowserHistory({ basename: process.env.BASE_NAME })
);

// used in integration tests
if (window.Cypress) {
  window.appHistory = history;
}

export default history;

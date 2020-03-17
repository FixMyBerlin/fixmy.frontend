import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.BASE_NAME });

// used in integration tests
if (window.Cypress) {
  window.appHistory = history;
}

export default history;

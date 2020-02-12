import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.BASE_NAME });

// used in integration tests
if (window.Cypress) {
  window.history = history;
}

export default history;

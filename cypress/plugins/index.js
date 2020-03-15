const path = require('path');

const env = require('../../env.js');

const wp = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack/webpack.config.dev.js');

// immediately open dev tools so we can inspect breakpoint halts
// (when we added a "debugger" statement in our code
const setAutoDevTools = (args) => args.push('--auto-open-devtools-for-tabs');

// Set Chrome's window position and size
//
// Use an environment variable to control where the Chrome browser window will
// be opened by Cypress. As an example:
//
//   CYPRESS_BROWSER_WINDOW="1920,1080;1920,0" npm run test:e2e-chrome
//
// would run cypress tests with a window of size 1920x1080 with its upper left
// corner at 1920,0 on the monitor.
const setWindowPos = (args) => {
  if (env.cypressBrowserWindow == null) return;

  const [windowSize, windowPosition] = env.cypressBrowserWindow.split(
    ';'
  );
  args.push(
    '--user-data-dir="~/chrome-test-user"',
    `--window-size=${windowSize}`,
    `--window-position=${windowPosition}`
  );
};

module.exports = (on, config) => {
  // exclude certain e2e tests depending on city config using `ignoreTestFiles`
  const testPoolOverrides = {};
  const cityConfig = env.region;
  if (cityConfig === 'bonn') {
    const ignoredPages = ['Analysis', 'Home', 'Map', 'KatasterKI'];
    // join glob path safely, see https://github.com/cypress-io/cypress/issues/2155
    const globs = ignoredPages.map((page) => path.join('**', page, '**', '*.js')); // FIXME: this does not work yet
    testPoolOverrides.ignoreTestFiles = JSON.stringify(globs);
  }

  // modify the way browsers are launched,
  // see https://docs.cypress.io/api/plugins/browser-launch-api.html#Usage
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      setAutoDevTools(args);
      setWindowPos(args);
    }
    return args;
  });

  on('file:preprocessor', wp({ webpackOptions }));

  // store process env in cypress env,
  // see https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json
  return {
    ...config,
    env: process.env,
    ...testPoolOverrides
  };
};

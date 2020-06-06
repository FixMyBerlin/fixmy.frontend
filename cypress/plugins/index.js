require('dotenv').config();
const testWhiteList = require('../../cypressWhiteList');

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
  const { cypressBrowserWindow } = process.env;
  if (cypressBrowserWindow == null) return;

  const [windowSize, windowPosition] = cypressBrowserWindow.split(';');
  args.push(
    '--user-data-dir="~/chrome-test-user"',
    `--window-size=${windowSize}`,
    `--window-position=${windowPosition}`
  );
};

module.exports = (on, config) => {
  // only include certain tests
  const testFilesToUse = getTestPool();
  const testPoolOverrides = { testFiles: testFilesToUse };

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

/**
 * Ge configured tests for city config by invoking an internal whitelist configuration.
 * @returns string[] A list of file paths
 */
function getTestPool() {
  const cityConfig = process.env.region;
  const testFilesToUse = testWhiteList.getTestWhitelistForCityConfig(
    cityConfig
  );
  // log test pool
  let logMsg = cityConfig
    ? `Found city config ${cityConfig}. `
    : 'No city config found. ';
  logMsg += `Using the following tests: ${JSON.stringify(
    testFilesToUse,
    null,
    '\t'
  )}`;
  console.info(logMsg);
  return testFilesToUse;
}

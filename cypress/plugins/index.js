require('dotenv').config();
const wp = require('@cypress/webpack-preprocessor');

const log = require('debug')('cypress:plugins');

const baseConfig = require('../../cypress.json');
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

/**
 * Generate an array of pattern for selecting tests to run
 *
 * Expects an environment variable `REGION` with a corresponding entry
 * in `cypress.json` under the key `whitelist`, containing an array of
 * path segments to match for.
 *
 * @returns string[] A list of file patterns
 */
const getPatternsForRegion = () => {
  const makePattern = (page) => `**/${page}/**/*.e2e.test.js`;

  const region = process.env.REGION;
  const whitelist =
    baseConfig.whitelist[region] || baseConfig.whitelist.default;
  const patterns = whitelist.map(makePattern);

  log(`Selecting tests for region ${region} using patterns ${patterns}`);
  if (!Object.keys(baseConfig).includes(region))
    log('No test whitelist defined for region, using default');

  return patterns;
};

module.exports = (on, config) => {
  // only include certain tests
  const testFiles = getPatternsForRegion();

  // modify the way browsers are launched,
  // see https://docs.cypress.io/api/plugins/browser-launch-api.html#Usage
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.name === 'chrome') {
      const { args } = launchOptions;
      setAutoDevTools(args);
      setWindowPos(args);
    }
    return launchOptions;
  });

  on('file:preprocessor', wp({ webpackOptions }));

  // store process env in cypress env,
  // see https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json
  return {
    ...config,
    testFiles,
    env: process.env
  };
};

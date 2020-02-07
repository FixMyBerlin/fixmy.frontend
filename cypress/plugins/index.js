const wp = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack/webpack.config.dev.js');

module.exports = (on, config) => {
  // modify the way browsers are launched,
  // see https://docs.cypress.io/api/plugins/browser-launch-api.html#Usage
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      // immediately open dev tools so we can inspect breakpoint halts
      // (when we added a "debugger" statement in our code
      args.push('--auto-open-devtools-for-tabs');
      // TODO: pause on exception (if there is such cli arg)
      return args;
    }
  });

  on('file:preprocessor', wp({ webpackOptions }));

  // store process env in cypress env,
  // see https://docs.cypress.io/guides/guides/environment-variables.html#Option-2-cypress-env-json
  return { ...config, env: process.env };
};

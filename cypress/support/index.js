// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// re-run tests on webpack-dev-server restarts, see https://github.com/nrwl/nx/issues/870#issuecomment-551281721
Cypress.on('window:before:load', (win) => {
  const _consoleInfo = win.console.info;
  win.console.info = function() {
    if (arguments[0].includes('App updated.')) {
      cy.$$('.restart', top.document).click();
    }
    return _consoleInfo.apply(win.console, arguments);
  };
});

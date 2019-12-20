// ***********************************************************
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';



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

// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

// commands get prefixed with `fmp` to clarify their origin when consumed
import config from '~/config';
import { productionDefaultState } from '~/pages/KatasterKI/state';

// TODO: handle the issue that augmenting the cy object with the methods below leads to linting errors

Cypress.Commands.add(
  'fmbClickRandomElement',
  (selector, isDataAttribute = true, clickOptions) => {
    const fullSelector = isDataAttribute ? `[data-cy=${selector}]` : selector;
    cy.get(fullSelector)
      .as('selection')
      .its('length')
      .then((count) => {
        const randomZeroBasedIndex = Math.floor(Math.random() * count);
        cy.get('@selection')
          .eq(randomZeroBasedIndex)
          .click(clickOptions);
      });
  }
);

Cypress.Commands.add('fmbGoToProfile', (profile = 1) => {
  // The selection of intro questions is hardcoded here because they
  // are usually selected randomly, which makes testing harder.
  cy.visit(`${config.routes.katasterKI.profileBase}/${profile}`, {
    onBeforeLoad: (win) => {
      // eslint-disable-next-line no-param-reassign
      win.initialState = {
        ...productionDefaultState,
        introSelection: [0, 1, 2]
      };
    }
  });
});

Cypress.Commands.add('fmbReturnToScene', (scene = 1) => {
  cy.visit(`${config.routes.katasterKI.scenesBase}/${scene}`);
});

function getFixedStateJson(fileNameWithoutEnding) {
  return cy.fixture(`katasterKiStates/${fileNameWithoutEnding}.json`);
}

Cypress.Commands.add('fmbGoToScene', (scene = 1) => {
  getFixedStateJson('afterProfileSubmit').then((stateSlice) => {
    cy.visit(`${config.routes.katasterKI.scenesBase}/${scene}`, {
      onBeforeLoad(win) {
        // eslint-disable-next-line no-param-reassign
        win.initialState = stateSlice;
      }
    });
  });
});

// Fix for Cypress not supporting to wait for `fetch` requests
// https://github.com/cypress-io/cypress/issues/95#issuecomment-570098957
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const opts = {
    ...options,
    onBeforeLoad: (window, ...args) => {
      // eslint-disable-next-line no-param-reassign
      window.fetch = null;
      if (options && options.onBeforeLoad) {
        return options.onBeforeLoad(window, ...args);
      }
      return null;
    }
  };
  return originalFn(url, opts);
});

// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

// commands get prefixed with `fmp` to clarify their origin when consumed
import config from '~/config';

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
  cy.visit(`${config.routes.katasterKI.profileBase}/${profile}`);
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

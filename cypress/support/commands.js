// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

// commands get prefixed with `fmp` to clarify their origin when consumed
import config from '~/config';
import { productionDefaultState } from '~/pages/KatasterKI/state';
import { login } from '~/pages/User/UserState';

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

Cypress.Commands.add('visitWithState', (route, state = null) => {
  cy.visit(route, {
    onBeforeLoad: (win) => {
      if (state != null) {
        // eslint-disable-next-line no-param-reassign
        win.initialState = state;
      }
    }
  });
  // if (cy.url() !== route) cy.window().then((win) => win.appHistory.push(route));
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

/**
 * Login a user with credentials defined in Cypress config and dispatch login
 */
Cypress.Commands.add('fmbLogin', () => {
  const credentials = {
    username: Cypress.env('CYPRESS_USERNAME'),
    password: Cypress.env('CYPRESS_PASSWORD')
  };
  if (credentials.username == null || credentials.password == null) {
    throw new Error(
      'Credentials not defined: This test requires credentials for a test user account'
    );
  }
  // mock form functions expected by login function
  const formFunctions = {
    setSubmitting: () => null,
    setErrors: (err) => {
      cy.log('Error handling login:', err);
      throw new Error('Error handling login:', err.message);
    },
    setStatus: () => null
  };
  cy.window()
    .its('store')
    .as('store');
  cy.get('@store').then((store) =>
    login(credentials, formFunctions)(store.dispatch)
  );
});

// Fix for Cypress not supporting to wait for `fetch` requests
// https://github.com/cypress-io/cypress/issues/95#issuecomment-570098957
// MIT License per https://github.com/cypress-io/cypress/blob/develop/LICENSE
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

// mock a geo location request
// https://github.com/cypress-io/cypress/issues/2671#issuecomment-564796821
// MIT License per https://github.com/cypress-io/cypress/blob/develop/LICENSE
Cypress.Commands.add(
  'mockGeolocation',
  (latitude = 52.490064, longitude = 13.38694) => {
    return cy.window().then(($window) => {
      return cy.stub(
        $window.navigator.geolocation,
        'getCurrentPosition',
        (callback) => {
          return callback({ coords: { latitude, longitude } });
        }
      );
    });
  }
);

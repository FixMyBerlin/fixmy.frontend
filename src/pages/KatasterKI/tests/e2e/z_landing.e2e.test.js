//
// This test module is named to NOT be run as the first test. Otherwise,
// Javascript bundles for this project are for some reason not generated.
//

import config from '~/config';

describe('katasterKi landing', () => {
  before(() => {
    cy.visit(config.routes.katasterKI.landing);
    cy.get('[data-cy=kat-start-survey-btn]').click();
  });

  it('links to step 1', () => {
    cy.location('pathname').should(
      'eq',
      `${config.routes.katasterKI.profileBase}/1`
    );
  });
});

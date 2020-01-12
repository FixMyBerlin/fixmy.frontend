// TODO: split tests into multiple files
import config from '../../../../../config';

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



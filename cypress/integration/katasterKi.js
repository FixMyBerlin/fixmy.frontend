import config from '../../config';

describe('Kastaster survey', () => {

  context('start', () => {
    before(() => {
      cy.visit(config.routes.katasterKI.landing);
      cy.get('[data-cy=kat-start-survey-btn]').click();
    });

    // TODO: use config, see https://docs.cypress.io/api/plugins/configuration-api.html#Usage
    it('has location path indicating that it is the first step', () => {
      cy.location((loc) => {
        expect(
          loc.pathname.split('/').slice(-1)
        ).to.eq('1');
      });
    });

    it('shows a progress bar', () => {
      cy.get('[data-cy=kat-progress-bar]').should('exist');
    });
  });
});

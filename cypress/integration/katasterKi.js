import config from '../../config';

describe('Kastaster survey', () => {

  describe('landing page', () => {
    before(() => {
      cy.visit(config.routes.katasterKI.landing);
      cy.get('[data-cy=kat-start-survey-btn]').click();
    });

    it('links to step 1', () => {
      cy.location('pathname')
        .should('eq', `${config.routes.katasterKI.profileBase}/1`);
    });
  });

  describe('step 1', () => {
    before(() => {
      cy.visit(`${config.routes.katasterKI.profileBase}/1`);
    });

    it('shows a progress bar', () => {
      cy.get('[data-cy=kat-progress-bar]').should('exist');
    });

    it('contains checkboxes', () => {
      cy.get('[type="checkbox"]');
    });

    it('links to step 2', () => {
      cy.get('[data-cy=kat-multichoice-proceed-btn]').click();
      cy.location('pathname')
        .should('eq', `${config.routes.katasterKI.profileBase}/2`);
    });
  });
});

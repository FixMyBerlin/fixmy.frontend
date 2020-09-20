import { cyElem } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';

describe('The reports landing page', () => {
  beforeEach(() => {
    cy.visit(config.routes.reports.landing);
  });

  it(
    'A user can find answers to common questions ' +
      'by revealing the answer with a click on the question',
    () => {
      // initially, answers should be hidden
      cyElem('reports-landing-faq-item').within(() => {
        cy.get('.Collapsible__contentInner').should('not.be.visible');
      });
      // when a question is clicked, the answer is revealed
      cyElem('reports-landing-faq-item')
        .should('be.visible')
        .first()
        .scrollIntoView()
        .click();
      cyElem('reports-landing-faq-item').within(() => {
        cy.get('.Collapsible__contentInner').should('be.visible');
      });
      // an item collapses once it is clicked again
      cyElem('reports-landing-faq-item')
        .first()
        .click();
      cyElem('reports-landing-faq-contents').should('not.be.visible');
    }
  );

  it('A user can find links to see all existing reports', () => {
    cyElem('reports-landing-mapLink')
      .should('be.visible')
      .first()
      .click();

    // the url should be "speaking"
    cy.url().should('include', 'karte');
    // there should be a mal
    cyElem('reports-basemap').should('be.visible');
  });

  it('A user can find links to see create a new report', () => {
    if (!config.reports.enabled) {
      cy.log(
        'skipping the test that ensures tge presence of an element navigation the user' +
          ' to the new report form The feature is disabled via config. ' +
          'Please make sure this is happening intentionally.'
      );
      return;
    } // anyways go in with the test

    cyElem('reports-landing-cta')
      .should('be.visible')
      .first()
      .click();

    cy.url().should('include', 'neu');
  });
});

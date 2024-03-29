import config from '~/pages/Reports/config';

import { cyElem } from '~/../cypress/support/utils';

describe('The reports landing page', () => {
  before(() => {
    cy.visit(config.routes.reports.landing);
    if (config.reports.landing?.logo) {
      cyElem('reports-landing-logo').should((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0);
      });
    }
  });
  it('has a title', () => {
    cyElem('reports-landing-header').should('be.visible');
    cyElem('reports-landing-header').first().contains(config.reports.region);
  });
  // it('has a button that takes users to the report form', () => {
  //   cyElem('reports-landing-cta')
  //     .should('be.visible')
  //     .first()
  //     .click()
  //     .then(() => cy.url().should('be', '**/neu/1'));
  //   cy.visit(config.routes.reports.landing);
  // });
  // it('takes users to the map of existing reports when clicked', () => {
  //   cyElem('reports-landing-mapLink')
  //     .should('be.visible')
  //     .first()
  //     .click()
  //     .then(() => cy.url().should('be', '**/karte'));
  //   cy.visit(config.routes.reports.landing);
  // });
  // describe('an FAQ item', () => {
  //   it('extends when clicked', () => {
  //     cyElem('reports-landing-faq-item').within(() => {
  //       cy.get('.Collapsible__contentInner').should('not.be.visible');
  //     });
  //     cyElem('reports-landing-faq-item')
  //       .should('be.visible')
  //       .first()
  //       .scrollIntoView()
  //       .click();
  //     cyElem('reports-landing-faq-item').within(() => {
  //       cy.get('.Collapsible__contentInner').should('be.visible');
  //     });
  //   });
  //   it('collapses when clicked again', () => {
  //     cyElem('reports-landing-faq-item')
  //       .first()
  //       .click();
  //     cyElem('reports-landing-faq-contents').should('not.be.visible');
  //   });
  // });
});

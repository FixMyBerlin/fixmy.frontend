import { getByDataAttr } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';

describe('The reports landing page', () => {
  before(() => {
    cy.visit(config.routes.reports.landing);
    getByDataAttr`reports-landing-logo`.should((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0);
    });
  });
  it('has a title', () => {
    getByDataAttr`reports-landing-header`.should('be.visible');
    getByDataAttr`reports-landing-header`
      .first()
      .contains(config.reports.region);
  });
  it('has a button that takes users to the report form', () => {
    getByDataAttr`reports-landing-cta`
      .should('be.visible')
      .first()
      .click()
      .then(() => cy.url().should('be', '**/neu/1'));
    cy.visit(config.routes.reports.landing);
  });
  it('takes users to the map of existing reports when clicked', () => {
    getByDataAttr`reports-landing-mapLink`
      .should('be.visible')
      .first()
      .click()
      .then(() => cy.url().should('be', '**/karte'));
    cy.visit(config.routes.reports.landing);
  });
  describe('an FAQ item', () => {
    it('extends when clicked', () => {
      getByDataAttr`reports-landing-faq-item`.within(() => {
        cy.get('.Collapsible__contentInner').should('not.be.visible');
      });
      getByDataAttr`reports-landing-faq-item`
        .should('be.visible')
        .first()
        .scrollIntoView()
        .click();
      getByDataAttr`reports-landing-faq-item`.within(() => {
        cy.get('.Collapsible__contentInner').should('be.visible');
      });
    });
    it('collapses when clicked again', () => {
      getByDataAttr`reports-landing-faq-item`.first().click();
      getByDataAttr`reports-landing-faq-contents`.should('not.be.visible');
    });
  });
});

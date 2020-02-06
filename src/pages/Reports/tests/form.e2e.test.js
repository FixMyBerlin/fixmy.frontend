import { getByDataAttr } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';

describe('The reports submission form', () => {
  describe('starting page', () => {
    before(() => {
      cy.visit(config.routes.reports.new);
    });
    it('has a header', () => {
      getByDataAttr`reports-heading`.should('be.visible');
    });
    it('has a menu button', () => {
      getByDataAttr`hamburger-button`.should('be.visible');
    });
    it('has a title', () => {
      getByDataAttr`reports-locatemode-title`.should('be.visible');
    });
    describe('the locate me button', () => {
      it('is visible', () => {
        getByDataAttr`reports-locatemode-currentPosition`.should('be.visible');
      });
      it('redirects to the map', () => {
        cy.mockGeolocation();
        getByDataAttr`reports-locatemode-currentPosition`.click();
        getByDataAttr`reports-locateme-address-invalid`.should('be.visible');
        cy.visit(config.routes.reports.new);
      });
    });
    it('shows an address-input button', () => {
      getByDataAttr`reports-locatemode-enterPosition`.should('be.visible');
    });
    describe('the close button', () => {
      it('is visible', () => {
        getByDataAttr`reports-locatemode-close-button`.should('be.visible');
      });
      it('opens the reports map when clicked', () => {
        getByDataAttr`reports-locatemode-close-button`.click();
        cy.url().should('be', config.routes.reports.map);
      });
    });
  });
});

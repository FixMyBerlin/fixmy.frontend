import { getByDataAttr } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';

describe('The reports submission form', () => {
  describe('starting page', () => {
    beforeEach(() => {
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
        cy.window().then((win) => {
          // disabled because chai uses this syntax
          // eslint-disable-next-line no-unused-expressions
          expect(win.navigator.geolocation.getCurrentPosition).to.be.called;
        });
        getByDataAttr`reports-locateme-address-invalid`.should('be.visible');
      });
    });

    describe('the address-input button', () => {
      it('should be visible', () => {
        getByDataAttr`reports-locatemode-enterPosition`.should('be.visible');
      });
      it('should take users to the map when clicked', () => {
        getByDataAttr`reports-locatemode-enterPosition`.click();
        cy.url().should('be', config.routes.reports.map);
      });
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

  describe('the address input page', () => {
    beforeEach(() => {
      cy.visit(config.routes.reports.new);
      getByDataAttr`reports-locatemode-enterPosition`.click();
    });

    describe('initially', () => {
      it("doesn't let me confirm my position");
      it('shows me an address input field');
      it('shows a map');
    });

    describe('when an address is entered', () => {
      it('shows a list of suggestions');
      describe('when a suggestion is clicked', () => {
        it('moves the map to this position');
        it('indicates the target position and address');
        it("let's me confirm the position");
      });
      it("let's me reset the position with a button");
    });
  });
  describe('the locate me page', () => {
    it('moves the map to my position');
    it('indicates the target position and address');
    it("let's me confirm the position");
    it("let's me move the map to update the position");
  });
});

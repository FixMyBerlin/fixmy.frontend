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
      it("doesn't let me confirm my position", () => {
        getByDataAttr`reports-form-confirm-location-button`.should(
          'be.disabled'
        );
      });
      it('shows me an address input field and an info box', () => {
        getByDataAttr`map-address-input`
          .should('be.visible')
          .and('have.value', '');
        getByDataAttr`reports-map-help`
          .should('be.visible')
          .contains('Bewege die Karte oder tippe eine Adresse ein');
      });
      it('shows a map', () => {
        getByDataAttr`reports-map-help`.should('be.visible');
      });
    });

    describe('when an address is entered', () => {
      beforeEach(() => {
        getByDataAttr`map-address-input`.type('meh');
      });
      it('shows a list of suggestions', () => {
        getByDataAttr`map-address-suggestion`.its('length').should('be.gte', 2);
      });
      describe('when a suggestion is clicked', () => {
        beforeEach(() => {
          getByDataAttr`map-address-suggestion`.first().click();
        });
        it('the suggestions are hidden', () => {
          getByDataAttr`map-address-suggestion`.should('not.exist');
        });
        it('moves the map to this position');
        it('indicates the target position and address', () => {});
        it("let's me confirm the position", () => {
          getByDataAttr`reports-form-confirm-location-button`.should(
            'not.be.disabled'
          );
        });
      });
      it.only("let's me reset the position with a button", () => {
        getByDataAttr`map-address-reset`
          .should('be.visible')
          .click()
          .then(() => {
            getByDataAttr`map-address-reset`.should('not.exist');
            getByDataAttr`map-address-suggestion`.should('not.exist');
            getByDataAttr`map-address-input`.should('have.value', '');
          });
      });
    });
  });
  describe('the locate me page', () => {
    it('moves the map to my position');
    it('indicates the target position and address');
    it("let's me confirm the position");
    it("let's me move the map to update the position");
  });
});

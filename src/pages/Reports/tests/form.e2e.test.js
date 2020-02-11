import { getByDataAttr } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';
import utils from './utils';

describe('The reports submission form', () => {
  describe('starting page', () => {
    beforeEach(() => {
      cy.visit(config.routes.reports.new);
    });

    describe('main elements', () => {
      it('has a header', () => {
        getByDataAttr`reports-heading`.should('be.visible');
      });
      it('has a menu button', () => {
        getByDataAttr`hamburger-button`.should('be.visible');
      });
      it('has a title', () => {
        getByDataAttr`reports-locatemode-title`.should('be.visible');
      });
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
        getByDataAttr`reports-locateme-address-valid`.should('be.visible');
      });
    });

    describe('the address-input button', () => {
      it('is visible', () => {
        getByDataAttr`reports-locatemode-enterPosition`.should('be.visible');
      });
      it('takes users to the map when clicked', () => {
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
        getByDataAttr`reports-basemap`.should('be.visible');
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
      it("let's me reset the position with a button", () => {
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
    before(() => {
      cy.visit(config.routes.reports.new);
      cy.mockGeolocation();
      getByDataAttr`reports-locatemode-currentPosition`.click();
    });

    it('moves the map to my position');
    it('indicates the target position and address', () => {
      getByDataAttr`reports-locateme-address-valid`.should('be.visible');
    });
    it("let's me move the map to update the position");
    it("let's me confirm the position", () => {
      getByDataAttr`reports-form-confirm-location-button`
        .should('not.be.disabled')
        .and('be.visible')
        .click();
    });
    describe('which opens a confirmation dialogue', () => {
      beforeEach(() => {
        cy.visit(config.routes.reports.new);
        cy.mockGeolocation();
        getByDataAttr`reports-locatemode-currentPosition`.click();
        getByDataAttr`reports-form-confirm-location-button`.click();
      });
      it('shows a banner about this', () => {
        getByDataAttr`reports-locateme-confirm`
          .should('be.visible')
          .contains('Der Ort wurde markiert!');
      });
      it('prevents me from moving the map');
      it("let's me reset my selection", () => {
        getByDataAttr`reports-locateme-confirm-reset`.click();
        getByDataAttr`reports-locateme-confirm`.should('not.exist');
      });
      it('lets me confirm my location', () => {
        getByDataAttr`reports-locateme-confirm-continue`.click();
        cy.url().should('be', `${config.routes.reports.new}/2`);
      });
    });
  });
  describe('form page for number of bikestands', () => {
    before(() => {
      utils.goToBikeStandForm('Mehringdamm');
    });
    it('has a slider', () => {
      getByDataAttr`reports-bikestands-slider-wrapper`.should('be.visible');
    });
    it('continues when clicking the continue button', () => {
      getByDataAttr`reports-bikestands-continue`.click();
      cy.url().should('be', `${config.routes.reports.new}/3`);
    });
  });

  describe('photo and description form', () => {
    before(() => {
      utils.goToAdditionalDataForm('Mehringdamm');
    });

    it('has a title and description', () => {
      cy.get('h3').contains('Bitte entweder noch ein Foto von dem Ort');
      cy.get('p').contains('Ein Foto des Ortes hilft der Verwaltung');
    });
    it('initially prevents continuing in the form', () => {
      getByDataAttr`reports-additional-continue`.should('be.disabled');
    });
    it('has an input element to add a photo');
    it("let's users reset a selected photo");
    it('blocks continuing until terms for photo uploads have been confirmed');
    it('has a section to submit comments', () => {
      getByDataAttr`reports-additional-comment`.type('Test-Kommentärchen');
    });
    it('enables the continue-button when text is entered', () => {
      getByDataAttr`reports-additional-continue`.should('be.enabled');
    });
    it('enables the continue-button when a photo is selected');
    it('moves to the next page when continue is clicked', () => {
      getByDataAttr`reports-additional-continue`.click();
      cy.url().should('be', `${config.routes.reports.new}/4`);
    });
  });

  describe('bicycle parking garage form', () => {
    before(() => {
      utils.goToParkingGarageForm('Mehringdamm');
    });
    it('initially blocks proceeding with the form', () => {
      getByDataAttr`reports-locker-continue`.should('be.disabled');
    });
    it('shows a title and loads an image a bike locker', () => {
      getByDataAttr`reports-locker-heading`.should('be.visible');
      getByDataAttr`reports-locker-figure`.should('be.visible');
    });
    it("let's users select whether they are interested in bike lockers", () => {
      getByDataAttr`reports-locker-accept`
        .should('be.visible')
        .and('not.checked');
      getByDataAttr`reports-locker-accept`.click();
      getByDataAttr`reports-locker-accept`.should('be.checked');

      getByDataAttr`reports-locker-deny`
        .should('be.visible')
        .and('not.checked');
      getByDataAttr`reports-locker-deny`.click();
      getByDataAttr`reports-locker-deny`.should('be.checked');
    });
    it("let's users confirm their choice", () => {
      getByDataAttr`reports-locker-continue`.should('not.be.disabled');
    });
  });

  describe('continuing on the last page', () => {
    before(() => {
      localStorage.debug = 'cypress*';
      cy.server()
        .route('POST', '**/reports')
        .as('postReport');
    });
    it('results are submitted to the backend', () => {
      utils.goToParkingGarageForm('Mehringdamm 1');
      getByDataAttr`reports-locker-accept`.click();
      getByDataAttr`reports-locker-continue`.click();

      cy.wait('@postReport')
        .its('request.body')
        .should('deep.equal', {
          address: 'Mehringdamm 1, 10965 Berlin',
          geometry: { type: 'Point', coordinates: [13.386379, 52.489505] },
          details: { subject: 'BIKE_STANDS', number: 1, fee_acceptable: true },
          description: 'Test-Kommentärchen'
        });
    });
    it('a thank-you page is displayed', () => {
      cy.url().should('be', `${config.routes.reports.new}/5`);
    });
    it('a thank-you image is loaded');
    describe('the signup-form on the thank-you page', () => {
      it("let's users enter their email address");
      it('requires confirmation of data policies before continuing');
      it('sends a request to signup for the newsletter');
      it(
        'prevents submitting the form when the email-address is not formatted correctly'
      );
    });
    it("let's me display my submission on the overview map", () => {
      getByDataAttr`reports-submitted-anon-show-report`.click();
      cy.url().should('contain', config.routes.reports.map);
      getByDataAttr`map-details-header-title`.contains('Mehringdamm 1');
    });
    describe('submission process when user is already logged in', () => {
      it('the signup-form is not displayed on the last page');
      it("let's me display my submission on the overview map");
    });
  });

  describe('the navigation bar', () => {
    it('does not let me move the end of the form in the beginning');
    it('does let me move back to previous steps');
  });
});

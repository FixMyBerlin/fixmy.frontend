import { cyElem } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';
import utils from './utils';

describe('The reports submission form', () => {
  describe('starting page', () => {
    beforeEach(() => {
      cy.visit(config.routes.reports.new);
    });

    describe('main elements', () => {
      it('has a header', () => {
        cyElem('reports-heading').should('be.visible');
      });
      it('has a menu button', () => {
        cyElem('hamburger-button').should('be.visible');
      });
      it('has a title', () => {
        cyElem('reports-locatemode-title').should('be.visible');
      });
    });

    describe('the locate me button', () => {
      it('is visible', () => {
        cyElem('reports-locatemode-currentPosition').should('be.visible');
      });
      it('redirects to the map', () => {
        cy.mockGeolocation(config.reports.tests.mockGeoLocation);
        cyElem('reports-locatemode-currentPosition').click();
        cy.window().then((win) => {
          expect(win.navigator.geolocation.getCurrentPosition).to.be.called;
        });
        cyElem('reports-locateme-address-valid').should('be.visible');
      });
    });

    describe('the address-input button', () => {
      it('is visible', () => {
        cyElem('reports-locatemode-enterPosition').should('be.visible');
      });
      it('takes users to the map when clicked', () => {
        cyElem('reports-locatemode-enterPosition').click();
        cy.url().should('be', config.routes.reports.map);
      });
    });

    describe('the close button', () => {
      it('is visible', () => {
        cyElem('reports-locatemode-close-button').should('be.visible');
      });
      it('opens the reports map when clicked', () => {
        cyElem('reports-locatemode-close-button').click();
        cy.url().should('be', config.routes.reports.map);
      });
    });
  });

  describe('the address input page', () => {
    beforeEach(() => {
      cy.visit(config.routes.reports.new);
      cyElem('reports-locatemode-enterPosition').click();
    });

    describe('initially', () => {
      it("doesn't let me confirm my position", () => {
        cyElem('reports-form-confirm-location-button').should('be.disabled');
      });
      it('shows me an address input field and an info box', () => {
        cyElem('map-address-input')
          .should('be.visible')
          .and('have.value', '');
        cyElem('reports-map-help')
          .should('be.visible')
          .contains('Bewege die Karte oder tippe eine Adresse ein');
      });
      it('shows a map', () => {
        cyElem('reports-basemap').should('be.visible');
      });
    });

    describe('when an address is entered', () => {
      beforeEach(() => {
        cyElem('map-address-input').type(config.reports.tests.addressInput);
      });
      it('shows a list of suggestions', () => {
        cyElem('map-address-suggestion')
          .its('length')
          .should('be.gte', 2);
      });
      describe('when a suggestion is clicked', () => {
        beforeEach(() => {
          cyElem('map-address-suggestion')
            .first()
            .click();
        });
        it('the suggestions are hidden', () => {
          cyElem('map-address-suggestion').should('not.exist');
        });
        it('moves the map to this position');
        it('indicates the target position and address', () => {});
        it("let's me confirm the position", () => {
          cyElem('reports-form-confirm-location-button').should(
            'not.be.disabled'
          );
        });
      });
      it("let's me reset the position with a button", () => {
        cyElem('map-address-reset')
          .should('be.visible')
          .click()
          .then(() => {
            cyElem('map-address-reset').should('not.exist');
            cyElem('map-address-suggestion').should('not.exist');
            cyElem('map-address-input').should('have.value', '');
          });
      });
    });
  });
  describe('the locate me page', () => {
    before(() => {
      cy.visit(config.routes.reports.new);
      cy.mockGeolocation(config.reports.tests.mockGeoLocation);
      cyElem('reports-locatemode-currentPosition').click();
    });

    it('moves the map to my position');
    it('indicates the target position and address', () => {
      cyElem('reports-locateme-address-valid').should('be.visible');
    });
    it("let's me move the map to update the position");
    it("let's me confirm the position", () => {
      cyElem('reports-form-confirm-location-button')
        .should('not.be.disabled')
        .and('be.visible')
        .click();
    });
    describe('which opens a confirmation dialogue', () => {
      beforeEach(() => {
        cy.visit(config.routes.reports.new);
        cy.mockGeolocation(config.reports.tests.mockGeoLocation);
        cyElem('reports-locatemode-currentPosition').click();
        cyElem('reports-form-confirm-location-button').click();
      });
      it('shows a banner about this', () => {
        cyElem('reports-locateme-confirm')
          .should('be.visible')
          .contains('Der Ort wurde markiert!');
      });
      it('prevents me from moving the map');
      it("let's me reset my selection", () => {
        cyElem('reports-locateme-confirm-reset').click();
        cyElem('reports-locateme-confirm').should('not.exist');
      });
      it('lets me confirm my location', () => {
        cyElem('reports-locateme-confirm-continue').click();
        cy.url().should('be', `${config.routes.reports.new}/2`);
      });
    });
  });
  describe('form page for number of bikestands', () => {
    before(() => {
      utils.goToBikeStandForm();
    });
    it('has a slider', () => {
      cyElem('reports-bikestands-slider-wrapper').should('be.visible');
    });
    it('continues when clicking the continue button', () => {
      cyElem('reports-bikestands-continue').click();
      cy.url().should('be', `${config.routes.reports.new}/3`);
    });
  });

  describe('photo and description form', () => {
    before(() => {
      utils.goToAdditionalDataForm();
    });

    it('has a title and description', () => {
      cy.get('h3').contains('Bitte entweder noch ein Foto von dem Ort');
      cy.get('p').contains('Ein Foto des Ortes hilft der Verwaltung');
    });
    it('initially prevents continuing in the form', () => {
      cyElem('reports-additional-continue').should('be.disabled');
    });
    it('has an input element to add a photo');
    it("let's users reset a selected photo");
    it('blocks continuing until terms for photo uploads have been confirmed');
    it('has a section to submit comments', () => {
      cyElem('reports-additional-comment').type('Test-Kommentärchen');
    });
    it('enables the continue-button when text is entered', () => {
      cyElem('reports-additional-continue').should('be.enabled');
    });
    it('enables the continue-button when a photo is selected');
    it('moves to the next page when continue is clicked', () => {
      cyElem('reports-additional-continue').click();
      cy.url().should('be', `${config.routes.reports.new}/4`);
    });
  });

  describe('bicycle parking garage form', () => {
    before(() => {
      utils.goToParkingGarageForm();
    });
    it('initially blocks proceeding with the form', () => {
      cyElem('reports-locker-continue').should('be.disabled');
    });
    it('shows a title and loads an image a bike locker', () => {
      cyElem('reports-locker-heading').should('be.visible');
      cyElem('reports-locker-figure').should('be.visible');
    });
    it("let's users select whether they are interested in bike lockers", () => {
      cyElem('reports-locker-accept')
        .should('be.visible')
        .and('not.checked');
      cyElem('reports-locker-accept').click();
      cyElem('reports-locker-accept').should('be.checked');

      cyElem('reports-locker-deny')
        .should('be.visible')
        .and('not.checked');
      cyElem('reports-locker-deny').click();
      cyElem('reports-locker-deny').should('be.checked');
    });
    it("let's users confirm their choice", () => {
      cyElem('reports-locker-continue').should('not.be.disabled');
    });
  });

  describe('continuing on the last page', () => {
    before(() => {
      cy.server()
        .route('POST', '**/reports')
        .as('postReport');
    });
    it('results are submitted to the backend', () => {
      utils.goToParkingGarageForm();
      cyElem('reports-locker-accept').click();
      cyElem('reports-locker-continue').click();

      // the request body is not region-specific because it is
      // sourced from a test fixture that contains data
      // for Mehringdamm in Berlin.
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
      cyElem('reports-submitted-anon-show-report').click();
      cy.url().should('contain', config.routes.reports.map);
      cyElem('map-details-header-title').contains('Mehringdamm 1');
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

import { cyElem } from '~/../cypress/support/utils';
import config from '~/config';

describe('katasterKi scene rating', () => {
  describe('a new session with gathered profile information at hand', () => {
    describe('having visited the first screen', () => {
      before(() => {
        cy.fmbGoToScene(1);
      });

      it('has made the store object globally available for testing', () => {
        cy.window().its('store').should('exist');
      });
    });

    describe('the rating page', () => {
      // build an Array holding all integers between 2 and 11 to loop over
      [1, 10].forEach((page) => {
        describe(`for scene ${page}`, () => {
          const scene = page + 1;
          before(() => {
            cy.fmbGoToScene(scene);
          });

          it.skip('contains an image that has loaded properly', () => {
            cyElem('kat-scene-image-wrapper')
              .find('img')
              .should('be.visible')
              .and(($img) => {
                // "naturalWidth" and "naturalHeight" are set when the image loads
                expect($img[0].naturalWidth).to.be.greaterThan(0);
              });
          });

          it.skip('links to the next scene when a random rating button is clicked', () => {
            cy.fmbClickRandomElement('kat-scene-rating-button');
            cy.location('pathname').should(
              'eq',
              `${config.routes.katasterKI.scenesBase}/${scene + 1}`
            );
          });
        });
      });
    });

    describe('perspective choice', () => {
      it.skip('leads to a set of new scenes', () => {
        cy.fmbClickRandomElement('kat-perspective-change-single-choice-button');

        // TODO: see how testing a store update would work here

        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.scenesBase}/${1}`
        );
      });
    });
  });

  describe.skip('when the session is continued', () => {
    describe('the feedback screen', () => {
      before(() => {
        cy.fmbReturnToScene(1);
      });

      it('has a progressbar indicating a valid number of received ratings', () => {
        cyElem('kat-progress-vis-wrapper')
          .find('[data-cy=kat-progress-vis-value-label]')
          .should(($label) => {
            const text = +$label.text();
            assert.isNumber(text);
          });
      });

      it('links to the next scene', () => {
        cyElem('kat-feedback-proceed-btn').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.scenesBase}/2`
        );
      });
    });

    describe('the newsletter signup screen', () => {
      beforeEach(() => {
        cy.fmbReturnToScene(2);
        cy.get('[data-cy=kat-emailcheckboxes-input]').as('emailInput');
        cy.get('[data-cy=kat-emailcheckboxes-proceed-btn]').as(
          'emailProceedBtn'
        );
        cy.get('[data-cy=kat-emailcheckboxes-submit-btn]').as('emailSubmitBtn');
      });

      it('does not enable the submit button when an invalid email is entered', () => {
        const INVALID_MAIL = '123.de';
        cy.get('@emailInput').type(INVALID_MAIL);
        cy.get('@emailSubmitBtn').should('have.prop', 'disabled', true);
      });

      it('enables the submit button when a valid email is entered', () => {
        const VALID_MAIL = 'test@dummy.org';
        cy.get('@emailInput').type(VALID_MAIL);
        cy.get('@emailSubmitBtn').should('have.prop', 'disabled', false);
      });

      it('provides a button to proceed linking to the next page', () => {
        cy.get('@emailProceedBtn').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.scenesBase}/3`
        );
      });
    });
  });
});

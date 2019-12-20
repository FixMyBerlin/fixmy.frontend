/* eslint-disable no-use-before-define */
// TODO: split tests into multiple files
import config from '../../config';
import { getByDataAttr } from '../support/utils';

describe('Kastaster survey', () => {
  describe('landing page', () => {
    before(() => {
      cy.visit(config.routes.katasterKI.landing);
      cy.get('[data-cy=kat-start-survey-btn]').click();
    });

    it('links to step 1', () => {
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.profileBase}/1`
      );
    });
  });

  describe('profiles', () => {
    describe('profile 1', () => {
      before(() => {
        before(() => {
          cy.fmbGoToProfile(1);
        });

        it('shows a progress bar', () => {
          cy.get('[data-cy=kat-progress-bar]').should('exist');
        });

        it('contains checkboxes', () => {
          cy.get('[type="checkbox"]');
        });

        it('links to profile 2', () => {
          cy.get('[data-cy=kat-multichoice-proceed-btn]').click();
          cy.location('pathname').should(
            'eq',
            `${config.routes.katasterKI.profileBase}/2`
          );
        });
      });
    });

    describe('profile 2 and 3', () => {
      [2, 3].forEach(testSingleChoice);
    });

    describe('profile 4', () => {
      before(() => {
        cy.fmbGoToProfile(4);
      });

      // TODO: consider checking this for the other steps as well
      it('has a heading containing text', () => {
        cy.get('[data-cy=kat-info-heading]').then((element) => {
          const text = element.text();
          // eslint-disable-next-line no-unused-expressions
          expect(text).not.to.be.empty;
        });
      });

      it('links to profile 5', () => {
        cy.get('[data-cy=kat-info-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/5`
        );
      });
    });

    describe('profile 5', () => {
      const profile = 5;

      before(() => {
        cy.fmbGoToProfile(profile);

        // get references on proceed button and slider handle
        cy.get('[data-cy=kat-transport-rating-proceed-btn]').as('trProceedBtn');

        cy.get('[data-cy=kat-transport-rating-wrapper]')
          .find('.rc-slider-handle')
          .first()
          .as('sliderHandle');
      });

      it('enables the proceed-button linking to step 6 after a slider handle has been dragged', () => {
        // Cypress describes testing an input of type range [here](https://docs.cypress.io/api/commands/trigger.html#Change-Event).
        // But the lib used to implement the slider uses divs.
        // Thus moving the slider programmatically is done a bit hacky:
        cy.get('@sliderHandle')
          .trigger('mousedown')
          .type('{leftarrow}')
          .type('{rightarrow}');

        cy.get('@trProceedBtn').should('have.prop', 'disabled', false);

        cy.get('@trProceedBtn').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/${profile + 1}`
        );
      });
    });

    describe('profile 6, 7 and 8', () => {
      [6, 7, 8].forEach(testSingleChoice);
    });

    describe('profile 9', () => {
      before(() => {
        cy.fmbGoToProfile(9);
      });

      it('shows a progress bar', () => {
        cy.get('[data-cy=kat-progress-bar]').should('exist');
      });

      it('contains checkboxes', () => {
        cy.get('[type="checkbox"]');
      });

      it('links to profile 9', () => {
        cy.get('[data-cy=kat-multichoice-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/9`
        );
      });
    });

    describe('profile 10', () => {
      testSingleChoice(10);
    });

    describe('profile 11', () => {
      before(() => {
        cy.fmbGoToProfile(11);
      });

      it('shows a progress bar', () => {
        cy.get('[data-cy=kat-progress-bar]').should('exist');
      });

      it('contains radio button ', () => {
        cy.get('[type="radio"]')
          .last()
          .check();
      });

      it('links to profile 12', () => {
        cy.get('[data-cy=kat-radiogroups-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/12`
        );
      });
    });

    describe('profile 12', () => {
      // we cannot use "before" since the aliases would only be available in the first "it"
      beforeEach(() => {
        cy.fmbGoToProfile(12);
        cy.get('[data-cy=kat-zip-input]').as('zipInput');
        cy.get('[data-cy=kat-zip-proceed-btn]').as('zipProceedBtn');
      });

      it('disables the proceed button missing zip input', () => {
        cy.get('@zipInput')
          .type('{selectall}')
          .type('{del}');
        cy.get('@zipProceedBtn').should('have.prop', 'disabled', true);
      });

      it('enables the proceed button when 5 numbers have been entered', () => {
        cy.get('@zipInput')
          .type('{selectall}')
          .type('01234');
        cy.get('@zipProceedBtn').should('have.prop', 'disabled', false);
      });

      it('enables the proceed button when more than 5 numbers have been entered', () => {
        cy.get('@zipInput')
          .type('{selectall}')
          .type('012345678');
        cy.get('@zipProceedBtn').should('have.prop', 'disabled', true);
      });

      it(`links to the first scene`, () => {
        cy.get('@zipProceedBtn').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.scenesBase}/1`
        );
      });
    });
  });

  describe('scenes', () => {
    describe('a new session with gathered profile information at hand', () => {
      it('[internal] has made the store object globally available for testing', () => {
        cy.window()
          .its('store')
          .should('exist');
      });

      describe('scene 1', () => {
        before(() => {
          cy.fmbGoToScene(1);
        });

        it('links to scene 2', () => {
          getByDataAttr`kat-info-proceed-btn`.click();
          cy.location('pathname').should(
            'eq',
            `${config.routes.katasterKI.scenesBase}/2`
          );
        });
      });

      describe('scenes 2 - 11', () => {
        // build an Array holding all integers between 2 and 11 to loop over
        new Array(10)
          .fill(0)
          .map((el, i) => i + 2)
          .forEach((scene) => {
            describe(`scene ${scene}`, () => {
              before(() => {
                cy.fmbGoToScene(scene);
              });

              it('contains an image that has loaded properly', () => {
                getByDataAttr`kat-scene-image-wrapper`
                  .find('img')
                  .should('be.visible')
                  .and(($img) => {
                    // "naturalWidth" and "naturalHeight" are set when the image loads
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                  });
              });

              it('links to the next scene when a random rating button is clicked', () => {
                cy.fmbClickRandomElement('kat-scene-rating-button');
                cy.location('pathname').should(
                  'eq',
                  `${config.routes.katasterKI.scenesBase}/${scene + 1}`
                );
              });
            });
          });
      });

      describe('scene 12: perspective choice', () => {
        it('leads to a set of new scenes', () => {
          cy.fmbClickRandomElement('kat-perspective-change-single-choice-button');

          // TODO: see how testing a store update would work here

          cy.location('pathname').should(
            'eq',
            `${config.routes.katasterKI.scenesBase}/${1}`
          );
        });
      });
    });

    describe('when a session is resumed', () => {
      describe('scene 1: proceed with ratings screen', () => {
        before(() => {
          cy.fmbReturnToScene(1);
        });

        it('has a progressbar indicating a valid number of received ratings', () => {
          getByDataAttr`kat-progress-vis-wrapper`
            .find('[data-cy=kat-progress-vis-value-label]')
            .should(($label) => {
              const text = +$label.text();
              assert.isNumber(text);
            });
        });

        it('links to scene 2', () => {
          getByDataAttr`kat-feedback-proceed-btn`.click();
          cy.location('pathname').should(
            'eq',
            `${config.routes.katasterKI.scenesBase}/2`
          );
        });
      });

      describe('scene 2: leave email to stay informed', () => {
        beforeEach(() => {
          cy.fmbReturnToScene(2);
          cy.get('[data-cy=kat-emailcheckboxes-input]').as('emailInput');
          cy.get('[data-cy=kat-emailcheckboxes-proceed-btn]').as(
            'emailProceedBtn'
          );
          cy.get('[data-cy=kat-emailcheckboxes-submit-btn]').as(
            'emailSubmitBtn'
          );
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

        it('provides a button to proceed linking to step 3', () => {
          cy.get('@emailProceedBtn').click();
          cy.location('pathname').should(
            'eq',
            `${config.routes.katasterKI.scenesBase}/3`
          );
        });
      });
    });
  });
});

function testSingleChoice(profile) {
  describe(`profile ${profile}`, () => {
    before(() => {
      cy.fmbGoToProfile(profile);
      cy.get('[data-cy=kat-singlechoice-btn]')
        .first()
        .as('singleChoiceBtn');
    });

    it('has a single choice buttons which links to the next step', () => {
      cy.get('@singleChoiceBtn').click();
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.profileBase}/${profile + 1}`
      );
    });
  });
}

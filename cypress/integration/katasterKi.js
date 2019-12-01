/* eslint-disable no-use-before-define */

import config from '../../config';

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

  describe('step 1', () => {
    before(() => {
      before(() => {
        goToStep(1);
      });

      it('shows a progress bar', () => {
        cy.get('[data-cy=kat-progress-bar]').should('exist');
      });

      it('contains checkboxes', () => {
        cy.get('[type="checkbox"]');
      });

      it('links to step 2', () => {
        cy.get('[data-cy=kat-multichoice-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/2`
        );
      });
    });

    describe('step 2 and 3', () => {
      [2, 3].forEach(testSingleChoice);
    });

    describe('step 4', () => {
      before(() => {
        goToStep(4);
      });

      // TODO: consider checking this for the other steps as well
      it('has a heading containing text', () => {
        cy.get('[data-cy=kat-info-heading]').then((element) => {
          const text = element.text();
          expect(text).not.to.be.empty;
        });
      });

      it('links to step 5', () => {
        cy.get('[data-cy=kat-info-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/5`
        );
      });
    });

    describe('step 5', () => {
      const step = 5;

      before(() => {
        goToStep(step);

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
          `${config.routes.katasterKI.profileBase}/${step + 1}`
        );
      });
    });

    describe('step 6, 7 and 8', () => {
      [6, 7, 8].forEach(testSingleChoice);
    });

    describe('step 9', () => {
      before(() => {
        goToStep(9);
      });

      it('shows a progress bar', () => {
        cy.get('[data-cy=kat-progress-bar]').should('exist');
      });

      it('contains checkboxes', () => {
        cy.get('[type="checkbox"]');
      });

      it('links to step 9', () => {
        cy.get('[data-cy=kat-multichoice-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/9`
        );
      });
    });

    describe('step 10', () => {
      testSingleChoice(10);
    });

    describe('step 11', () => {
      before(() => {
        goToStep(11);
      });

      it('shows a progress bar', () => {
        cy.get('[data-cy=kat-progress-bar]').should('exist');
      });

      it('contains radio button ', () => {
        cy.get('[type="radio"]')
          .last()
          .check();
      });

      it('links to step 12', () => {
        cy.get('[data-cy=kat-radiogroups-proceed-btn]').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.profileBase}/12`
        );
      });
    });

    describe('step 12', () => {

      // we cannot use "before" since the aliases would only be available in the first "it"
      beforeEach(() => {
        goToStep(12);
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

      it(`links to the first scenes step`, () => {
        cy.get('@zipProceedBtn').click();
        cy.location('pathname').should(
          'eq',
          `${config.routes.katasterKI.scenesBase}/1`
        );
      });
    });
  });
});

function goToStep(step = 1) {
  cy.visit(`${config.routes.katasterKI.profileBase}/${step}`);
}

function testSingleChoice(step) {
  describe(`step ${step}`, () => {
    before(() => {
      goToStep(step);
      cy.get('[data-cy=kat-singlechoice-btn]')
        .first()
        .as('singleChoiceBtn');
    });

    it('has a single choice buttons which links to the next step', () => {
      cy.get('@singleChoiceBtn').click();
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.profileBase}/${step + 1}`
      );
    });
  });
}

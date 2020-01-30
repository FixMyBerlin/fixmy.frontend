/* eslint-disable no-use-before-define */
import config from '~/config';

describe('katasterKi profiles', () => {
  describe('profile intro questions', () => {
    // The usually randomized intro questions are hardcoded in the
    // fmbGoToProfile utility function
    [1, 2, 3].forEach(testSingleChoice);
  });

  describe('transport mode intro screen', () => {
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

    it('links to profile page 5', () => {
      cy.get('[data-cy=kat-info-proceed-btn]').click();
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.profileBase}/5`
      );
    });
  });

  describe('transport mode usage', () => {
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

  describe('screens for age, hasChildren, gender', () => {
    [6, 7, 8].forEach(testSingleChoice);
  });

  describe('vehiclesOwned', () => {
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

  describe('bicycleUse', () => {
    testSingleChoice(10);
  });

  describe('whyBiking', () => {
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

  describe('zipCode', () => {
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

    it('disables the proceed button when more than 5 numbers have been entered', () => {
      cy.get('@zipInput')
        .type('{selectall}')
        .type('012345678');
      cy.get('@zipProceedBtn').should('have.prop', 'disabled', true);
    });

    it(`links to the intro screen for scene rating`, () => {
    it(`links to the first scene`, () => {
      cy.get('@zipProceedBtn').click();
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.scenesBase}/1`
      );
    });
  });
});

function testSingleChoice(profile) {
  describe(`profile single choice question ${profile}`, () => {
    before(() => {
      cy.fmbGoToProfile(profile);
    });

    it('shows a progress bar', () => {
      cy.get('[data-cy=kat-progress-bar]').should('exist');
    });

    it('has a single choice buttons which links to the next step', () => {
      cy.get('[data-cy=kat-singlechoice-btn]')
        .first()
        .click();
      cy.location('pathname').should(
        'eq',
        `${config.routes.katasterKI.profileBase}/${profile + 1}`
      );
    });
  });
}

import config from '../../config';

const adressRegex = new RegExp('[A-Za-z0-9\'\\.\\-\\s\\,]');

describe('Planungen Section', () => {

  beforeEach(() => {
    // baseUrl is configured in cypress.config.json
    cy.visit(config.routes.projects);
    cy.wait(5000); // we are purposely fetching real data (without using mocks)
  });

  describe('on marker click', () => {
    beforeEach(() => {
      cy.get('.marker-image')
        .first()
        .click({
          force: true // otherwise the click fails because the image "is being covered by another element..."
        });
    });

    describe('popup', () => {
      it('popup contains a "Mehr Infos" Button', () => {
        cy.get('[data-cy=more-info-btn]')
          .as('moreInfoButton') // keep a reference for other tests here
          .invoke('text')
          .should('contain', 'mehr Infos');
      });

      it('contains a heading', () => {
        cy.get('[data-cy="section-title"]')
          .invoke('text')
          .should('match', adressRegex);
      });

      describe('on "Mehr Infos" click', () => {
        // TODO: further implement this out
        // beforeEach(() => {
        //   this.moreInfoButton.click();
        //   cy.wait(5000);
        // });
        //
        // it('opens the detail fold-out', () => {
        //   cy.get('[data-cy="detail-wrapped"]')
        //     .as('detailWrapped')
        //     .should('be.visible')
        // });
      });
    });
  });

  describe('on interSection click', () => {

  });
});

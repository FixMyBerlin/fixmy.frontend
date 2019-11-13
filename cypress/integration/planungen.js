import config from '../../config';

describe('First Tests to get starting', () => {
  it('Visits the Planungen Section', () => {
    // baseUrl is configured in cypress.config.json
    cy.visit(config.routes.projects);
  });

  it(
    'Displays popup with a "mehr Infos" Button  ' +
      'after a marker has been clicked',
    () => {
      cy.visit(config.routes.projects);
      cy.wait(5000) // TODO: use stubs and fixtures rather than wait, see https://docs.cypress.io/guides/guides/network-requests.html#Fixtures
      cy.get('.marker-image')
        .first()
        .click({
          force: true // otherwise the click fails because the image "is being covered by another element..."
        });
      cy.get('button')
        .invoke('text')
        .should('contain', 'mehr Infos');
    }
  );
});

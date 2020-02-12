import config from '~/config';

/**
 * Open the projects map and wait for the projects API call to complete
 */
const goToProjects = () => {
  cy.server()
    .route('**/projects?page_size=200')
    .as('getProjects');
  cy.visit(config.routes.projects)
    .wait('@getProjects')
    .its('status')
    .should('be', 200); // configured in cypress.config.json
};

const clickRandomMarker = () => {
  cy.fmbClickRandomElement('.marker-image', false, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

export { goToProjects, clickRandomMarker };

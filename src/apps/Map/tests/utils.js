import config from '~/config';

/**
 * Open the projects map and wait for the projects API call to complete
 */
const goToProjects = () => {
  cy.server()
    .route('**/projects?page_size=500')
    .as('getProjects');
  cy.visit(config.routes.projects)
    .wait('@getProjects')
    .its('status')
    .should('eq', 200);
};

const clickRandomMarker = () => {
  cy.fmbClickRandomElement('.marker-image', false, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

export { goToProjects, clickRandomMarker };

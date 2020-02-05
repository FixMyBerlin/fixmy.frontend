import config from '~/pages/Reports/config';

/**
 * Open the projects map and wait for the projects API call to complete
 */
const goToReportsMap = () => {
  cy.server()
    .route('**/reports')
    .as('getReports');
  cy.visit(config.routes.reports.map)
    .wait('@getReports')
    .its('status')
    .should('be', 200); // configured in cypress.config.json
};

const clickRandomMarker = () => {
  cy.fmbClickRandomElement('reports-marker', true, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

export default { goToReportsMap, clickRandomMarker };

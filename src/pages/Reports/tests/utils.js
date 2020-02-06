import config from '~/pages/Reports/config';

/**
 * Open the reports map and wait for the reports API call to complete
 */
const goToReportsMap = () => {
  cy.server()
    .route('**/reports')
    .as('getReports');
  cy.visit(config.routes.reports.map)
    .wait('@getReports')
    .its('status')
    .should('be', 200);
};

/**
 * Click a random element that has the dom attr data-cy=reports-marker
 */
const clickRandomMarker = () => {
  cy.fmbClickRandomElement('reports-marker', true, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

export default { goToReportsMap, clickRandomMarker };

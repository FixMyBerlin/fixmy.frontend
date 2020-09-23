import { cyElem } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';
import utils from './utils';

// let singleReportId = null;

describe('The reports map', () => {
  before(() => {
    cy.server()
      .route('**/reports')
      .as('getReports');
    cy.visit(config.routes.reports.map)
      .wait('@getReports')
      .its('status')
      .should('eq', 200);
  });

  it('has a header with a title', () => {
    cyElem('reports-heading').should('be.visible');
  });

  it('has a locator button', () => {
    cyElem('map-map-control').should('be.visible');
  });

  it.skip('shows report markers and clusters', () => {
    cyElem('reports-marker-cluster').should('be.visible');
    cyElem('reports-marker').should('be.visible');
  });

  describe('when the marker is clicked, it', () => {
    it.skip('opens a popup', () => {
      cyElem('map-popup-wrapper').should('not.exist');
      utils.clickRandomMarker();
      cyElem('map-popup-wrapper').should('be.visible');
    });
    it.skip('centers the map on the marker'); // TODO: how to access Mapbox object?
  });

  // describe('the marker popup', () => {
  //   before(() => {
  //     cyElem('map-popup-wrapper').as('popup');
  //   });
  //   it('shows an address', () => {
  //     cyElem('map-popup-address').should('be.visible');
  //   });
  //   it('shows a count of requested items', () => {
  //     cyElem('reports-popup-title').should('be.visible');
  //     cyElem('reports-popup-title').contains(/\d{1,2}\s.+/);
  //   });
  //   it('has a button that opens the detail panel', () => {
  //     cyElem('reports-popup-button').should('be.visible');
  //     cyElem('reports-popup-button').click();
  //     cyElem('reports-detail-panel').should('be.visible');
  //     cy.url().then((url) => {
  //       singleReportId = url.split('/').slice(-1);
  //     });
  //   });
  // });

  describe('the details panel', () => {
    it.skip('has a header with address and report id', () => {
      cyElem('map-details-header-title').contains(/\S+/);
      cyElem('map-details-header-subtitle').contains(/Meldung\s\d{1,3}/);
    });
    it.skip('has a title, status and description', () => {
      cyElem('reports-detail-title').should('be.visible');
      cyElem('reports-detail-status').should('be.visible');
    });
    it.skip('shows a date of creation', () => {
      cyElem('reports-detail-datetime').contains(/\d{2}\.\d{2}\.\d{4}/);
    });
    it.skip('shows number of likes', () => {
      cyElem('map-detail-likes-count').contains(/\d{1,2}/);
    });
    it.skip('can be closed by clicking the close button', () => {
      cyElem('map-details-header-close-button').click();
      cyElem('reports-detail-panel').should('not.exist');
    });
  });
});

// describe('a report detail page', () => {
//   before(() => {
//     if (singleReportId == null) {
//       throw new Error(
//         'Report ID not defined: this test cannot be run in isolation'
//       );
//     }
//     cy.server()
//       .route(`**/reports/${singleReportId}`)
//       .as('getReportSingle');
//     cy.server()
//       .route(`**/reports/${singleReportId}/likes`)
//       .as('getReportLikes');

//     cy.visit(`${config.routes.reports.map}/${singleReportId}`)
//       .wait('@getReportSingle')
//       .its('status')
//       .should('be', 200);
//     cy.wait('@getReportLikes')
//       .its('status')
//       .should('be', 401);
//   });
//   it('shows the detail panel for this report', () => {
//     cyElem('reports-detail-panel').should('be.visible');
//     cyElem('map-details-header-subtitle').contains(`Meldung ${singleReportId}`);
//   });
//   it('moves the map so that the report marker is visible');
//   describe('when logged in', () => {
//     before(() => {
//       cy.fmbLogin();
//       cy.reload();
//     });
//     it('lets users like reports after they log in', () => {
//       cyElem('map-detail-likes-count').as('likesBefore');
//       cyElem('map-detail-likes-count').click();
//       cyElem('map-detail-likes-count').then((likesAfter) => {
//         cy.get('@likesBefore').should('not.eq', likesAfter);
//       });
//     });
//   });
// });

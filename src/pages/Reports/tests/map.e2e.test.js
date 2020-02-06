import { getByDataAttr } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';
import utils from './utils';

let singleReportId = null;

describe('The reports map', () => {
  before(() => {
    cy.server()
      .route('**/reports')
      .as('getReports');
    cy.visit(config.routes.reports.map)
      .wait('@getReports')
      .its('status')
      .should('be', 200);
  });

  it('has a header with a title', () => {
    getByDataAttr`reports-heading`.should('be.visible');
  });

  it('has a locator button', () => {
    getByDataAttr`map-map-control`.should('be.visible');
  });

  it('shows report markers and clusters', () => {
    getByDataAttr`reports-marker-cluster`.should('be.visible');
    getByDataAttr`reports-marker`.should('be.visible');
  });

  describe('when the marker is clicked, it', () => {
    it('opens a popup', () => {
      getByDataAttr`map-popup-wrapper`.should('not.exist');
      utils.clickRandomMarker();
      getByDataAttr`map-popup-wrapper`.should('be.visible');
    });
    it('centers the map on the marker'); // TODO: how to access Mapbox object?
  });

  describe('the marker popup', () => {
    before(() => {
      getByDataAttr`map-popup-wrapper`.as('popup');
    });
    it('shows an address', () => {
      getByDataAttr`map-popup-address`.should('be.visible');
    });
    it('shows a count of requested items', () => {
      getByDataAttr`reports-popup-title`.should('be.visible');
      getByDataAttr`reports-popup-title`.contains(/\d{1,2}\s.+/);
    });
    it('has a button that opens the detail panel', () => {
      getByDataAttr`reports-popup-button`.should('be.visible');
      getByDataAttr`reports-popup-button`.click();
      getByDataAttr`reports-detail-panel`.should('be.visible');
      cy.url().then((url) => {
        singleReportId = url.split('/').slice(-1);
      });
    });
  });

  describe('the details panel', () => {
    it('has a header with address and report id', () => {
      getByDataAttr`map-details-header-title`.contains(/.+\w\d{1,3}/);
      getByDataAttr`map-details-header-subtitle`.contains(/Meldung\s\d{1,3}/);
    });
    it('has a title, status and description', () => {
      getByDataAttr`reports-detail-title`.should('be.visible');
      getByDataAttr`reports-detail-status`.should('be.visible');
      getByDataAttr`reports-detail-description`.should('be.visible');
    });
    it('shows a date of creation', () => {
      getByDataAttr`reports-detail-datetime`.contains(/\d{2}\.\d{2}\.\d{4}/);
    });
    it('shows number of likes', () => {
      getByDataAttr`map-detail-likes-count`.contains(/\d{1,2}/);
    });
    it('can be closed by clicking the close button', () => {
      getByDataAttr`map-details-header-close-button`.click();
      getByDataAttr`reports-detail-panel`.should('not.exist');
    });
  });
});

describe('a report detail page', () => {
  before(() => {
    expect(singleReportId).to.not.equal(null);
    cy.server()
      .route(`**/reports/${singleReportId}`)
      .as('getReportSingle');
    cy.server()
      .route(`**/reports/${singleReportId}/likes`)
      .as('getReportLikes');

    cy.visit(`${config.routes.reports.map}/${singleReportId}`)
      .wait('@getReportSingle')
      .its('status')
      .should('be', 200);
    cy.wait('@getReportLikes')
      .its('status')
      .should('be', 401);
  });
  it('shows the detail panel for this report', () => {
    getByDataAttr`reports-detail-panel`.should('be.visible');
    getByDataAttr`map-details-header-subtitle`.contains(
      `Meldung ${singleReportId}`
    );
  });
  it('moves the map so that the report marker is visible');
  describe('when logged in', () => {
    before(() => {
      cy.fmbLogin();
      cy.reload();
    });
    it('lets users like reports after they log in', () => {
      getByDataAttr`map-detail-likes-count`.as('likesBefore');
      getByDataAttr`map-detail-likes-count`.click();
      getByDataAttr`map-detail-likes-count`.then((likesAfter) => {
        cy.get('@likesBefore').should('not.eq', likesAfter);
      });
    });
  });
});

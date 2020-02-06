import { getByDataAttr } from '~/../cypress/support/utils';
import utils from './utils';

describe('The reports map', () => {
  before(() => {
    utils.goToReportsMap();
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

  describe('when a marker is clicked', () => {
    before(() => {
      getByDataAttr`map-popup-wrapper`.should('not.exist');
      utils.clickRandomMarker();
    });
    it('opens a popup', () => {
      getByDataAttr`map-popup-wrapper`.should('be.visible');
    });
  });

  describe('the marker popup', () => {
    before(() => {
      getByDataAttr`map-popup-wrapper`.as('popup');
    });
    it('has an address', () => {
      getByDataAttr`map-popup-address`.should('be.visible');
    });
    it('shows a count of requested items', () => {
      getByDataAttr`reports-popup-title`.should('be.visible');
      getByDataAttr`reports-popup-title`.contains(/\d{1,2}\s.+/);
    });
    it('has a button to show more details', () => {
      getByDataAttr`reports-popup-button`.should('be.visible');
    });
  });

  describe('the details panel', () => {
    it('can be opened by clicking more', () => {
      getByDataAttr`reports-popup-button`.click();
      getByDataAttr`reports-detail-panel`.should('be.visible');
    });
    it('has a header with address and report id');
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
  });
});

import { getByDataAttr } from '~/../cypress/support/utils';
import utils from './utils';
import { createYield } from 'typescript';

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
      getByDataAttr`plannings-map-popup-wrapper`.should('not.exist');
      utils.clickRandomMarker();
    });
    it('opens a popup', () => {
      getByDataAttr`plannings-map-popup-wrapper`.should('be.visible');
    });
  });

  describe('the marker popup', () => {
    before(() => {
      getByDataAttr`plannings-map-popup-wrapper`.as('popup');
    });
    it('has a title', () => {
      getByDataAttr`reports-popup-title`.should('be.visible');
    });
    it('shows a count of requested items', () => {
      getByDataAttr`reports-popup-title`.then((a) => {
        debugger;
      });
      debugger;
      getByDataAttr`reports-popup-title`.text().should('match', /\d{1,2}\s.+/);
    });
    it('has a button to show more details', () => {
      getByDataAttr`reports-popup-button`.should('be.visible');
    });
  });

  describe('the details panel', () => {
    it('has a header with address and report id');
    it('has a title, status and description');
    it('shows number of likes');
  });
});

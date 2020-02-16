import { getByDataAttr } from '~/../cypress/support/utils';
import { clickRandomMarker, goToProjects } from './utils';

const adressRegex = new RegExp("[A-Za-z0-9'\\.\\-\\s\\,]");

describe('Planings Section', () => {
  describe('getting details for a planning marker', () => {
    describe('the popup', () => {
      // TODO: consider also testing map behaviour (shift of zoom/center)
      before(() => {
        goToProjects();
        clickRandomMarker();
      });

      it('is visible', () => {
        getByDataAttr`plannings-map-popup-wrapper`.should('be.visible');
      });

      it('contains an address heading', () => {
        getByDataAttr`section-title`
          .invoke('text')
          .should('match', adressRegex);
      });

      it('closes the popup on close button click', () => {
        getByDataAttr`plannings-map-popup-close-button`.click();
        getByDataAttr`plannings-map-popup-wrapper`.should('not.be.visible');
      });

      it('opens the the detail fold-out on "Mehr Infos" click', () => {
        clickRandomMarker(); // popup got closed in the step before, re-open it.
        getByDataAttr`plannings-more-info-btn`.click();
        getByDataAttr`plannings-detail-wrapped`.should('be.visible');
      });
    });
  });

  describe('the foldout', () => {});

  describe('getting details for an intersection', () => {});
});

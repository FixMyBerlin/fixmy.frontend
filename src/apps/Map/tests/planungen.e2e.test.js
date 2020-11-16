import { cyElem } from 'cypress/support/utils';
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
        cyElem('map-popup-wrapper').should('be.visible');
      });

      it('contains an address heading', () => {
        cyElem('section-title')
          .invoke('text')
          .should('match', adressRegex);
      });

      it('closes the popup on close button click', () => {
        cyElem('map-popup-close-button').click();
        cyElem('map-popup-wrapper').should('not.be.visible');
      });

      it('opens the the detail fold-out on "Mehr Infos" click', () => {
        clickRandomMarker(); // popup got closed in the step before, re-open it.
        cyElem('plannings-more-info-btn').click();
        cyElem('map-details-wrapper').should('be.visible');
      });
    });
  });

  describe('the foldout', () => {});

  describe('getting details for an intersection', () => {});
});

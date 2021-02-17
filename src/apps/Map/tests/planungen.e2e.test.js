import { cyElem } from 'cypress/support/utils';
import { generatePath } from 'react-router-dom';

import { clickRandomMarker, goToProjects } from './utils';
import config from '~/config';

const adressRegex = new RegExp("[A-Za-z0-9'\\.\\-\\s\\,]");

// This should be a valid project id
const SAMPLE_PROJECT_ID = 130;

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
        cyElem('section-title').invoke('text').should('match', adressRegex);
      });

      it('closes the popup on close button click', () => {
        cyElem('map-popup-close-button').click({ force: true });
        cy.get('[data-cy=map-popup-wrapper]').should('not.exist');
      });

      it('opens the the detail fold-out on "Mehr Infos" click', () => {
        clickRandomMarker(); // popup got closed in the step before, re-open it.
        cyElem('plannings-more-info-btn').click();
        cyElem('map-details-wrapper').should('be.visible');
      });
    });
  });

  describe('the project detail page', () => {
    before(() => {
      const projectUrl = generatePath(config.routes.map.projectsDetail, {
        id: SAMPLE_PROJECT_ID,
      });
      cy.server().route(`**/projects/${SAMPLE_PROJECT_ID}`).as('getProject');
      cy.visit(projectUrl).wait('@getProject').its('status').should('eq', 200);
    });
    it('displays project detail foldout', () => {
      cy.get('h2').contains('Fertigstellung');
    });
    it('redirects to overview map when closing details panel', () => {
      cyElem('map-details-header-close-button').click();
      cy.location('pathname').should('eq', config.routes.map.projectsIndex);
    });
  });

  describe('getting details for an intersection', () => {});
});

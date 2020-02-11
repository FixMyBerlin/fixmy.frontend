import { cyElem } from '~/../cypress/support/utils';
import config from '~/pages/Reports/config';

/**
 * Click a random element that has the dom attr data-cy=reports-marker
 */
const clickRandomMarker = () => {
  cy.fmbClickRandomElement('reports-marker', true, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

const goToConfirmedAddress = (address) => {
  cy.visit(`${config.routes.reports.new}/1`);
  cyElem('reports-locatemode-enterPosition').click();
  cyElem('map-address-input').type(address);
  cyElem('map-address-suggestion')
    .first()
    .click();
};

const goToBikeStandForm = (address) => {
  goToConfirmedAddress(address);
  cyElem('reports-form-confirm-location-button').click();
  cyElem('reports-locateme-confirm-continue').click();
};

const goToAdditionalDataForm = (address) => {
  goToBikeStandForm(address);
  cyElem('reports-bikestands-continue').click();
};

const goToParkingGarageForm = (address) => {
  goToAdditionalDataForm(address);
  cyElem('reports-additional-comment').type('Test-Kommentärchen');
  cyElem('reports-additional-continue').click();
};

export default {
  clickRandomMarker,
  goToConfirmedAddress,
  goToBikeStandForm,
  goToAdditionalDataForm,
  goToParkingGarageForm
};

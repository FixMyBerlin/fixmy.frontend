import { getByDataAttr } from '~/../cypress/support/utils';
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
  getByDataAttr`reports-locatemode-enterPosition`.click();
  getByDataAttr`map-address-input`.type(address);
  getByDataAttr`map-address-suggestion`.first().click();
};

const goToBikeStandForm = (address) => {
  goToConfirmedAddress(address);
  getByDataAttr`reports-form-confirm-location-button`.click();
  getByDataAttr`reports-locateme-confirm-continue`.click();
};

const goToAdditionalDataForm = (address) => {
  goToBikeStandForm(address);
  getByDataAttr`reports-bikestands-continue`.click();
};

const goToParkingGarageForm = (address) => {
  goToAdditionalDataForm(address);
  getByDataAttr`reports-additional-comment`.type('Test-Kommentärchen');
  getByDataAttr`reports-additional-continue`.click();
};

export default {
  clickRandomMarker,
  goToConfirmedAddress,
  goToBikeStandForm,
  goToAdditionalDataForm,
  goToParkingGarageForm
};

import config from '~/pages/Reports/config';

import foundAddress from './fixtures/foundAddress.json';
import bikeStands from './fixtures/bikeStands.json';
import additionalDataForm from './fixtures/additionalDataForm.json';
import bikeLockerForm from './fixtures/bikeLockerForm.json';

/**
 * Click a random element that has the dom attr data-cy=reports-marker
 */
const clickRandomMarker = () => {
  cy.fmbClickRandomElement('reports-marker', true, {
    force: true // otherwise the click fails because the image "is being covered by another element..."
  });
};

const goToConfirmedAddress = () => {
  const url = `${config.routes.reports.new}/1`;
  cy.visitWithState(url, foundAddress);
};

const goToBikeStandForm = () => {
  const url = `${config.routes.reports.new}/2`;
  cy.visitWithState(url, bikeStands);
};

const goToAdditionalDataForm = () => {
  const url = `${config.routes.reports.new}/3`;
  cy.visitWithState(url, additionalDataForm);
};

const goToParkingGarageForm = () => {
  const url = `${config.routes.reports.new}/4`;
  cy.visitWithState(url, bikeLockerForm);
};

export default {
  clickRandomMarker,
  goToConfirmedAddress,
  goToBikeStandForm,
  goToAdditionalDataForm,
  goToParkingGarageForm
};

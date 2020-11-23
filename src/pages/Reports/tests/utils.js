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
    force: true, // otherwise the click fails because the image "is being covered by another element..."
  });
};

const visitWithReportsState = (url, state) =>
  cy.visitWithState(url, { ReportsState: state });

const goToConfirmedAddress = () => {
  const url = `${config.routes.reports.new}/1`;
  visitWithReportsState(url, foundAddress);
};

const goToBikeStandForm = () => {
  const url = `${config.routes.reports.new}/2`;
  visitWithReportsState(url, bikeStands);
};

const goToAdditionalDataForm = () => {
  const url = `${config.routes.reports.new}/3`;
  visitWithReportsState(url, additionalDataForm);
};

const goToParkingGarageForm = () => {
  const url = `${config.routes.reports.new}/4`;
  visitWithReportsState(url, bikeLockerForm);
};

export default {
  clickRandomMarker,
  goToConfirmedAddress,
  goToBikeStandForm,
  goToAdditionalDataForm,
  goToParkingGarageForm,
};

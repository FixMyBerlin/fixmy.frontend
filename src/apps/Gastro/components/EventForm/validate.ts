import { isAfter, isBefore, setHours } from 'date-fns';
import debug from 'debug';

import { EventApplication, PermitApplication } from '../../types';

const logger = debug('fmc:Gastro:Registration');

type ValidateErrors = Partial<EventApplication>;

const validate = (values: any) => {
  const errors: ValidateErrors = {};

  if (!values.first_name) {
    errors.first_name = 'Bitte einen Vornamen angeben';
  }

  if (!values.last_name) {
    errors.last_name = 'Bitte einen Nachnamen angeben';
  }

  if (!values.phone) {
    errors.phone = 'Bitte eine Telefonnummer angeben';
  }

  if (!values.address) {
    errors.address = 'Bitte eine Adresse angeben';
  }

  if (!values.date) {
    errors.date = 'Bitte ein Datum angeben';
  }

  if (!values.setup_start) {
    errors.setup_start =
      'Bitte eine Uhrzeit für den Beginn der Aufbauarbeiten angeben';
  }

  const earliestStart = setHours(values.event_start, 6);
  if (!values.event_start) {
    errors.event_start =
      'Bitte eine Uhrzeit für den Beginn der Veranstaltung angeben';
  } else if (isBefore(values.event_start, earliestStart)) {
    errors.event_start =
      'Bitte wählen Sie hier einen Beginn für die Veranstaltung ab frühestens 6 Uhr';
  }

  const latestEnd = setHours(values.event_end, 22);
  if (!values.event_end) {
    errors.event_end =
      'Bitte eine Uhrzeit für das Ende der Veranstaltung angeben';
  } else if (isAfter(values.event_end, latestEnd)) {
    errors.event_end =
      'Bitte wählen Sie hier ein Ende für die Veranstaltung bis spätestens 22 Uhr';
  }

  if (!values.teardown_end) {
    errors.teardown_end =
      'Bitte eine Uhrzeit für das Ende der Abbauarbeiten angeben';
  }

  logger('Validation', errors, values);
  return errors;
};

export { validate };

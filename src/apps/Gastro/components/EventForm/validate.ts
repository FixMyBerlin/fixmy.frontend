import { isAfter, isBefore, setHours, setMinutes } from 'date-fns';
import debug from 'debug';

import type { EventApplication } from '../../types';

const logger = debug('fmc:Gastro:Registration');

type ValidateErrors = Partial<Record<keyof EventApplication, string>>;

const validate = (values: any) => {
  const errors: ValidateErrors = {};

  // SectionBase

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

  // SectionTime

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
  } else if (
    values.setup_start &&
    isBefore(values.event_start, values.setup_start)
  ) {
    errors.event_start = 'Bitte wählen Sie eine Zeit nach Beginn des Aufbaus';
  }

  const latestEnd = setMinutes(setHours(values.event_end, 22), 0);
  if (!values.event_end) {
    errors.event_end =
      'Bitte eine Uhrzeit für das Ende der Veranstaltung angeben';
  } else if (isAfter(values.event_end, latestEnd)) {
    errors.event_end =
      'Bitte wählen Sie hier ein Ende für die Veranstaltung bis spätestens 22 Uhr';
  } else if (
    values.event_start &&
    isBefore(values.event_end, values.event_start)
  ) {
    errors.event_end =
      'Bitte wählen Sie eine Zeit nach Beginn der Veranstaltung';
  }

  if (!values.teardown_end) {
    errors.teardown_end =
      'Bitte eine Uhrzeit für das Ende der Abbauarbeiten angeben';
  } else if (
    values.event_end &&
    isBefore(values.teardown_end, values.event_end)
  ) {
    errors.teardown_end =
      'Bitte wählen Sie eine Zeit nach Ende der Veranstaltung';
  }

  // SectionParticipants

  if (!values.num_participants) {
    errors.num_participants =
      'Bitte geben Sie die maximale Anzahl Teilnehmender an';
  }

  // SectionArea

  if (!values.area_category) {
    errors.area_category =
      'Bitte wählen Sie aus, wo ihre Veranstaltung stattfinden soll';
  }

  if (!values.area) {
    errors.area = 'Bitte zeichnen Sie eine Fläche ein';
  }

  // SectionDescription

  if (!values.title) {
    errors.title = 'Bitte geben Sie der Veranstaltung einen Titel';
  } else if (values.title.length > 80) {
    errors.title = 'Bitte kürzen Sie den Titel auf höchstens 80 Zeichen';
  }

  if (!values.description) {
    errors.description =
      'Bitte formulieren Sie eine Ankündigung für die Veranstaltung';
  } else if (values.description.length > 200) {
    errors.description =
      'Bitte kürzen Sie die Ankündigung auf höchstens 200 Zeichen';
  }

  if (!values.details) {
    errors.details = 'Bitte formulieren Sie ein Veranstaltungskonzept';
  } else if (values.details.length > 2000) {
    errors.details =
      'Bitte kürzen Sie das Veranstaltungskonzept auf höchstens 2000 Zeichen';
  }

  if (!values.insuranceS3) {
    errors.insurance = 'Bitte laden Sie die Versicherungsbestätigung hoch';
  }

  if (!values.agreementS3) {
    errors.agreement = 'Bitte laden Sie die Veranstaltererklärung hoch';
  }

  if (!values.agreementS3) {
    errors.agreement = 'Bitte laden Sie die Veranstaltererklärung hoch';
  }

  if (!values.agreement_accepted) {
    errors.agreement_accepted =
      'Bitte stimmen Sie diesen Bedingungen zu, damit Sie die Sondernutzungsfläche nutzen können.';
  }

  if (!values.tos_accepted) {
    errors.tos_accepted =
      'Bitte stimmen Sie diesen Bedingungen zu, damit wir Ihre Anmeldung entgegennehmen können.';
  }

  if (!values.email) {
    errors.email = 'Bitte eine E-Mail-Adresse angeben';
  } else if (values.email.indexOf('@') < 0) {
    errors.email = 'Das sieht nicht wie eine E-Mail-Adresse aus';
  }

  logger('Validation', errors, values);
  return errors;
};

export { validate };

/* eslint-disable camelcase */

import { FormData } from '.';

const validate = (values: FormData) => {
  const errors: {
    name?: string;
    email?: string;
    address?: string;
    time_requested?: string;
    accepts_agreement?: string;
    tos_accepted?: string;
  } = {};

  if (!values.name) {
    errors.name = 'Bitte einen Namen angeben';
  }

  if (!values.address) {
    errors.address = 'Bitte geben Sie eine Adresse an';
  }

  if (!values.email) {
    errors.email = 'Bitte eine E-Mail-Adresse angeben';
  } else if (values.email.indexOf('@') < 0) {
    errors.email = 'Das sieht nicht wie eine E-Mail-Adresse aus';
  }

  if (values.time_requested === '') {
    errors.time_requested = 'Bitte wählen sie einen Zeitbereich aus';
  }

  if (values.accepts_agreement === '') {
    errors.accepts_agreement =
      'Bitte geben Sie an, ob sie bereit wären, eine Kooperationsvereinbarung für eine Gastrostraße zu unterzeichnen.';
  }

  if (!values.tos_accepted) {
    errors.tos_accepted =
      'Bitte stimmen Sie diesen Bedingungen zu, damit wir Ihre Anmeldung entgegennehmen können.';
  }

  return errors;
};

export default validate;

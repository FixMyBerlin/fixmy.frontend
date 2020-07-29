/* eslint-disable camelcase */

import { SignupData } from '../../types';

const validate = (values: SignupData) => {
  const errors: {
    first_name?: string;
    last_name?: string;
    email?: string;
    tos_accepted?: string;
    message?: string;
    captain?: string;
  } = {};

  if (!values.first_name) {
    errors.first_name = 'Bitte einen Vornamen angeben';
  }

  if (!values.last_name) {
    errors.last_name = 'Bitte einen Nachnamen angeben';
  }

  if (!values.email) {
    errors.email = 'Bitte eine E-Mail-Adresse angeben';
  } else if (values.email.indexOf('@') < 0) {
    errors.email = 'Das sieht nicht wie eine E-Mail-Adresse aus';
  }

  if (!values.tos_accepted) {
    errors.tos_accepted =
      'Bitte stimmen Sie dieser Vereinbarung zu, damit wir Ihre Anmeldung entgegennehmen können.';
  }

  if (values.message.length > 1000) {
    errors.message =
      'Das ist eine sehr lange Nachricht. Bitte kürzen Sie etwas.';
  }

  if (values.captain === null) {
    errors.captain =
      'Bitte geben Sie an, ob sie bereit wären, Teamkapitän:in zu werden.';
  }

  return errors;
};

export default validate;

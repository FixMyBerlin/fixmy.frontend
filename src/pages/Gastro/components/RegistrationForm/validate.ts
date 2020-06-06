/* eslint-disable camelcase */

import { FormData } from '.';
import logger from '~/utils/logger';
import parseLength from '../../parseLength';

const validate = (regulation) => {
  return (values: FormData) => {
    const errors: {
      first_name?: string;
      last_name?: string;
      phone?: string;
      category?: string;
      email?: string;
      shopfront_length?: string;
      usage?: string;
      certificate?: any;
      agreement_accepted?: string;
      tos_accepted?: string;
      area?: string;
    } = {};

    if (!values.first_name) {
      errors.first_name = 'Bitte einen Vornamen angeben';
    }

    if (!values.last_name) {
      errors.last_name = 'Bitte einen Nachnamen angeben';
    }

    if (!values.phone) {
      errors.phone = 'Bitte eine Telefonnummer angeben';
    }

    try {
      const val = parseLength(values.shopfront_length);
      if (val < 0 || val > 5000)
        errors.shopfront_length =
          'Bitte geben Sie die Länge der Ladenfront in Metern an';
    } catch (e) {
      errors.shopfront_length =
        'Bitte geben Sie die Länge der Ladenfront in Metern an';
    }

    if (regulation?.zone === 'Parkplatz') {
      if (!values.area) {
        errors.area =
          'Bitte zeichnen Sie die gewünschte Sondernutzungsfläche ein';
      }
    }

    if (!values.usage) {
      errors.usage = 'Bitte einen Nutzungszweck angeben';
    }

    if (!values.certificate) {
      errors.certificate = 'Bitte einen Nachweis einfügen';
    }

    if (!values.email) {
      errors.email = 'Bitte eine E-Mail-Adresse angeben';
    } else if (values.email.indexOf('@') < 0) {
      errors.email = 'Das sieht nicht wie eine E-Mail-Adresse aus';
    }

    if (!values.agreement_accepted) {
      errors.agreement_accepted =
        'Bitte stimmen Sie diesen Bedingungen zu, damit Sie die Sondernutzungsfläche nutzen können.';
    }

    if (!values.tos_accepted) {
      errors.tos_accepted =
        'Bitte stimmen Sie diesen Bedingungen zu, damit wir Ihre Anmeldung entgegennehmen können.';
    }
    logger('Validation', errors, values);
    return errors;
  };
};

export default validate;

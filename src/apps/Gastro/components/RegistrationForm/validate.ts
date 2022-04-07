/* eslint-disable camelcase */

import debug from 'debug';

import parseLength from '../../parseLength';
import regulations from '../../regulations';
import { requiresArea } from '../../utils';

import { FormData } from '.';

const logger = debug('fmc:Gastro:Registration');

interface ValidateErrors {
  first_name?: string;
  last_name?: string;
  phone?: string;
  category?: string;
  email?: string;
  shopfront_length?: string;
  usage?: string;
  certificateS3?: any;
  agreement_accepted?: string;
  tos_accepted?: string;
  area?: string;
}

interface ValidateDirectErrors extends ValidateErrors {
  shop_name?: string;
  address?: string;
}

const validate = (regulation) => {
  return (values: FormData) => {
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

    try {
      const val = parseLength(values.shopfront_length);
      if (Number.isNaN(val) || val < 0 || val > 5000)
        errors.shopfront_length =
          'Bitte geben Sie die Länge der Ladenfront in Metern an';
    } catch (e) {
      errors.shopfront_length =
        'Bitte geben Sie die Länge der Ladenfront in Metern an';
    }

    if (requiresArea(regulation?.zone)) {
      if (!values.area) {
        errors.area =
          'Bitte zeichnen Sie die gewünschte Sondernutzungsfläche ein';
      }
    }

    if (!values.usage) {
      errors.usage = 'Bitte einen Nutzungszweck angeben';
    }

    if (!values.certificate) {
      errors.certificateS3 = 'Bitte einen Nachweis einfügen';
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

const validateDirect = (values: FormData) => {
  const errors: ValidateDirectErrors = validate(regulations[0])(values);

  if (!values.shop_name) {
    errors.shop_name = 'Bitte einen Namen angeben';
  }

  if (values.category === '') {
    errors.category = 'Bitte hier eine Option auswählen:';
  }

  if (values.address === '') {
    errors.address = 'Bitte eine Adresse (mit Hausnummer) angeben';
  }

  if (!values.certificateS3) {
    errors.certificateS3 = 'Bitte einen Nachweis hochladen';
  } else {
    delete errors.certificateS3;
  }

  logger('Validation Direct', errors, values);
  return errors;
};

export { validate, validateDirect };

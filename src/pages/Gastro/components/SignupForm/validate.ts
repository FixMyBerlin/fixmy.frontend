/* eslint-disable camelcase */

import { FormData } from '.';
import logger from '~/utils/logger';

const validate = (values: FormData) => {
  const errors: {
    shop_name?: string;
    first_name?: string;
    last_name?: string;
    category?: string;
    email?: string;
    address?: string;
    opening_hours?: string;
    shopfront_length?: string;
    tos_accepted?: string;
  } = {};

  if (!values.shop_name) {
    errors.shop_name = 'Bitte einen Namen angeben';
  }

  if (!values.first_name) {
    errors.first_name = 'Bitte einen Vornamen angeben';
  }

  if (!values.last_name) {
    errors.last_name = 'Bitte einen Nachnamen angeben';
  }

  if (!values.address) {
    errors.address = 'Bitte eine Adresse angeben';
  }

  try {
    const val = Math.round(100 * (values.shopfront_length as number));
    if (val < 100 || val > 5000)
      errors.shopfront_length =
        'Bitte geben Sie die Länge der Ladenfront in Metern an';
  } catch (e) {
    errors.shopfront_length =
      'Bitte geben Sie die Länge der Ladenfront in Metern an';
  }

  if (!values.email) {
    errors.email = 'Bitte eine E-Mail-Adresse angeben';
  } else if (values.email.indexOf('@') < 0) {
    errors.email = 'Das sieht nicht wie eine E-Mail-Adresse aus';
  }

  if (values.opening_hours === '') {
    errors.opening_hours = 'Bitte wählen sie einen Zeitbereich aus';
  }

  if (!values.tos_accepted) {
    errors.tos_accepted =
      'Bitte stimmen Sie diesen Bedingungen zu, damit wir Ihre Interessensbekundung entgegennehmen können.';
  }
  logger(errors);
  return errors;
};

export default validate;

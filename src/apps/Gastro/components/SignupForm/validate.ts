/* eslint-disable camelcase */

import debug from 'debug';

import parseLength from '../../parseLength';

import { FormData } from '.';

const logger = debug('fmc:Gastro:Signup');

const validate = (values: FormData) => {
  const errors: {
    shop_name?: string;
    first_name?: string;
    last_name?: string;
    category?: string;
    email?: string;
    address?: string;
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
    const val = parseLength(values.shopfront_length);
    if (val < 0 || val > 5000)
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

  if (!values.tos_accepted) {
    errors.tos_accepted =
      'Bitte stimmen Sie diesen Bedingungen zu, damit wir Ihre Interessensbekundung entgegennehmen können.';
  }
  logger('Validation', errors, values);
  return errors;
};

export default validate;

/* eslint-disable camelcase */

import debug from 'debug';

import { EventApplication } from '../../types';

const logger = debug('fmc:Gastro:Registration');

type ValidateErrors = Partial<EventApplication>;

const validate = (values: EventApplication) => {
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

  logger('Validation', errors, values);
  return errors;
};

export { validate };

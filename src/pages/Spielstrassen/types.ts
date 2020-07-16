// Django Serializers don't use camel case
/* eslint-disable camelcase */

import { AppConfig } from '~/types';

export interface SpielstrassenConfig extends AppConfig {}
export interface SignupData {
  campaign: string;
  first_name: string;
  last_name: string;
  email: string;
  tos_accepted: boolean;
  captain: boolean;
  message: string;
  street: string;
}

export interface Spielstrasse {
  street: string;
  kiez: string;
  region: string;
  supporters?: number;
}

export interface Counts {
  [street: string]: number;
}

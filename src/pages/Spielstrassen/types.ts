// Django Serializers don't use camel case
/* eslint-disable camelcase */
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
  supporters?: number;
}

export interface Counts {
  [street: string]: number;
}

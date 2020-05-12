// API requests don't use CamelCase
/* eslint-disable camelcase */

export interface GastroSignup {
  campaign: string;
  name: string;
  email: string;
  address: string;
  geometry: number[];
  seats_requested: number;
  time_requested: string;
  accepts_agreement: boolean;
  tos_accepted: boolean;
}

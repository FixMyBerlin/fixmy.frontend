// API requests don't use CamelCase
/* eslint-disable camelcase */

export interface GastroSignup {
  campaign: string;
  shop_name: string;
  first_name: string;
  last_name: string;
  category: string;
  email: string;
  address: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  shopfront_length: number;
  opening_hours: string;
  tos_accepted: boolean;
}

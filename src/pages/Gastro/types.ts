// API requests don't use CamelCase
/* eslint-disable camelcase */

type Coordinate = [number, number];

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
    coordinates: Coordinate;
  };
  shopfront_length: number;
  opening_hours: string;
  tos_accepted: boolean;
  regulation?: number;
}

export interface GastroRegistration extends GastroSignup {
  id: number;
  access_key: string;
  phone: string;
  usage: string;
  area?: {
    type: 'Polygon';
    coordinates: Coordinate[];
  };
  agreement_accepted: boolean;
}

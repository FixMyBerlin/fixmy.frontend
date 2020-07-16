// API requests don't use CamelCase
/* eslint-disable camelcase */

import { AppConfig } from '~/types';

type Coordinate = [number, number];

export interface GastroConfig extends AppConfig {
  directSignup: boolean;
  timeline?: {
    openSignup: Date;
    closeSignup: Date;
  };
  model: {
    category: boolean;
    opening_hours: boolean;
  };
  signup: {
    mapboxStyle: string;
    intro?: string;
    shopfrontLabel?: string;
    thanksMessage?: string;
  };
  registration?: {
    mapboxStyle: string;
  };
}

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
  certificate?: any;
  agreement_accepted: boolean;
}

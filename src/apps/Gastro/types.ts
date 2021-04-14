// API requests don't use CamelCase
/* eslint-disable camelcase */

import { AppConfig } from '~/types';

type Coordinate = [number, number];

export type GastroStatus =
  | 'new'
  | 'verification'
  | 'waiting_for_application'
  | 'application_received'
  | 'application_verification'
  | 'application_accepted'
  | 'application_rejected';

export interface GastroConfig extends AppConfig {
  currentCampaign: string;
  directSignup: boolean;
  timeline?: {
    openSignup: Date;
    closeSignup: Date;
  };
  model: {
    category: boolean;
    opening_hours: boolean;
  };
  landing: {
    mapboxStyle: string;
    mapboxLayers?: string[];
  };
  signup: {
    mapboxStyle: string;
    intro?: string;
    shopfrontLabel?: string;
    thanksMessage?: string;
  };
  registration?: {
    mapboxStyle: string;
    mapboxLayers?: string[];
  };
  events?: {
    mapboxStyle: string;
    mapboxLayers: string[];
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
  followup_accepted: boolean;
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
  permit_start: string;
  permit_end: string;
  status: GastroStatus;
  renewal_application: number | null;
}

export type PermitStatus =
  | 'interested'
  | 'preapproval'
  | 'waiting_for_application'
  | 'application_received'
  | 'application_verification'
  | 'application_accepted'
  | 'application_rejected';

export type PermitApplication = {
  status: PermitStatus;
  email: string;
  tos_accepted: boolean;
  agreement_accepted: boolean;
  followup_accepted: boolean;
};

export type EventPermitCategory =
  | 'resturant'
  | 'retail'
  | 'workshop'
  | 'social'
  | 'other';
export type NUM_PARTICIPANTS_S = 0;
export type NUM_PARTICIPANTS_M = 1;
export type NUM_PARTICIPANTS_L = 2;
export type EVENT_AREA_CATEGORY = 'park' | 'parking';

export type EventApplication = PermitApplication & {
  campaign: 'xhain2021';
  category: EventPermitCategory;
  org_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  date: string;
  setup_start: string;
  event_start: string;
  event_end: string;
  teardown_end: string;
  num_participants:
    | NUM_PARTICIPANTS_S
    | NUM_PARTICIPANTS_M
    | NUM_PARTICIPANTS_L;
  area_category: EVENT_AREA_CATEGORY;
  area: {
    type: 'Polygon';
    coordinates: Coordinate[];
  };
  setup_sketch?: any;
  title: string;
  description: string;
  details: string;
  insurance?: any;
  agreement?: any;
  public_benefit?: any;
};

// API requests don't use CamelCase
/* eslint-disable camelcase */

import { AppConfig } from '~/types';

import {
  NUM_PARTICIPANTS_L,
  NUM_PARTICIPANTS_M,
  NUM_PARTICIPANTS_S,
} from './constants';

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
    permitEnd: Date;
  };
  model: {
    category: boolean;
    opening_hours: boolean;
  };
  layerSets: {
    [name: string]: string[];
  };
  maps: {
    [mapName: string]: {
      mapboxStyle: string;
      layerSets: string[];
    };
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
  invoice_number: number;
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

// eslint disabled: no redeclaration because these are types

// eslint-disable-next-line no-redeclare
export type NUM_PARTICIPANTS_S = typeof NUM_PARTICIPANTS_S;
// eslint-disable-next-line no-redeclare
export type NUM_PARTICIPANTS_M = typeof NUM_PARTICIPANTS_M;
// eslint-disable-next-line no-redeclare
export type NUM_PARTICIPANTS_L = typeof NUM_PARTICIPANTS_L;
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

export type EventPermit = EventApplication & {
  status: string;
  application_received: string;
  application_decided: string;
  permit_start: string;
  permit_end: string;
  note: string;
  area_park_name: string;
  setup_sketch?: string;
  insurance?: string;
  agreement?: string;
  public_benefit?: string;
  // True if a public benefit file attachment is set on the permit
  is_public_benefit?: boolean;
  area_park_name_long?: string;
  event_address?: string;
};

export type EventListing = Pick<
  EventPermit,
  | 'title'
  | 'description'
  | 'event_start'
  | 'event_end'
  | 'date'
  | 'area'
  | 'area_category'
> & { id: string; location: string };

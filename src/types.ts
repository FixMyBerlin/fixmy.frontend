import MapboxGL from 'mapbox-gl';

import { SpielstrassenConfig } from '~/apps/Spielstrassen/types';
import { GastroConfig } from '~/apps/Gastro/types';

export type LocaleCode = 'de' | 'en' | 'es';

//
// Config
//
export type Region = 'berlin' | 'aachen' | 'eichwalde';

export interface AppConfig {
  path: string;
}

export interface DefaultConfig {
  baseFont: string;
  colors: {
    [color: string]: string;
  };
  map: any;
  menu: any;
  apiUrl: string;
  piwik: PiwikService;
  mapbox: MapboxService;
  newsletter: NewsletterService;
  logger: string;
  debug: boolean;
  routes: any;
  staticpages: any;
  titleFont: string;
}

export interface RegionConfig extends Partial<DefaultConfig> {
  apps?: {
    hbi?: {};
    map?: {};
  };
  districts?: {
    [district: string]: DistrictConfig;
  };
  siteTitle: string;
}

export interface RootConfig extends RegionConfig {
  region: Region;
}

export interface DistrictConfig {
  title: string;
  path: string;
  name: string;
  content: {
    [key: string]: any;
  };
  emblem: {
    small: string;
    large: string;
  };
  bounds: MapboxGL.LngLatBoundsLike;
  apps: {
    spielstrassen?: SpielstrassenConfig;
    gastro?: GastroConfig;
  };
  backend?: BackendService;
}

export interface BackendService {
  local: string;
  staging: string;
  production: string;
}

export interface NewsletterService {
  embedUrl: string;
}

export interface MapboxService {
  accessToken: string;
  reverseGeocoderUrl: string;
}

export interface PiwikService {
  url: string;
  siteId: number;
  options: object;
}

import MapboxGL from 'mapbox-gl';

import { GastroConfig } from '~/apps/Gastro/types';
import { SpielstrassenConfig } from '~/apps/Spielstrassen/types';

import { MapConfig } from './apps/Map/types';
import { ColorScheme } from './config/default/colors';

export type LocaleCode = 'de' | 'en' | 'es';

//
// Config
//
export type Region = 'berlin' | 'aachen';

export interface AppConfig {
  path: string;
}

export interface DefaultConfig {
  apps: {
    hbi?: {};
    map?: MapConfig;
  };
  baseFont: string;
  colors: ColorScheme;
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
  intl: I18NConfig;
  sentryDsn?: string;
}

export interface RegionConfig extends Partial<DefaultConfig> {
  apps?: DefaultConfig['apps'];
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

export interface I18NConfig {
  logMissingTranslations: boolean;
}

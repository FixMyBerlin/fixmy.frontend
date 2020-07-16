import MapboxGL from 'mapbox-gl';

import { SpielstrassenConfig } from '~/pages/Spielstrassen/types';
import { GastroConfig } from '~/apps/Gastro/types';

export interface AppConfig {
  path: string;
}

export interface BackendConfig {
  local: string;
  staging: string;
  production: string;
}

export interface DistrictConfig {
  title: string;
  path: string;
  name: string;
  backend?: BackendConfig;
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
}

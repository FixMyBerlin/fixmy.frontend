import debug from 'debug';
import { DefaultConfig } from '~/types';

const log = debug('fmc:config');

const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyberlin-staging.netlify.app/api/next',
  production: 'https://fixmyberlin.de/api/v1',
};

// Default config without all fields thar are defined through sibling modules
const baseConfig: Omit<
  DefaultConfig,
  'apps' | 'map' | 'colors' | 'menu' | 'routes' | 'staticpages'
> = {
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.BACKEND] ||
    apiEndpoints.staging,
  titleFont: 'Roboto Slab',
  baseFont: 'Open Sans',
  logger: 'fmc*', // selects logging namespaces to display when not in production
  debug: process.env.NODE_ENV !== 'production',
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
  },
  newsletter: {
    embedUrl: 'https://app.mailjet.com/widget/iframe/2YIa/EGM',
  },
  piwik: {
    url: 's.fixmycity.de',
    siteId: 1,
    options: {
      enableLinkTracking: true,
      trackErrors: true,
      disableCookies: true,
    },
  },
  intl: {
    logMissingTranslations: true,
  },
};

if (!process.env.BACKEND && process.env.API_URL == null) {
  // need to use console here to avoid circular import when
  // logging helper imports this file
  // eslint-disable-next-line no-console
  log('No BACKEND env var defined. Using staging backend by default.');
}

export default baseConfig;

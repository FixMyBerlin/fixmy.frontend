import { DefaultConfig } from '~/types';

const apiEndpoints = {
  local: 'http://localhost:8000/api',
  staging: 'https://fixmyberlin-staging.netlify.app/api/next',
  production: 'https://fixmyberlin.de/api/v1'
};

const baseConfig: Omit<
  DefaultConfig,
  'map' | 'colors' | 'menu' | 'routes' | 'staticpages'
> = {
  apiUrl:
    process.env.API_URL ||
    apiEndpoints[process.env.BACKEND] ||
    apiEndpoints.production,
  titleFont: 'Roboto Slab',
  baseFont: 'Open Sans',
  logger: 'fmc*', // selects logging namespaces to display when not in production
  debug: process.env.NODE_ENV !== 'production',
  mapbox: {
    accessToken:
      'pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json'
  },
  newsletter: {
    embedUrl: 'https://app.mailjet.com/widget/iframe/2YIa/EGM'
  },
  piwik: {
    url: 's.fixmycity.de',
    siteId: {
      berlin: 1,
      aachen: 4
    },
    options: {
      enableLinkTracking: true,
      trackErrors: true,
      disableCookies: true
    }
  }
};

if (!process.env.BACKEND && process.env.API_URL == null) {
  // need to use console here to avoid circular import when
  // logging helper imports this file
  // eslint-disable-next-line no-console
  console.warn(
    'No BACKEND env var defined. Using production backend by default.'
  );
}

export default baseConfig;

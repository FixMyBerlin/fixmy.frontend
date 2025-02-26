import debug from 'debug';

import { RootConfig, Region } from '~/types';

import aachen from './aachen';
import berlin from './berlin';
import defaultConfig from './default';

const log = debug('fmc:config');

let region = (process.env.REGION as Region) || 'berlin';

if (window.Cypress) {
  region = window.Cypress.env('REGION');
}

const AVAILABLE_REGIONS = {
  berlin,
  aachen,
};

const instanceConfig = AVAILABLE_REGIONS[region];

if (Object.keys(AVAILABLE_REGIONS).indexOf(region) === -1) {
  // Need to use console log to avoid circular import in logger module
  // eslint-disable-next-line no-console
  log('No region defined for this instance');
}

const rootConfig: RootConfig = {
  ...defaultConfig,
  ...instanceConfig,
  region,
};

export default rootConfig;

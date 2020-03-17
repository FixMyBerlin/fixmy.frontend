import defaultConfig from './default';
import berlin from './berlin';
import aachen from './aachen';

const region: string = process.env.REGION || 'berlin';

const AVAILABLE_REGIONS = {
  berlin,
  aachen
};

const instanceConfig = AVAILABLE_REGIONS[region] || {};

if (Object.keys(AVAILABLE_REGIONS).indexOf(region) === -1) {
  // Need to use console log to avoid circular import in logger module
  // eslint-disable-next-line no-console
  console.error('No region defined for this instance');
}

export default {
  ...defaultConfig,
  ...instanceConfig,
  region
};

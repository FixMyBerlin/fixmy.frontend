import defaultConfig from './default';
import berlin from './berlin';
import aachen from './aachen';
import eichwalde from './eichwalde';

export type Region = 'eichwalde' | 'berlin' | 'aachen';

const region = (process.env.REGION as Region) || 'berlin';

const AVAILABLE_REGIONS = {
  berlin,
  aachen,
  eichwalde
};

const instanceConfig = AVAILABLE_REGIONS[region];

if (Object.keys(AVAILABLE_REGIONS).indexOf(region) === -1) {
  // Need to use console log to avoid circular import in logger module
  // eslint-disable-next-line no-console
  console.error('No region defined for this instance');
}

type BerlinConfig = typeof defaultConfig &
  typeof berlin & {
    region: 'berlin';
  };

type AachenConfig = typeof defaultConfig &
  typeof berlin & {
    region: 'aachen';
  };

type EichwaldeConfig = typeof defaultConfig &
  typeof berlin & {
    region: 'eichwalde';
  };

type RootConfig = BerlinConfig | AachenConfig | EichwaldeConfig;

// TODO: Fix all root config types
// @ts-ignore
const rootConfig: RootConfig = {
  ...defaultConfig,
  ...instanceConfig,
  region
};

export default rootConfig;

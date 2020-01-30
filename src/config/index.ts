import defaultConfig from './default';
import berlin from './berlin';
import bonn from './bonn';

const region = process.env.REGION_ENV || 'berlin';

let instanceConfig: Object;

if (region === 'berlin') {
  instanceConfig = berlin;
} else if (region === 'bonn') {
  instanceConfig = bonn;
} else {
  // Need to use console log to avoid circular import in logger module
  // eslint-disable-next-line no-console
  console.log('No region defined for this instance');
}

export default {
  ...defaultConfig,
  ...instanceConfig
};

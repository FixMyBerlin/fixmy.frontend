import debug from 'debug';

import config from '~/config';

// Setup namespaces to log when in development environment
if (import.meta.env.NODE_ENV !== 'production')
  localStorage.debug = config.logger;

const logger = debug('fmc');

export default logger;

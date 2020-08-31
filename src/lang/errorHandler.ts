import { IntlConfig } from 'react-intl';
import debug from 'debug';

const log = debug('fmc:intl');

/**
 * Message handler that allows easily disabling logging of missing translation
 * messages
 *
 * @param err react-intl error message
 */
const intlErrorHandler: IntlConfig['onError'] = (err) => {
  if (err.code === 'MISSING_TRANSLATION') {
    log(err.message);
  } else {
    log('%O', err);
  }
};

export default intlErrorHandler;

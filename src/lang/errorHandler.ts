import debug from 'debug';
import { IntlConfig, ReactIntlErrorCode } from 'react-intl';

import config from '~/config';

const log = debug('fmc:intl');

/**
 * Message handler that allows easily disabling logging of missing translation
 * messages
 *
 * @param err react-intl error message
 */
const intlErrorHandler: IntlConfig['onError'] = (err) => {
  if (err.code === ReactIntlErrorCode.MISSING_TRANSLATION) {
    if (config.intl.logMissingTranslations) log(err.message);
  } else {
    log('%O', err);
  }
};

export default intlErrorHandler;

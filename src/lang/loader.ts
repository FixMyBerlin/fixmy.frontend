import { IntlConfig } from 'react-intl';

import defaultMessages from '~/lang/compiled/de.json';
import { LocaleCode } from '~/types';

/**
 * Return locale messages for a given locale code
 *
 * @param locale locale code to load messages for
 */
const loadLocaleMessages = async (
  locale: LocaleCode
): Promise<IntlConfig['messages']> => {
  switch (locale) {
    // Typescript seems to have problems with the type of these JSON imports
    // https://github.com/microsoft/TypeScript/issues/15300
    case 'en':
      return import('~/lang/compiled/en.json') as any;
    case 'es':
      return import('~/lang/compiled/es.json') as any;
    default:
      return defaultMessages;
  }
};

export default loadLocaleMessages;

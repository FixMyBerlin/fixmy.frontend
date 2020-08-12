import { LocaleCode } from '~/types';

/**
 * Try and detect a sensible default locale for the current user by looking
 * at the browser's preferred content language and navigator language
 */
const getDefaultLocale = (): LocaleCode => {
  let candidate = window?.navigator.language?.slice(0, 2) as LocaleCode;
  if (window?.navigator['userLanguage']) {
    // eslint-disable-next-line dot-notation
    candidate = window.navigator['userLanguage'].slice(0, 2);
  }
  return ['de', 'en', 'es'].includes(candidate) ? candidate : 'de';
};

export default getDefaultLocale;

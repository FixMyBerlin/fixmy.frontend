import { shouldPolyfill } from '@formatjs/intl-getcanonicallocales/should-polyfill';
import { shouldPolyfill as shouldPolyfillPluralRules } from '@formatjs/intl-pluralrules/should-polyfill';
import { shouldPolyfill as shouldPolyfillNumberFormat } from '@formatjs/intl-numberformat/should-polyfill';
import { shouldPolyfill as shouldPolyfillDateTimeFormat } from '@formatjs/intl-datetimeformat/should-polyfill';
import debug from 'debug';

import { LocaleCode } from '~/types';

const log = debug('fmc:polyfills');

async function polyfill(locale: LocaleCode) {
  if (shouldPolyfill()) {
    log('Loading getcanonicallocales polyfill');
    // Load the polyfill 1st BEFORE loading data
    await import('@formatjs/intl-getcanonicallocales/polyfill');
  }

  if (shouldPolyfillPluralRules()) {
    // Load the polyfill 1st BEFORE loading data
    log('Loading pluralrules polyfill');
    await import('@formatjs/intl-pluralrules/polyfill');
  }

  if ((Intl.PluralRules as any).polyfilled) {
    switch (locale) {
      default:
        await import('@formatjs/intl-pluralrules/locale-data/de');
        break;
      case 'en':
        await import('@formatjs/intl-pluralrules/locale-data/en');
        break;
      case 'es':
        await import('@formatjs/intl-pluralrules/locale-data/es');
        break;
    }
  }

  if (shouldPolyfillNumberFormat()) {
    // Load the polyfill 1st BEFORE loading data
    log('Loading numberformat polyfill');
    await import('@formatjs/intl-numberformat/polyfill');
  }

  if ((Intl.NumberFormat as any).polyfilled) {
    switch (locale) {
      default:
        await import('@formatjs/intl-numberformat/locale-data/de');
        break;
      case 'en':
        await import('@formatjs/intl-numberformat/locale-data/en');
        break;
      case 'es':
        await import('@formatjs/intl-numberformat/locale-data/es');
        break;
    }
  }

  if (shouldPolyfillDateTimeFormat()) {
    // Load the polyfill 1st BEFORE loading data
    log('Loading datetimeformat polyfill');
    await import('@formatjs/intl-datetimeformat/polyfill');
  }

  if ((Intl.DateTimeFormat as any).polyfilled) {
    // Parallelize CLDR data loading
    const dataPolyfills = [import('@formatjs/intl-datetimeformat/add-all-tz')];

    switch (locale) {
      default:
        dataPolyfills.push(
          import('@formatjs/intl-datetimeformat/locale-data/de')
        );
        break;
      case 'en':
        dataPolyfills.push(
          import('@formatjs/intl-datetimeformat/locale-data/en')
        );
        break;
      case 'es':
        dataPolyfills.push(
          import('@formatjs/intl-datetimeformat/locale-data/es')
        );
        break;
    }
    await Promise.all(dataPolyfills);
  }
}

export default polyfill;

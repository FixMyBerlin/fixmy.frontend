/* eslint-disable import/prefer-default-export */
import { createMuiTheme } from '@material-ui/core';
import {
  deDE as muiDE,
  enUS as muiEN,
  esES as muiES,
} from '@material-ui/core/locale';
import { LocaleCode } from '~/types';
import config from '~/config';

/**
 * Create localized Material UI theme object
 *
 * @param locale locale code
 */
export const getTheme = (locale: LocaleCode) => {
  let muiLocale;
  switch (locale) {
    case 'en':
      muiLocale = muiEN;
      break;
    case 'es':
      muiLocale = muiES;
      break;
    default:
      muiLocale = muiDE;
  }
  return createMuiTheme(
    {
      palette: {
        primary: { main: config.colors.interaction },
        secondary: { main: config.colors.change_4 },
        error: { main: config.colors.error },
        info: { main: config.colors.interaction },
        success: { main: config.colors.label_01 },
      },
    },
    muiLocale
  );
};

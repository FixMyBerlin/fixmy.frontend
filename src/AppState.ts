import debug from 'debug';
import { Dispatch } from 'redux';
import config from './apps/Gastro/config';
import getDefaultLocale from './utils/defaultLocale';
import { LocaleCode, DistrictConfig, Region } from '~/types';
import polyfill from './utils/polyfill-intl';

const OPEN_MENU = 'App/AppState/OPEN_MENU';
const CLOSE_MENU = 'App/AppState/CLOSE_MENU';
const SET_DISTRICT = 'App/AppState/SET_DISTRICT';
const SET_LOCALE = 'App/AppState/SET_LOCALE';

const log = debug('fmc:AppState');

// Action types

type Open = { type: typeof OPEN_MENU };
type Close = { type: typeof CLOSE_MENU };
type SetDistrict = { type: typeof SET_DISTRICT; payload: DistrictConfig };
type SetLocale = { type: typeof SET_LOCALE; locale: LocaleCode };

export type AppStateAction =
  | Open
  | Close
  | SetDistrict
  | SetLocale
  | { type: null };
export interface AppState {
  isMenuOpen: boolean;
  district?: DistrictConfig;
  locale: LocaleCode;
}

const initialState = {
  isMenuOpen: false,
  district: null,
  locale: getDefaultLocale(),
};

export function open() {
  window.scrollTo(0, 0);
  return { type: OPEN_MENU };
}

export function close() {
  window.scrollTo(0, 0);
  return { type: CLOSE_MENU };
}

export function toggle() {
  return (dispatch: Dispatch, getState) => {
    const { isMenuOpen } = getState().AppState;

    if (isMenuOpen) {
      return dispatch(close());
    }

    return dispatch(open());
  };
}

export function setDistrict(district: Region) {
  const payload = config.districts[district];
  if (payload == null) log(`District ${district} not configured`);
  return { type: SET_DISTRICT, payload };
}

export const setLocale = (locale: LocaleCode) => async (dispatch: Dispatch) => {
  await setLocaleThunk(locale, dispatch);
};

const setLocaleThunk = async (locale: LocaleCode, dispatch: Dispatch) => {
  await polyfill(locale);
  log('polyfills loaded');
  dispatch({ type: SET_LOCALE, locale });
};

export default function AppStateReducer(
  state: AppState = initialState,
  action: AppStateAction = { type: null }
) {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isMenuOpen: true };
    case CLOSE_MENU:
      return { ...state, isMenuOpen: false };
    case SET_DISTRICT:
      return { ...state, district: (action as SetDistrict).payload };
    case SET_LOCALE:
      return { ...state, locale: (action as SetLocale).locale };
    default:
      return state;
  }
}

import { matchPath } from 'react-router-dom';
import qs from 'qs';
import debug from 'debug';
import { Location } from 'history';
import { Dispatch } from 'redux';
import config from './apps/Gastro/config';
import logger from './utils/logger';
import getDefaultLocale from './utils/defaultLocale';
import { LocaleCode, DistrictConfig } from './types';
import { Region } from './config';

const UPDATE_HISTORY = 'App/AppState/UPDATE_HISTORY';
const SET_ACTIVE_SECTION = 'App/AppState/SET_ACTIVE_SECTION';
const SET_VIEW_ACTIVE = 'App/AppState/SET_VIEW_ACTIVE';
const OPEN_MENU = 'App/AppState/OPEN_MENU';
const CLOSE_MENU = 'App/AppState/CLOSE_MENU';
const SET_DISTRICT = 'App/AppState/SET_DISTRICT';
const SET_LOCALE = 'App/AppState/SET_LOCALE';

const log = debug('fmc:AppState');

type MapView = 'zustand' | 'planungen';

// Action types

type UpdateHistory = {
  type: typeof UPDATE_HISTORY;
  payload: {
    isEmbedMode?: boolean;
    activeSection?: number | null;
    activeView?: MapView;
  };
};
type SetActiveSection = {
  type: typeof SET_ACTIVE_SECTION;
  payload: { activeSection: number | null };
};
type SetActiveView = {
  type: typeof SET_VIEW_ACTIVE;
  payload: { activeView: MapView };
};
type Open = { type: typeof OPEN_MENU };
type Close = { type: typeof CLOSE_MENU };
type SetDistrict = { type: typeof SET_DISTRICT; payload: DistrictConfig };
type SetLocale = { type: typeof SET_LOCALE; locale: LocaleCode };

export type AppStateAction =
  | UpdateHistory
  | SetActiveSection
  | SetActiveView
  | Open
  | Close
  | SetDistrict
  | SetLocale
  | { type: null };
export interface AppState {
  activeView?: MapView;
  activeSection?: number;
  isMenuOpen: boolean;
  isEmbedMode: boolean;
  district?: DistrictConfig;
  locale: LocaleCode;
}

const initialState = {
  activeView: null,
  activeSection: null,
  isMenuOpen: false,
  isEmbedMode: false,
  district: null,
  locale: getDefaultLocale()
};

export const detectEmbedMode = (location: Location) => (dispatch: Dispatch) => {
  const isEmbedMode =
    !!qs.parse(location.search, { ignoreQueryPrefix: true }).embed ||
    window.location.host === 'embed.fixmyberlin.de';

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      isEmbedMode
    }
  });
};

type MapPath = {
  activeView?: MapView;
  activeSection?: number;
};

export const updateHistory = (props: Location) => (dispatch: Dispatch) => {
  const match = matchPath(props.pathname, {
    path: '/:activeView?/:activeSection?',
    exact: false,
    strict: false
  });

  const { activeSection, activeView } = match.params as MapPath;

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection: Number.isNaN(activeSection) ? null : activeSection,
      activeView
    }
  });
};

export function setActiveSection(activeSection: number | null) {
  return {
    type: SET_ACTIVE_SECTION,
    payload: { activeSection }
  };
}

export function setActiveView(activeView: MapView) {
  return { type: SET_VIEW_ACTIVE, payload: { activeView } };
}

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
  if (payload == null) logger(`District ${district} not configured`);
  return { type: SET_DISTRICT, payload };
}

export function setLocale(locale: LocaleCode) {
  log('set locale to', locale);
  return { type: SET_LOCALE, locale };
}

export default function AppStateReducer(
  state: AppState = initialState,
  action: AppStateAction = { type: null }
) {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isMenuOpen: true };
    case CLOSE_MENU:
      return { ...state, isMenuOpen: false };
    case UPDATE_HISTORY:
    case SET_ACTIVE_SECTION:
    case SET_VIEW_ACTIVE:
      return { ...state, ...(action as SetActiveView).payload };
    case SET_DISTRICT:
      return { ...state, district: (action as SetDistrict).payload };
    case SET_LOCALE:
      return { ...state, locale: (action as SetLocale).locale };
    default:
      return { ...state };
  }
}

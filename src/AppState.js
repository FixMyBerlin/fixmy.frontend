import { matchPath } from 'react-router-dom';
import qs from 'qs';

const UPDATE_HISTORY = 'App/AppState/UPDATE_HISTORY';
const SET_ACTIVE_SECTION = 'App/AppState/SET_ACTIVE_SECTION';
const SET_VIEW_ACTIVE = 'App/AppState/SET_VIEW_ACTIVE';
const OPEN_MENU = 'App/AppState/OPEN_MENU';
const CLOSE_MENU = 'App/AppState/CLOSE_MENU';

const initialState = {
  activeView: null,
  activeSection: null,
  isMenuOpen: false,
  isEmbedMode: false
};

export const detectEmbedMode = (props) => (dispatch) => {
  const isEmbedMode =
    !!qs.parse(props.search, { ignoreQueryPrefix: true }).embed ||
    window.location.host === 'embed.fixmyberlin.de';

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      isEmbedMode
    }
  });
};

export const updateHistory = (props) => (dispatch) => {
  const match = matchPath(props.pathname, {
    path: '/:activeView?/:activeSection?',
    exact: false,
    strict: false
  });

  const { activeSection, activeView } = match.params;

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection: Number.isNaN(activeSection) ? null : activeSection,
      activeView
    }
  });
};

export function setActiveSection(activeSection) {
  return { type: SET_ACTIVE_SECTION, payload: { activeSection } };
}

export function setActiveView(activeView) {
  return { type: SET_VIEW_ACTIVE, payload: { activeView } };
}

export function open() {
  return { type: OPEN_MENU };
}

export function close() {
  return { type: CLOSE_MENU };
}

export function toggle() {
  return (dispatch, getState) => {
    const { isMenuOpen } = getState().AppState;

    if (isMenuOpen) {
      return dispatch(close());
    }

    return dispatch(open());
  };
}

export default function AppStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, isMenuOpen: true };
    case CLOSE_MENU:
      return { ...state, isMenuOpen: false };
    case UPDATE_HISTORY:
    case SET_ACTIVE_SECTION:
    case SET_VIEW_ACTIVE:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}

import { matchPath } from 'react-router';

const UPDATE_HISTORY = 'App/AppState/UPDATE_HISTORY';
const SET_ACTIVE_SECTION = 'App/AppState/SET_ACTIVE_SECTION';
const SET_VIEW_ACTIVE = 'App/AppState/SET_VIEW_ACTIVE';

const initialState = {
  activeView: null,
  activeSection: null
};

export const updateHistory = props => (dispatch, getState) => {
  const match = matchPath(props.pathname, {
    path: '/:activeView?/:activeSection?',
    exact: false,
    strict: false
  });

  const activeSection = match.params.activeSection || getState().AppState.activeSection;
  const activeView = match.params.activeView;

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection,
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

export default function AppStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_HISTORY:
    case SET_ACTIVE_SECTION:
    case SET_VIEW_ACTIVE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

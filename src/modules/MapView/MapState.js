const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_SECTION_ACTIVE = 'MapView/MapState/SET_SECTION_ACTIVE';

const initialState = {
  ...config.map.views.default,
  activeSection: null
};

export function setView(view) {
  return { type: SET_VIEW, payload: view };
}

export function setSectionActive(activeSection) {
  return { type: SET_SECTION_ACTIVE, payload: { activeSection } };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
    case SET_SECTION_ACTIVE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_SECTION_ACTIVE = 'MapView/MapState/SET_SECTION_ACTIVE';
const SET_HAS_MOVED = 'MapView/MapState/SET_HAS_MOVED';

const initialState = {
  ...config.map.views.default,
  activeSection: null,
  activeLocation: null,
  hasMoved: false
};

export function setView(view) {
  return { type: SET_VIEW, payload: view };
}

export function setSectionActive(props = null) {
  return { type: SET_SECTION_ACTIVE, payload: { activeSection: props } };
}

export function setHasMoved(hasMoved) {
  return { type: SET_HAS_MOVED, payload: { hasMoved } };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
    case SET_SECTION_ACTIVE:
    case SET_HAS_MOVED:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_SECTION_ACTIVE = 'MapView/MapState/SET_SECTION_ACTIVE';
const SET_HAS_MOVED = 'MapView/MapState/SET_HAS_MOVED';
const UPDATE_HBI = 'MapView/MapState/UPDATE_HBI';

const initialState = {
  ...config.map.views.default,
  hbi_values: config.map.hbi.map(d => d.value),
  activeSection: null,
  activeLocation: null,
  hasMoved: false,
  hbi_speed: 5,
  hbi_safety: 5
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

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
    case SET_SECTION_ACTIVE:
    case SET_HAS_MOVED:
      return Object.assign({}, state, action.payload);
    case UPDATE_HBI: {
      const hbiValues = state.hbi_values.map((d, i) => {
        if (i === action.payload.index) {
          return action.payload.value;
        }
        return d;
      });

      return Object.assign({}, state, { hbi_values: hbiValues });
    }
    default:
      return Object.assign({}, state);
  }
}

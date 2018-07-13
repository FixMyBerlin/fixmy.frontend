import uuidv4 from 'uuid/v4';

const UPDATE_HBI = 'MapView/MapState/UPDATE_HBI';

const initialState = {
  hbi_values: config.hbi.map(d => d.value),
  userid: uuidv4()
};

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
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

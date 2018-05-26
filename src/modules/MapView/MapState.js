const SET_VIEW = 'MapView/MapState/SET_VIEW';

const initialState = {
  ...config.map.views.default
};

export function setView(view) {
  console.log('set view', view);
  return { type: SET_VIEW, payload: view };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

import Axios from 'axios';
import idx from 'idx';

const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_SECTION_ACTIVE = 'MapView/MapState/SET_SECTION_ACTIVE';
const SET_HAS_MOVED = 'MapView/MapState/SET_HAS_MOVED';
const GEOCODE_DONE = 'MapView/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'MapView/MapState/GEOCODE_FAIL';

const initialState = {
  ...config.map.views.default,
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

export function geocodeAddress(searchtext) {
  return (dispatch) => {
    const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
    Axios.get(`${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU`)
      .then((result) => {
        const geocodeResult = idx(result.data, _ => _.Response.View[0].Result[0].Location.DisplayPosition);
        if (!geocodeResult) {
          return dispatch({ type: GEOCODE_FAIL, payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' } });
        }

        return dispatch({ type: GEOCODE_DONE, payload: { center: [geocodeResult.Longitude, geocodeResult.Latitude] } });
      });
  };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
    case SET_SECTION_ACTIVE:
    case SET_HAS_MOVED:
    case GEOCODE_DONE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

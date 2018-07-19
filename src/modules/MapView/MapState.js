import Axios from 'axios';
import idx from 'idx';

const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_SECTION_ACTIVE = 'MapView/MapState/SET_SECTION_ACTIVE';
const SET_HAS_MOVED = 'MapView/MapState/SET_HAS_MOVED';
const GEOCODE_DONE = 'MapView/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'MapView/MapState/GEOCODE_FAIL';
const SET_HBI_FILTER = 'MapView/MapState/SET_HBI_FILTER';
const SET_POPUP_LOCATION = 'MapView/MapState/SET_POPUP_LOCATION';
const SET_POPUP_VISIBLE = 'MapView/MapState/SET_POPUP_VISIBLE';

const initialState = {
  ...config.map.view,
  activeSection: null,
  activeLocation: null,
  activeLayer: null,
  displayPopup: false,
  popupLocation: null,
  filterHbi: null,
  filterHbiIndex: null,
  filterPlannings: null,
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

export function setHbiFilter(min, max, filterHbiIndex = null) {
  return { type: SET_HBI_FILTER, payload: { filterHbi: [min, max], filterHbiIndex } };
}

export function resetHbiFilter() {
  return { type: SET_HBI_FILTER, payload: { filterHbi: null, filterHbiIndex: null } };
}

export function setPopupLocation(popupLocation) {
  return { type: SET_POPUP_LOCATION, payload: { popupLocation } };
}

export function setPopupVisible(isVisible) {
  return { type: SET_POPUP_VISIBLE, payload: { displayPopup: isVisible } };
}

export function geocodeAddress(searchtext) {
  return (dispatch) => {
    const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
    Axios.get(`${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU&city=Berlin`)
      .then((result) => {
        const geocodeResult = idx(result.data, _ => _.Response.View[0].Result[0].Location.DisplayPosition);
        if (!geocodeResult) {
          return dispatch({ type: GEOCODE_FAIL, payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' } });
        }

        // we do + (Math.random() / 1000) in order to always get a slightly different center
        const center = [geocodeResult.Longitude, geocodeResult.Latitude + (Math.random() / 1000)];
        return dispatch({ type: GEOCODE_DONE, payload: { center, zoom: 17 } });
      });
  };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VIEW:
    case SET_SECTION_ACTIVE:
    case SET_HAS_MOVED:
    case GEOCODE_DONE:
    case SET_HBI_FILTER:
    case SET_POPUP_LOCATION:
    case SET_POPUP_VISIBLE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

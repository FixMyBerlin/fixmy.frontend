import fetch from 'unfetch';
import idx from 'idx';

const SET_VIEW = 'MapView/MapState/SET_VIEW';
const SET_HAS_MOVED = 'MapView/MapState/SET_HAS_MOVED';
const GEOCODE_DONE = 'MapView/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'MapView/MapState/GEOCODE_FAIL';
const SET_HBI_FILTER = 'MapView/MapState/SET_HBI_FILTER';
const SET_PLANNING_FILTER = 'MapView/MapState/SET_PLANNING_FILTER';
const SET_POPUP_DATA = 'MapView/MapState/SET_POPUP_DATA';
const SET_POPUP_LOCATION = 'MapView/MapState/SET_POPUP_LOCATION';
const SET_POPUP_VISIBLE = 'MapView/MapState/SET_POPUP_VISIBLE';
const SET_PLANNING_DATA = 'MapView/MapState/SET_PLANNING_DATA';

const initialState = {
  ...config.map.view,
  popupData: null,
  displayPopup: false,
  popupLocation: null,
  filterHbi: [true, true, true, true],
  filterPlannings: [true, true, true, true],
  hasMoved: false,
  hbi_speed: 5,
  hbi_safety: 5,
  planningData: false
};

export function setView(view) {
  return { type: SET_VIEW, payload: view };
}

export function setPopupData(popupData = null) {
  return { type: SET_POPUP_DATA, payload: { popupData } };
}

export function setHasMoved(hasMoved) {
  return { type: SET_HAS_MOVED, payload: { hasMoved } };
}

export function toggleHbiFilter(filterIndex) {
  return { type: SET_HBI_FILTER, filterIndex };
}

export function togglePlanningFilter(filterIndex) {
  return { type: SET_PLANNING_FILTER, filterIndex };
}

export function setPopupLocation(popupLocation) {
  return { type: SET_POPUP_LOCATION, payload: { popupLocation } };
}

export function setPopupVisible(isVisible) {
  return { type: SET_POPUP_VISIBLE, payload: { displayPopup: isVisible } };
}

export function loadPlanningData() {
  return async (dispatch, getState) => {
    if (getState().MapState.planningData) {
      return false;
    }

    const planningData = await fetch('https://api.fixmyberlin.de/api/plannings?page_size=200').then(r => r.json());
    return dispatch({ type: SET_PLANNING_DATA, payload: { planningData } });
  };
}

export function geocodeAddress(searchtext) {
  return (dispatch) => {
    const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
    fetch(`${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU&city=Berlin`)
      .then(r => r.json())
      .then((data) => {
        const geocodeResult = idx(data, _ => _.Response.View[0].Result[0].Location.DisplayPosition);
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
    case SET_POPUP_DATA:
    case SET_HAS_MOVED:
    case GEOCODE_DONE:
    case SET_POPUP_LOCATION:
    case SET_POPUP_VISIBLE:
    case SET_PLANNING_DATA:
      return Object.assign({}, state, action.payload);
    case SET_HBI_FILTER:
      return Object.assign({}, state, {
        filterHbi: state.filterHbi.map((filter, i) => (i === action.filterIndex ? !filter : filter))
      });
    case SET_PLANNING_FILTER:
      return Object.assign({}, state, {
        filterPlannings: state.filterPlannings.map((filter, i) => (i === action.filterIndex ? !filter : filter))
      });
    default:
      return Object.assign({}, state);
  }
}

import ky from 'ky';
import idx from 'idx/lib/idx';

const RESET_DIALOG_STATE = 'Reports/OverviewMapState/RESET_DIALOG_STATE';
const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_LOCATION = 'Reports/ReportsDialogState/SET_LONG_LAT';
const SET_LOCATION_MODE = 'Reports/ReportsDialogState/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'device'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'geocoding'; // not an action type, keeping this here to prevent typos
const GEOCODE_DONE = 'Map/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'Map/MapState/GEOCODE_FAIL';


export function geocodeAddress(searchtext) {
  return async (dispatch) => {
    const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.map;

    try {
      const searchUrl = `${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU&city=Berlin`;
      const data = await ky.get(searchUrl).json();

      const geocodeResult = idx(data, _ => _.Response.View[0].Result[0].Location.DisplayPosition);
      if (!geocodeResult) {
        return dispatch({ type: GEOCODE_FAIL, payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' } });
      }

      // we do + (Math.random() / 1000) in order to always get a slightly different center
      const center = [geocodeResult.Longitude, geocodeResult.Latitude + (Math.random() / 1000)];
      dispatch({ type: GEOCODE_DONE, payload: { center, zoom: 17 } });
    } catch (error) {
      dispatch({ type: GEOCODE_FAIL, payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' } });
    }
  };
}

const initialState = {
  reports: [], // existing reports, fetched via API
  newReport: null, // the new report object, populated while stepping through the dialog
  error: null, // holds an error message to which displaying components can bind to // TODO: set up rendering a toast
  location_mode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  geocodeResult: null // object containing center and zoom
};

/* eslint-disable no-tabs */
/*

newReport is used to a) compile a new object to submit to the API and b) to step through the dialog

It starts with step 1, a seperate locatorMap component
  location_mode: device | geolocation
	location  --> when this is set, go to step 2
    lngLat
    address
	what     --> when this is set, go to step 3
    ironing
    	amenities_needed
    	amenity_placement
    	payment_reserves_bike_park
	additional_info --> when this is set, go to step 4
    photo_upload_url
    description

 */


export function loadReportData() {
  return async (dispatch, getState) => {
    const state = getState();
    const { filterReports } = state.MapState;
    if (filterReports) {
      return false;
    }
    const reportData = await ky.get('/data/reports-example.json');
    console.log(SET_REPORT_DATA, reportData);
    // TODO:  Implement further
  };
}

export function resetDialogState() {
  return { type: RESET_DIALOG_STATE };
}

export function setLocation({ lngLat, address }) {
  return { type: SET_LOCATION, payload: { lngLat, address } };
}

export function setLocationMode(mode) {
  return { type: SET_LOCATION_MODE, mode };
}

export default function ReportsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_DIALOG_STATE:
      // set to default state, except for reports to not be forced to fetch data again
      return { ...initialState, reports: state.reports }
    case GEOCODE_DONE:
      return { ...state, geocodeResult: action.payload };
    case SET_LOCATION:
      return { ...state,
        newReport: {
          ...state.newReport,
          location: action.payload
        } };
    case SET_LOCATION_MODE:
      // eslint-disable-next-line no-case-declarations
      const modeStatedProperly = action.mode && [LOCATION_MODE_DEVICE, LOCATION_MODE_GEOCODING].includes(action.mode);
      if (!modeStatedProperly) throw new Error(`use either ${LOCATION_MODE_DEVICE} or ${LOCATION_MODE_GEOCODING} to state the location mode`);
      return { ...state, location_mode: action.mode };
    case GEOCODE_FAIL:
      return { ...state,
        error: {
        message: action.payload.geocodeError
      } };
      default:
      return { ...state };
  }
}

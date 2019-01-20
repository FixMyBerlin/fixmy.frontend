import ky from 'ky';
import idx from 'idx/lib/idx';
import reverseGeocode from '~/services/reverseGeocode';

const RESET_DIALOG_STATE = 'Reports/OverviewMapState/RESET_DIALOG_STATE';
const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_LOCATION = 'Reports/ReportsDialogState/SET_LONG_LAT';
const SET_LOCATION_MODE = 'Reports/ReportsDialogState/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'device'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'geocoding'; // not an action type, keeping this here to prevent typos
const GEOCODE_DONE = 'Reports/ReportsDialogState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'Reports/ReportsDialogState/GEOCODE_FAIL';
const REVERSE_GEOCODE_DONE = 'Reports/ReportsDialogState/REVERSE_GEOCODE_SUCCESS';
const REVERSE_GEOCODE_FAIL = 'Reports/ReportsDialogState/REVERSE_GEOCODE_FAIL';


const initialState = {
  reports: [], // existing reports, fetched via API
  newReport: null, // the new report object, populated while stepping through the dialog
  error: null, // holds an error message to which displaying components can bind to // TODO: set up rendering a toast
  locationMode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  geocodeResult: null, // object containing center and zoom
  reverseGeocodeResult: null // An address
};

/* eslint-disable no-tabs */
/*

newReport is used to a) compile a new object to submit to the API and b) to step through the dialog

It starts with step 1, a seperate locatorMap component
  locationMode: device | geolocation
	location  --> when this is set, go to step 2
    lngLat
    address
	what     --> when this is set, go to step 3
    ironing
    	amenitiesNeeded
    	amenityPlacement
    	paymentReservesBikePark
	additional_info --> when this is set, go to step 4
    photoUploadUrl
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

// TODO: factor logic out to service
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

export function reverseGeocodeAddress({ lat, lng }) {
  return async (dispatch) => {
    let result;
    try {
      result = await reverseGeocode({ lat, lng });
    } catch (e) {
      return dispatch({ type: REVERSE_GEOCODE_FAIL, payload: { geocodeError: 'Fehler beim Auflösen der Koordinaten in eine Adresse' } });
    }
    if (!result) {
      return dispatch({ type: REVERSE_GEOCODE_FAIL, payload: { geocodeError: 'Die Geokoordinaten konnten in keine Adresse aufgelöst werden' } });
    }
    dispatch({ type: REVERSE_GEOCODE_DONE, payload: { result } });
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
      return { ...initialState, reports: state.reports };
    case GEOCODE_DONE:
      return { ...state, geocodeResult: action.payload };
    case REVERSE_GEOCODE_DONE:
      return { ...state, reverseGeocodeResult: action.payload };
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
      return { ...state, locationMode: action.mode };
    case GEOCODE_FAIL:
    case REVERSE_GEOCODE_FAIL:
      return { ...state,
        error: {
        message: action.payload.geocodeError
      } };
      default:
      return { ...state };
  }
}

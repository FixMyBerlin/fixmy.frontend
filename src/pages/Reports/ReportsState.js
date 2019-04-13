// TODO: add unit tests for reducer
// TODO: keep and submit address elements (street, number, ..) in seperate attributes
// TODO: switch the reverse geocoder
// TODO: heavily reduce boiler plate https://redux.js.org/recipes/reducing-boilerplate
// TODO: use immutability helpers like https://github.com/mweststrate/immer
// TODO: split uo reducer into subreducers based on the structure of the newReport object
import ky from 'ky';
import idx from 'idx/lib/idx';
import * as dotProp from 'dot-prop-immutable';
import reverseGeocode from '~/services/reverseGeocode';
import { getGeoLocation } from '~/pages/Map/map-utils';
import { apiFetchReports, apiSubmitReport, marshallNewReportObjectFurSubmit } from '~/pages/Reports/apiservice';
import booleanWithin from '@turf/boolean-within';

const RESET_DIALOG_STATE = 'Reports/OverviewMapState/RESET_DIALOG_STATE';
const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_LOCATION_MODE = 'Reports/ReportsDialogState/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'DEVICE'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'GEOCODING'; // not an action type, keeping this here to prevent typos
const SET_DEVICE_LOCATION = 'Reports/ReportsDialogState/SET_DEVICE_LOCATION';
const GEOCODE_DONE = 'Reports/ReportsDialogState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'Reports/ReportsDialogState/GEOCODE_FAIL';
const VALIDATE_POSITION = 'Reports/ReportsDialogState/VALIDATE_POSITION';
const INVALIDATE_POSITION = 'Reports/ReportsDialogState/INVALIDATE_POSITION';
const REVERSE_GEOCODE_DONE = 'Reports/ReportsDialogState/REVERSE_GEOCODE_SUCCESS';
const REVERSE_GEOCODE_FAIL = 'Reports/ReportsDialogState/REVERSE_GEOCODE_FAIL';
const SET_TEMP_LOCATION_LNG_LAT = 'Reports/ReportsDialogState/SET_TEMP_LOCATION_LNG_LAT';
const SET_TEMP_LOCATION_ADDRESS = 'Reports/ReportsDialogState/SET_TEMP_LOCATION_ADDRESS';
const PIN_LOCATION = 'Reports/ReportsDialogState/PIN_LOCATION'; // sort of intermediate step, to ask "are you sure"?
const CONFIRM_LOCATION = 'Reports/ReportsDialogState/CONFIRM_LOCATION';
const ADD_ERROR = 'Reports/ReportsDialogState/ADD_ERROR'; // generic error
const REMOVE_ERROR = 'Reports/ReportsDialogState/REMOVE_ERROR';
export const BIKESTAND_PLACEMENT_SIDEWALK = 'SIDEWALK';
export const BIKESTAND_PLACEMENT_STREET = 'STREET';
const SET_BIKESTAND_NEEDS = 'Reports/ReportsDialogState/SET_BIKESTAND_NEEDS';
const SET_ADDITIONAL_DATA = 'Reports/ReportsDialogState/SET_ADDITIONAL_DATA';
const STEP_BACK_DIALOG = 'Reports/ReportsDialogState/STEP_BACK_DIALOG';
const SUBMIT_REPORT = 'Reports/ReportsDialogState/SUBMIT_REPORT';
const SUBMIT_REPORT_SUCCESS = 'Reports/ReportsDialogState/SUBMIT_REPORT_SUCCESS';
const SUBMIT_REPORT_ERROR = 'Reports/ReportsDialogState/SUBMIT_REPORT_ERROR';
const SET_SELECTED_REPORT = 'Reports/ReportsDialogState/SET_SELECTED_REPORT';
const UNSET_SELECTED_REPORT = 'Reports/ReportsDialogState/UNSET_SELECTED_REPORT';

const initialState = {
  reports: [], // existing reports, fetched via API
  selectedReport: null, // currently displayed report item (e.g. on overview map)
  newReport: {}, // the new report object, populated while stepping through the dialog
  error: {
    message: null
  }, // holds an error message to which displaying components can bind to
  locationMode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  deviceLocation: null, // {lng, lat}
  geocodeResult: null, // object containing center and zoom
  reverseGeocodeResult: null, // An address,
  tempLocation: null, // holds lngLat, address, a "pinned" property (which indicates the location as submittable) and a "valid" property
  submitting: false,
  submitted: false
};

/* eslint-disable no-tabs */

/*

newReport is used to a) compile a new object to submit to the API and b) to step through the dialog.

Content of newReport (TODO: use some sort of interface/type/shape) --> e.g. https://github.com/jquense/yup or even PropTypes

	location  --> when this is set, go to step 2
    lngLat
    address
	what     --> when this is set, go to step 3
    bikestands
    	bikestandsNeeded
    	bikestandsPlacement
    	paymentReservesBikePark
    additionalInfo --> when this is set, go to step 4
      photo
      description

 */
export function resetDialogState() {
  return { type: RESET_DIALOG_STATE };
}

export function setTempLocationLngLat({ lng, lat }) {
  return { type: SET_TEMP_LOCATION_LNG_LAT, payload: { lng, lat } };
}

export function setTempLocationAddress(address) {
  return { type: SET_TEMP_LOCATION_ADDRESS, address };
}

export function pinLocation() {
  return { type: PIN_LOCATION };
}

export function confirmLocation() {
  return { type: CONFIRM_LOCATION };
}

export function setDeviceLocation({ lng, lat }) {
  return { type: SET_DEVICE_LOCATION, payload: { lng, lat } };
}

// TODO: unify syntax used here
export const addError = error => ({
  type: ADD_ERROR,
  error
});

export const removeError = () => ({
  type: REMOVE_ERROR
});

export const setBikestandNeeds = formData => ({
  type: SET_BIKESTAND_NEEDS,
  payload: formData
});

export const setAdditionalData = formData => ({
  type: SET_ADDITIONAL_DATA,
  payload: formData
});

// TODO: re-think this solution or at least document it
const stateNodesToUnsetPerStep = new Map();
stateNodesToUnsetPerStep.set(1, 'newReport.location');
stateNodesToUnsetPerStep.set(2, 'newReport.what.bikestands'); // TODO: this does not work well, component state is not reset (mapHasBeenDragged)
stateNodesToUnsetPerStep.set(3, 'newReport.what.additionalInfo');

/**
 * Takes a dialog step number (used in the NavBar to show the dialog progress)
 * and returns a path to a node in this state object, e.g. newReport.what, that can be unset to roll back the dialog.
 * @param toStep
 */
export const stepBackDialog = toStep => ({
  type: STEP_BACK_DIALOG,
  stateNodeToUnset: stateNodesToUnsetPerStep.get(toStep)
});

async function loadReportsDataInner(dispatch) {
  try {
    const reportData = await apiFetchReports();
    dispatch({ type: SET_REPORT_DATA, payload: reportData });
  } catch (e) {
    console.error(`Failed to fetch reports: ${e}`);
    dispatch(ADD_ERROR, 'Fehler beim Laden der Meldungen');
  }
}

export function loadReportsData() {
  return async (dispatch) => {
    await loadReportsDataInner(dispatch);
  };
}

export function setSelectedReport(id) {
  return async (dispatch, getState) => {
    const { reports } = getState().ReportsState;
    if (!reports.length) {
      await loadReportsDataInner(dispatch);
    }
    dispatch({ type: SET_SELECTED_REPORT, id });
  };
}

export const unsetSelectedReport = () => ({type: UNSET_SELECTED_REPORT});


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

      const center = [geocodeResult.Longitude, geocodeResult.Latitude];
      dispatch({ type: GEOCODE_DONE, payload: { center, zoom: 17 } });
    } catch (error) {
      dispatch({ type: GEOCODE_FAIL, payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' } });
    }
  };
}


function validateCoordinates(polygonGeoJson, { lng, lat }) {
  const pointFeature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  };
  return booleanWithin(pointFeature, polygonGeoJson);
}

/**
 * If a validationBoundary is passed, it is made sure that the points is within the given geomery
 */
export function reverseGeocodeCoordinates({ lat, lng }, validationBoundary) {
  return async (dispatch) => {
    // validate geometry. if center is within a given boundary, do not fire a request
    if (validationBoundary) {
      const isValidGeometry = validateCoordinates(validationBoundary, { lat, lng });
      if (isValidGeometry) {
        dispatch({
          type: VALIDATE_POSITION
        });
      } else {
        return dispatch({
          type: INVALIDATE_POSITION
        });
      }
    }

    // if geometry is valid, go on
    let result;
    try {
      result = await reverseGeocode({ lat, lng });
    } catch (e) {
      return dispatch({
        type: REVERSE_GEOCODE_FAIL,
        payload: { geocodeError: 'Fehler beim Auflösen der Koordinaten in eine Adresse' }
      });
    }
    if (!result) {
      return dispatch({
        type: REVERSE_GEOCODE_FAIL,
        payload: { geocodeError: 'Die Geokoordinaten konnten in keine Adresse aufgelöst werden' }
      });
    }
    dispatch({ type: REVERSE_GEOCODE_DONE, payload: { result } });
    dispatch({ type: SET_TEMP_LOCATION_ADDRESS, address: result });
  };
}

export function setLocationMode(mode) {
  const modeStatedProperly = [LOCATION_MODE_DEVICE, LOCATION_MODE_GEOCODING].includes(mode);
  if (!modeStatedProperly) throw new Error(`use either ${LOCATION_MODE_DEVICE} or ${LOCATION_MODE_GEOCODING} to state the location mode`);
  return { type: SET_LOCATION_MODE, mode };
}

export function useDevicePosition() {
  return async (dispatch) => {
    let coords;
    try {
      const position = await getGeoLocation();
      if (!position.coords) throw new Error('Getting device geolocation failed');
      // eslint-disable-next-line prefer-destructuring
      coords = position.coords;
      dispatch(
        setDeviceLocation({ lng: coords.longitude, lat: coords.latitude })
      );
      dispatch(setLocationMode(LOCATION_MODE_DEVICE));
    } catch (err) {
      dispatch(addError('Standortbestimmung fehlgeschlagen. Gib die Adresse bitte ein oder verschiebe die Karte zu Deinem Standort.'));
    }
  };
}

export function submitReport() {
  return async (dispatch, getState) => {
    dispatch({ type: SUBMIT_REPORT });
    const reportPayload = marshallNewReportObjectFurSubmit(getState().ReportsState.newReport);
    const submitReportResponse = await apiSubmitReport(reportPayload);
    if (!submitReportResponse.error) {
      dispatch({ type: SUBMIT_REPORT_SUCCESS });
    } else {
      dispatch({ type: SUBMIT_REPORT_ERROR, error: 'Beim übermitteln der Meldung ist etwas schiefgelaufen.' });
    }
  };
}

export default function ReportsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_REPORT_DATA:
      return { ...state, reports: action.payload };
    case RESET_DIALOG_STATE:
      // set to default state, except for reports to not be forced to fetch data again
      return { ...initialState, reports: state.reports };
    case SET_DEVICE_LOCATION:
      return { ...state, deviceLocation: action.payload };
    case GEOCODE_DONE:
      return { ...state, geocodeResult: action.payload };
    case INVALIDATE_POSITION:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          valid: false
        }
      };
    case VALIDATE_POSITION:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          valid: true
        }
      };
    case REVERSE_GEOCODE_DONE:
      return { ...state, reverseGeocodeResult: action.payload };
    case SET_TEMP_LOCATION_LNG_LAT:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          lngLat: action.payload
        }
      };
    case SET_TEMP_LOCATION_ADDRESS:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          address: action.address
        }
      };
    case PIN_LOCATION:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          pinned: true
        }
      };
    case CONFIRM_LOCATION:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          location: {
            address: state.tempLocation.address,
            lngLat: state.tempLocation.lngLat
          }
        }
      };
    case SET_LOCATION_MODE:
      return { ...state, locationMode: action.mode };
    case GEOCODE_FAIL:
    case REVERSE_GEOCODE_FAIL:
      return {
        ...state,
        error: {
          message: action.payload.geocodeError
        }
      };
    // generic Error handlers
    case ADD_ERROR:
      return {
        ...state,
        error: {
          message: action.error
        }
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: {
          message: null
        }
      };
    case SET_BIKESTAND_NEEDS:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          what: {
            ...state.newReport.what,
            bikestands: action.payload
          }
        }
      };
    case SET_ADDITIONAL_DATA:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          what: {
            ...state.newReport.what,
            additionalInfo: action.payload
          }
        }
      };
    case SUBMIT_REPORT:
      return { ...state, submitting: true };
    case SUBMIT_REPORT_SUCCESS:
      return { ...state, submitting: false, submitted: true };
    case SUBMIT_REPORT_ERROR:
      return {
        ...state,
        submitting: false,
        error: {
          message: action.error
        }
      };
    case STEP_BACK_DIALOG:
      return dotProp.delete(state, action.stateNodeToUnset);
    case SET_SELECTED_REPORT:
      return {
        ...state, selectedReport: state.reports.find(r => r.id === action.id) || null
      };
    case UNSET_SELECTED_REPORT:
      return {
        ...state, selectedReport: null
      }
    default:
      return { ...state };
  }
}

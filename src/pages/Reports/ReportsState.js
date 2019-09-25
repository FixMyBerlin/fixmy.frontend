// TODO: add unit tests for reducer
// TODO: keep and submit address elements (street, number, ..) in seperate attributes
// TODO: switch the reverse geocoder
// TODO: heavily reduce boiler plate https://redux.js.org/recipes/reducing-boilerplate
// TODO: use immutability helpers like https://github.com/mweststrate/immer
// TODO: split uo reducer into subreducers based on the structure of the newReport object
import booleanWithin from '@turf/boolean-within';
import reverseGeocode from '~/services/reverseGeocode';
import { getGeoLocation } from '~/pages/Map/map-utils';
import { apiFetchReports, apiSubmitReport, marshallNewReportObjectFurSubmit } from '~/pages/Reports/apiservice';

const RESET_DIALOG_STATE = 'Reports/OverviewMapState/RESET_DIALOG_STATE';
const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_LOCATION_MODE = 'Reports/ReportsDialogState/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'DEVICE'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'GEOCODING'; // not an action type, keeping this here to prevent typos
const SET_DEVICE_LOCATION = 'Reports/ReportsDialogState/SET_DEVICE_LOCATION';
const GEOCODE_DONE = 'Reports/ReportsDialogState/GEOCODE_SUCCESS';
const VALIDATE_POSITION = 'Reports/ReportsDialogState/VALIDATE_POSITION';
const INVALIDATE_POSITION = 'Reports/ReportsDialogState/INVALIDATE_POSITION';
const REVERSE_GEOCODE_DONE = 'Reports/ReportsDialogState/REVERSE_GEOCODE_SUCCESS';
const REVERSE_GEOCODE_FAIL = 'Reports/ReportsDialogState/REVERSE_GEOCODE_FAIL';
const SET_TEMP_LOCATION_LNG_LAT = 'Reports/ReportsDialogState/SET_TEMP_LOCATION_LNG_LAT';
const SET_TEMP_LOCATION_ADDRESS = 'Reports/ReportsDialogState/SET_TEMP_LOCATION_ADDRESS';
const CONFIRM_LOCATION = 'Reports/ReportsDialogState/CONFIRM_LOCATION';
const ADD_ERROR = 'Reports/ReportsDialogState/ADD_ERROR'; // generic error
const REMOVE_ERROR = 'Reports/ReportsDialogState/REMOVE_ERROR';
const SET_BIKESTAND_COUNT = 'Reports/ReportsDialogState/SET_BIKESTAND_COUNT';
const SET_ADDITIONAL_DATA = 'Reports/ReportsDialogState/SET_ADDITIONAL_DATA';
const SET_FEE_ACCEPTABLE = 'Reports/ReportsDialogState/SET_FEE_ACCEPTABLE';
const SUBMIT_REPORT = 'Reports/ReportsDialogState/SUBMIT_REPORT';
const SUBMIT_REPORT_SUCCESS = 'Reports/ReportsDialogState/SUBMIT_REPORT_SUCCESS';
const SUBMIT_REPORT_ERROR = 'Reports/ReportsDialogState/SUBMIT_REPORT_ERROR';
const SET_SELECTED_REPORT = 'Reports/ReportsDialogState/SET_SELECTED_REPORT';
const SET_SELECTED_REPORT_POS = 'Reports/ReportsDialogState/SET_SELECTED_REPORT_POS';
const UNSET_SELECTED_REPORT = 'Reports/ReportsDialogState/UNSET_SELECTED_REPORT';

const initialState = {
  reports: [], // existing reports, fetched via API
  selectedReport: null, // currently displayed report item (e.g. on overview map)
  selectedReportPosition: { x: 0, y: 0 }, // projected position of report popup
  newReport: {}, // the new report object, populated while stepping through the dialog
  error: {
    message: null
  }, // holds an error message to which displaying components can bind to
  locationMode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  deviceLocation: null, // {lng, lat}
  geocodeResult: null, // { coords, address }
  reverseGeocodeResult: null, // An address,
  tempLocation: null, // holds lngLat, address, a "pinned" property (which indicates the location as submittable) and a "valid" property
  submitting: false,
  submitted: false
};

// FIXME: write tests!

export function resetDialogState() {
  return { type: RESET_DIALOG_STATE };
}

export function setTempLocationLngLat({ lng, lat }) {
  return { type: SET_TEMP_LOCATION_LNG_LAT, payload: { lng, lat } };
}

export function setTempLocationAddress(address) {
  return { type: SET_TEMP_LOCATION_ADDRESS, address };
}

export function confirmLocation() {
  return { type: CONFIRM_LOCATION };
}

export function setDeviceLocation({ lng, lat }) {
  return { type: SET_DEVICE_LOCATION, payload: { lng, lat } };
}

export function handleGeocodeSuccess({ coords, address }) {
  return { type: GEOCODE_DONE, payload: { coords, address } };
}

// TODO: unify syntax used here
export const addError = error => ({
  type: ADD_ERROR,
  error
});

export const removeError = () => ({
  type: REMOVE_ERROR
});

export const setBikestandCount = amount => ({
  type: SET_BIKESTAND_COUNT,
  payload: amount
});

export const setAdditionalData = formData => ({
  type: SET_ADDITIONAL_DATA,
  payload: formData
});

export const setFeeAcceptable = bool => ({
  type: SET_FEE_ACCEPTABLE,
  bool
});

async function loadReportsDataInner(dispatch) {
  try {
    const reportData = await apiFetchReports();
    dispatch({ type: SET_REPORT_DATA, payload: reportData });
  } catch (e) {
    console.error(`Failed to fetch reports: ${e}`);
    dispatch(addError('Meldungen konnten nicht geladen werden'));
  }
}

export function loadReportsData() {
  return async (dispatch) => {
    await loadReportsDataInner(dispatch);
  };
}

export function setSelectedReport(selectedReport) {
  return async (dispatch, getState) => {
    const { reports } = getState().ReportsState;

    if (!reports.length) {
      await loadReportsDataInner(dispatch);
    }

    dispatch({ type: SET_SELECTED_REPORT, selectedReport });
  };
}

export function setSelectedReportPosition(selectedReportPosition) {
  return { type: SET_SELECTED_REPORT_POS, selectedReportPosition };
}

export function validateCoordinates(polygonGeoJson, { lng, lat }) {
  return async (dispatch) => {
    const pointFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    };
    if (booleanWithin(pointFeature, polygonGeoJson)) {
      dispatch({
        type: VALIDATE_POSITION
      });
      return true;
    }
    dispatch({
      type: INVALIDATE_POSITION
    });
    return false;
  };
}

export function reverseGeocodeCoordinates({ lat, lng }) {
  return async (dispatch) => {
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
      ({ coords } = position);
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
    let submittedReport;
    try {
      submittedReport = await apiSubmitReport(reportPayload);
      dispatch({ type: SUBMIT_REPORT_SUCCESS, submittedReport });
    } catch (e) {
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
      return {
        ...state,
        geocodeResult: action.payload.coords,
        tempLocation: {
          ...state.tempLocation,
          address: action.payload.address
        }
      };
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
    case CONFIRM_LOCATION:
      return {
        ...state,
        reverseGeocodeResult: null,
        deviceLocation: null,
        newReport: {
          location: {
            address: state.tempLocation.address,
            lngLat: { ...state.tempLocation.lngLat }
          }
        }
      };
    case SET_LOCATION_MODE:
      return { ...state, locationMode: action.mode };
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
    case SET_BIKESTAND_COUNT:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          what: {
            ...state.newReport.what,
            bikestands: {
              ...(state.newReport.what && state.newReport.what.bikestands),
              number: action.payload
            }
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
      case SET_FEE_ACCEPTABLE:
          return {
            ...state,
            newReport: {
              ...state.newReport,
              what: {
                ...state.newReport.what,
                bikestands: {
                    ...state.newReport.what.bikestands,
                    feeAcceptable: action.bool
                }
              }
            }
          };
    case SUBMIT_REPORT:
      return { ...state, submitting: true };
    case SUBMIT_REPORT_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        newReport: {
          ...state.newReport,
          id: action.submittedReport.id
        },
        reports: [...state.reports, {
          ...action.submittedReport
        }]
      };
    case SUBMIT_REPORT_ERROR:
      return {
        ...state,
        submitting: false,
        error: {
          message: action.error
        }
      };
    case SET_SELECTED_REPORT:
      return {
        ...state, selectedReport: action.selectedReport || null
      };
    case SET_SELECTED_REPORT_POS:
      return {
        ...state, selectedReportPosition: action.selectedReportPosition || { x: 0, y: 0 }
      };
    case UNSET_SELECTED_REPORT:
      return {
        ...state, selectedReport: null
      };
    default:
      return { ...state };
  }
}

/* eslint-disable  no-multi-spaces */
import booleanWithin from '@turf/boolean-within';

import reverseGeocode from '~/services/reverseGeocode';
import { getGeoLocation } from '~/pages/Map/map-utils';
import { apiSubmitReport, marshallNewReportObjectFurSubmit } from '~/pages/Reports/apiservice';

// action constants

const types = {};

types.RESET_DIALOG_STATE = 'Reports/SubmitReport/RESET_DIALOG_STATE';
types.SET_LOCATION_MODE = 'Reports/SubmitReport/SET_LOCATION_MODE';
types.SET_DEVICE_LOCATION = 'Reports/SubmitReport/SET_DEVICE_LOCATION';
types.GEOCODE_DONE = 'Reports/SubmitReport/GEOCODE_SUCCESS';
types.VALIDATE_POSITION = 'Reports/SubmitReport/VALIDATE_POSITION';
types.INVALIDATE_POSITION = 'Reports/SubmitReport/INVALIDATE_POSITION';
types.REVERSE_GEOCODE_DONE = 'Reports/SubmitReport/REVERSE_GEOCODE_SUCCESS';
types.REVERSE_GEOCODE_FAIL = 'Reports/SubmitReport/REVERSE_GEOCODE_FAIL';
types.SET_TEMP_LOCATION_COORDS = 'Reports/SubmitReport/SET_TEMP_LOCATION_COORDS';
types.SET_TEMP_LOCATION_ADDRESS = 'Reports/SubmitReport/SET_TEMP_LOCATION_ADDRESS';
types.CONFIRM_LOCATION = 'Reports/SubmitReport/CONFIRM_LOCATION';
types.SET_BIKESTAND_NEEDS = 'Reports/SubmitReport/SET_BIKESTAND_NEEDS';
types.SET_ADDITIONAL_DATA = 'Reports/SubmitReport/SET_ADDITIONAL_DATA';
types.SET_DAILY_RENT = 'Reports/SubmitReport/SET_DAILY_RENT';
types.SUBMIT_REPORT = 'Reports/SubmitReport/SUBMIT_REPORT';
types.SUBMIT_REPORT_SUCCESS = 'Reports/SubmitReport/SUBMIT_REPORT_SUCCESS';
types.SUBMIT_REPORT_ERROR = 'Reports/SubmitReport/SUBMIT_REPORT_ERROR';

// other constants

const LOCATION_MODE_DEVICE = 'DEVICE'; // not an action type, keeping this here to prevent typos
const LOCATION_MODE_GEOCODING = 'GEOCODING';

// action creators

const actions = {};

actions.resetDialogState = () => ({
  type: types.RESET_DIALOG_STATE
});

actions.setLocationMode = mode => ({
  type: types.SET_LOCATION_MODE,
  mode
});

// TODO: adapt consumption, used to be setTempLocationLngLat
actions.setTempLocationCoords = ({ lng, lat }) => ({
  type: types.SET_TEMP_LOCATION_COORDS,
  payload: { lng, lat }
});

actions.setTempLocationAddress = address => ({
  type: types.SET_TEMP_LOCATION_ADDRESS,
  address
});

actions.confirmLocation = () => ({
  type: types.CONFIRM_LOCATION
});

actions.setDeviceLocation = ({ lng, lat }) => ({
  type: types.SET_DEVICE_LOCATION,
  payload: { lng, lat }
});

actions.handleGeocodeSuccess = ({ coords, address }) => ({
  type: types.GEOCODE_DONE,
  payload: { coords, address }
});

types.setBikestandNeeds = formData => ({
  type: types.SET_BIKESTAND_NEEDS,
  payload: formData
});

types.setAdditionalData = formData => ({
  type: types.SET_ADDITIONAL_DATA,
  payload: formData
});

types.setDailyRent = dailyRent => ({
  type: types.SET_DAILY_RENT,
  dailyRent
});

// thunks

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
        type: types.VALIDATE_POSITION
      });
      return true;
    }
    dispatch({
      type: types.INVALIDATE_POSITION
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
        type: types.REVERSE_GEOCODE_FAIL,
        payload: { geocodeError: 'Fehler beim Auflösen der Koordinaten in eine Adresse' }
      });
    }
    if (!result) {
      return dispatch({
        type: types.REVERSE_GEOCODE_FAIL,
        payload: { geocodeError: 'Die Geokoordinaten konnten in keine Adresse aufgelöst werden' }
      });
    }
    dispatch({ type: types.REVERSE_GEOCODE_DONE, payload: { result } });
    dispatch({ type: types.SET_TEMP_LOCATION_ADDRESS, address: result });
  };
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
    dispatch({ type: types.SUBMIT_REPORT });
    const reportPayload = marshallNewReportObjectFurSubmit(getState().ReportsState.newReport);
    let submittedReport;
    try {
      submittedReport = await apiSubmitReport(reportPayload);
      dispatch({ type: types.SUBMIT_REPORT_SUCCESS, submittedReport });
    } catch (e) {
      dispatch({ type: types.SUBMIT_REPORT_ERROR, error: 'Beim übermitteln der Meldung ist etwas schiefgelaufen.' });
    }
  };
}

// reducer

const initialState = {
  locationMode: null,   // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  deviceLocation: null, // { lng, lat}
  geocodeResult: null,  // { coords, address}
  reverseGeocodeResult: null,
  tempLocation: {       // fostered when the user searches a suitable location for a report. when confirmed, props get attached to the reportItem
    lngLat: null,         // { lng, lat}
    address: '',           // reverse-geocoding result
    pinned: false,        // true when the user has confirmed the location he set using the map
    valid: true           // set to false when a location is outside the area of interest
  },
  submitStatus: {
    submitting: false,  // set true during submission of the report item to the api
    submitted: false   // set true on submit success
  },
  reportItem: {}        // instance of json schema agreed upon, see newReport-jsonSchema.json
};

// TODO: the newReport item's structure has been adapted to the backend-model. remove marshalling before submit

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_DIALOG_STATE:
      //  keep locationMode in order to display the map after user clicked "Ort ändern"
      return { ...initialState, locationMode: state.locationMode };
    case types.SET_DEVICE_LOCATION:
      return { ...state, deviceLocation: action.payload };
    case types.GEOCODE_DONE:
      return {
        ...state,
        geocodeResult: action.payload.coords,
        tempLocation: {
          ...state.tempLocation,
          address: action.payload.address
        }
      };
    case types.INVALIDATE_POSITION:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          valid: false
        }
      };
    case types.VALIDATE_POSITION:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          valid: true
        }
      };
    case types.REVERSE_GEOCODE_DONE:
      return { ...state, reverseGeocodeResult: action.payload };
    case types.SET_TEMP_LOCATION_COORDS:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          lngLat: action.payload
        }
      };
    case types.SET_TEMP_LOCATION_ADDRESS:
      return {
        ...state,
        tempLocation: {
          ...state.tempLocation,
          address: action.address
        }
      };
    case types.CONFIRM_LOCATION:
      return {
        ...state,
        reverseGeocodeResult: null, // TODO: move to own action
        deviceLocation: null,
        newReport: {
          address: state.tempLocation.address,
          geometry: {
            type: 'Point',
            coordinates: [
              state.tempLocation.lngLat.lng,
              state.tempLocation.lngLat.lat
            ]
          }
        }
      };
    case types.SET_LOCATION_MODE:
      return { ...state, locationMode: action.mode };
    case types.REVERSE_GEOCODE_FAIL:
      return {
        ...state,
        error: {
          message: action.payload.geocodeError
        }
      };

    case types.SET_BIKESTAND_NEEDS:
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
    case types.SET_ADDITIONAL_DATA:
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
    case types.SET_DAILY_RENT:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          what: {
            ...state.newReport.what,
            bikestands: {
              ...state.newReport.what.bikestands,
              paymentReservesBikePark: action.dailyRent
            }
          }
        }
      };
    case types.SUBMIT_REPORT:
      return { ...state, submitting: true };
    case types.SUBMIT_REPORT_SUCCESS:
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
    default:
      return { ...state };
  }
}

export {
  actions,
  types,
  LOCATION_MODE_DEVICE,
  LOCATION_MODE_GEOCODING,
  initialState
};

export default reducer;

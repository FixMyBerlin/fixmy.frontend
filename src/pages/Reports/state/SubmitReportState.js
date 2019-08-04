import { dispatch } from 'redux';
import reverseGeocode from '~/services/reverseGeocode';
import { getGeoLocation } from '~/pages/Map/map-utils';
import { apiFetchReports, apiSubmitReport, marshallNewReportObjectFurSubmit } from '~/pages/Reports/apiservice';
import booleanWithin from '@turf/boolean-within';

// action constants

const RESET_DIALOG_STATE = 'Reports/SubmitReport/RESET_DIALOG_STATE';
const SET_LOCATION_MODE = 'Reports/SubmitReport/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'DEVICE'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'GEOCODING'; // not an action type, keeping this here to prevent typos
const SET_DEVICE_LOCATION = 'Reports/SubmitReport/SET_DEVICE_LOCATION';
const GEOCODE_DONE = 'Reports/SubmitReport/GEOCODE_SUCCESS';
const VALIDATE_POSITION = 'Reports/SubmitReport/VALIDATE_POSITION';
const INVALIDATE_POSITION = 'Reports/SubmitReport/INVALIDATE_POSITION';
const REVERSE_GEOCODE_DONE = 'Reports/SubmitReport/REVERSE_GEOCODE_SUCCESS';
const REVERSE_GEOCODE_FAIL = 'Reports/SubmitReport/REVERSE_GEOCODE_FAIL';
const SET_TEMP_LOCATION_LNG_LAT = 'Reports/SubmitReport/SET_TEMP_LOCATION_LNG_LAT';
const SET_TEMP_LOCATION_ADDRESS = 'Reports/SubmitReport/SET_TEMP_LOCATION_ADDRESS';
const CONFIRM_LOCATION = 'Reports/SubmitReport/CONFIRM_LOCATION';
const SET_BIKESTAND_NEEDS = 'Reports/SubmitReport/SET_BIKESTAND_NEEDS';
const SET_ADDITIONAL_DATA = 'Reports/SubmitReport/SET_ADDITIONAL_DATA';
const SET_DAILY_RENT = 'Reports/SubmitReport/SET_DAILY_RENT';
const SUBMIT_REPORT = 'Reports/SubmitReport/SUBMIT_REPORT';
const SUBMIT_REPORT_SUCCESS = 'Reports/SubmitReport/SUBMIT_REPORT_SUCCESS';
const SUBMIT_REPORT_ERROR = 'Reports/SubmitReport/SUBMIT_REPORT_ERROR';

// other constants 

export const BIKESTAND_PLACEMENT_SIDEWALK = 'SIDEWALK';
export const BIKESTAND_PLACEMENT_STREET = 'STREET';

// action creators
export function resetDialogState() {
  return { type: RESET_DIALOG_STATE };
}

export function setLocationMode(mode) {
  return { type: SET_LOCATION_MODE, mode };
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



export function removeError() {
  return { type: REMOVE_ERROR };
}

export const setBikestandNeeds = formData => ({
  type: SET_BIKESTAND_NEEDS,
  payload: formData
});

export const setAdditionalData = formData => ({
  type: SET_ADDITIONAL_DATA,
  payload: formData
});

export const setDailyRent = dailyRent => ({
  type: SET_DAILY_RENT,
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
    let submittedReport;
    try {
      submittedReport = await apiSubmitReport(reportPayload);
      dispatch({ type: SUBMIT_REPORT_SUCCESS, submittedReport });
    } catch (e) {
      dispatch({ type: SUBMIT_REPORT_ERROR, error: 'Beim übermitteln der Meldung ist etwas schiefgelaufen.' });
    }
  };
}

// reducer

const initialState = {
  locationMode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
  deviceLocation: null, // {lng, lat}
  geocodeResult: null, // { coords, address }
  location: {
    lngLat: null,
    adress: '',
    pinned: false,
    valid
  },
  submitStatus: {
    submitting: false,
    submitted: false,
  },
  reportItem: {
    address: "Alexandrinenstraße 118, 10969 Berlin",
    description: "",
    details: {
      fee: 2,
      number: 18,
      subject: "BIKE_STANDS",
      placement: "SIDEWALK"
    },
    geometry: {
      type: "Point",
      coordinates: [13.40061834673159, 52.50075090458924]
    },
    id: 2,
    photo: {
      copyright: null,
      src: "https://fmb-aws-bucket.s3.amazonaws.com/photos/4598b3b2-3c4.jpg"
    }
  }
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case RESET_DIALOG_STATE:
      //  keep locationMode in order to display the map after user clicked "Ort ändern"
      return { ...initialState, locationMode: state.locationMode };
    case SET_REPORT_DATA:
      return { ...state, reports: action.payload };
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
    case SET_DAILY_RENT:
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
    default:
      return { ...state };
  }
}
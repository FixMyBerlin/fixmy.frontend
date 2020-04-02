/* eslint-disable  no-multi-spaces */
import booleanWithin from '@turf/boolean-within';

import reverseGeocode from '~/services/reverseGeocode';
import { getGeoLocation } from '~/pages/Map/map-utils'; // TODO: handle eslint warning regarding dependency circle
import {
  apiSubmitReport,
  marshallNewReportObjectFurSubmit
} from '~/pages/Reports/apiservice';
import { actions as errorStateActions } from './ErrorState';
import initialState from './initialState';
import logger from '~/utils/logger';

// action constants

const types = {};

const PREFIX = 'Reports/SubmitReportState/';
types.RESET_DIALOG_STATE = `${PREFIX}RESET_DIALOG_STATE`;
types.SET_LOCATION_MODE = `${PREFIX}SET_LOCATION_MODE`;
types.SET_LOCATION_MODE_GEOCODING = `${PREFIX}SET_LOCATION_MODE_GEOCODING`;
types.SET_LOCATION_MODE_DEVICE = `${PREFIX}SET_LOCATION_MODE_DEVICE`;
types.SET_DEVICE_LOCATION = `${PREFIX}SET_DEVICE_LOCATION`;
types.GEOCODE_COMPLETE = `${PREFIX}GEOCODE_COMPLETE`;
types.UNSET_AUTOMATED_POSITIONING = `${PREFIX}UNSET_AUTOMATED_POSITIONING`;
types.VALIDATE_POSITION = `${PREFIX}VALIDATE_POSITION`;
types.INVALIDATE_POSITION = `${PREFIX}INVALIDATE_POSITION`;
types.REVERSE_GEOCODE_COMPLETE = `${PREFIX}REVERSE_GEOCODE_COMPLETE`;
types.SET_TEMP_LOCATION_COORDS = `${PREFIX}SET_TEMP_LOCATION_COORDS`;
types.SET_TEMP_LOCATION_ADDRESS = `${PREFIX}SET_TEMP_LOCATION_ADDRESS`;
types.CONFIRM_LOCATION = `${PREFIX}CONFIRM_LOCATION`;
types.SET_BIKESTAND_COUNT = `${PREFIX}SET_BIKESTAND_COUNT`;
types.SET_ADDITIONAL_DATA = `${PREFIX}SET_ADDITIONAL_DATA`;
types.SET_FEE_ACCEPTABLE = `${PREFIX}SET_FEE_ACCEPTABLE`;
types.SUBMIT_REPORT_PENDING = `${PREFIX}SUBMIT_REPORT_PENDING`;
types.SUBMIT_REPORT_COMPLETE = `${PREFIX}SUBMIT_REPORT_COMPLETE`;
types.SUBMIT_REPORT_ERROR = `${PREFIX}SUBMIT_REPORT_ERROR`;

// other constants

export const LOCATION_MODE_DEVICE = 'DEVICE'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'GEOCODING';

// action creators

const actions = {};

actions.resetDialogState = () => ({
  type: types.RESET_DIALOG_STATE
});

actions.setLocationMode = (mode) => ({
  type: types.SET_LOCATION_MODE,
  mode
});

actions.setLocationModeGeocoding = () => ({
  type: types.SET_LOCATION_MODE,
  mode: LOCATION_MODE_GEOCODING
});

actions.setLocationModeDevice = () => ({
  type: types.SET_LOCATION_MODE,
  mode: LOCATION_MODE_DEVICE
});

actions.setTempLocationCoords = ({ lng, lat }) => ({
  type: types.SET_TEMP_LOCATION_COORDS,
  payload: { lng, lat }
});

actions.setTempLocationAddress = (address) => ({
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
  type: types.GEOCODE_COMPLETE,
  payload: { coords, address }
});

actions.unsetAutomatedPositioning = () => ({
  type: types.UNSET_AUTOMATED_POSITIONING
});

actions.setBikestandCount = (amount) => ({
  type: types.SET_BIKESTAND_COUNT,
  payload: amount
});

actions.setAdditionalData = ({ photo, description }) => ({
  type: types.SET_ADDITIONAL_DATA,
  payload: { photo, description }
});

actions.setFeeAcceptable = (isFeeAcceptable) => ({
  type: types.SET_FEE_ACCEPTABLE,
  isFeeAcceptable
});

// thunks

actions.validateCoordinates = (polygonGeoJson, { lng, lat }) => async (
  dispatch
) => {
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

actions.reverseGeocodeCoordinates = ({ lat, lng }) => async (dispatch) => {
  let result;
  let errorMsg;
  try {
    result = await reverseGeocode({ lat, lng });
  } catch (e) {
    errorMsg = 'Fehler beim Auflösen der Koordinaten in eine Adresse';
    logger(e);
  }
  if (!result) {
    errorMsg = 'Die Geokoordinaten konnten in keine Adresse aufgelöst werden';
  }

  if (errorMsg) {
    dispatch(
      errorStateActions.addError({
        message: errorMsg
      })
    );
  } else {
    dispatch({ type: types.REVERSE_GEOCODE_COMPLETE, payload: { result } });
    dispatch({ type: types.SET_TEMP_LOCATION_ADDRESS, address: result });
  }
};

actions.useDevicePosition = () => async (dispatch) => {
  let coords;
  try {
    const position = await getGeoLocation();
    if (!position.coords) throw new Error('Getting device geolocation failed');
    // eslint-disable-next-line prefer-destructuring
    coords = position.coords;
    dispatch(
      actions.setDeviceLocation({ lng: coords.longitude, lat: coords.latitude })
    );
    dispatch(actions.setLocationModeDevice());
  } catch (err) {
    const errMsg =
      'Standortbestimmung fehlgeschlagen. ' +
      'Geben Sie die Adresse bitte ein oder verschieben Sie die Karte zu Ihrem Standort.';
    dispatch(
      errorStateActions.addError({
        message: errMsg
      })
    );
    throw err;
  }
};

actions.submitReport = () => async (dispatch, getState) => {
  dispatch({ type: types.SUBMIT_REPORT_PENDING });

  try {
    const reportPayload = marshallNewReportObjectFurSubmit(
      getState().ReportsState.SubmitReportState.newReport
    );
    const submittedReport = await apiSubmitReport(reportPayload);
    dispatch({ type: types.SUBMIT_REPORT_COMPLETE, submittedReport });
  } catch (e) {
    const errMsg = 'Beim Übermitteln der Meldung ist etwas schiefgelaufen.';
    dispatch({ type: types.SUBMIT_REPORT_ERROR }); // update UI
    dispatch(
      errorStateActions.addError({
        // show ErrorMessage using the generic component
        message: errMsg
      })
    );
    throw e;
  }
};

// reducer

function reducer(state = initialState.SubmitReportState, action = {}) {
  switch (action.type) {
    case types.RESET_DIALOG_STATE:
      //  keep locationMode in order to display the map after user clicked "Ort ändern"
      return {
        ...initialState.SubmitReportState,
        locationMode: state.locationMode
      };
    case types.SET_DEVICE_LOCATION:
      return {
        ...state,
        deviceLocation: action.payload,
        geocodeResult: null
      };
    case types.GEOCODE_COMPLETE:
      return {
        ...state,
        geocodeResult: action.payload.coords,
        tempLocation: {
          ...state.tempLocation,
          address: action.payload.address,
          lngLat: action.payload.coords
        },
        deviceLocation: null
      };
    case types.UNSET_AUTOMATED_POSITIONING:
      return {
        ...state,
        geocodeResult: null,
        deviceLocation: null
      }
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
    case types.REVERSE_GEOCODE_COMPLETE:
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
        reverseGeocodeResult: null,
        deviceLocation: null,
        newReport: {
          ...state.newReport,
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
    case types.SET_BIKESTAND_COUNT:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          details: {
            ...state.newReport.details,
            number: action.payload
          }
        }
      };
    case types.SET_FEE_ACCEPTABLE:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          details: {
            ...state.newReport.details,
            fee_acceptable: action.isFeeAcceptable
          }
        }
      };
    case types.SET_ADDITIONAL_DATA:
      return {
        ...state,
        newReport: {
          ...state.newReport,
          ...action.payload
        }
      };
    case types.SUBMIT_REPORT_PENDING:
      return {
        ...state,
        apiRequestStatus: {
          ...state.apiRequestStatus,
          submitting: true
        }
      };
    case types.SUBMIT_REPORT_COMPLETE:
      return {
        ...state,
        apiRequestStatus: {
          submitting: false,
          submitted: true
        },
        newReport: {
          ...state.newReport,
          id: action.submittedReport.id
        }
      };
    case types.SUBMIT_REPORT_ERROR:
      return {
        ...state,
        apiRequestStatus: {
          submitting: false
        }
      };
    default:
      return state;
  }
}

// selectors

const selectors = {};

selectors.getLocationIsModeGeocoding = (state) =>
  state.locationMode === LOCATION_MODE_GEOCODING;
selectors.getAlreadyPicketLocation = (state) =>
  state.newReport?.geometry.coordinates;

export { actions, types, selectors, initialState };

export default reducer;

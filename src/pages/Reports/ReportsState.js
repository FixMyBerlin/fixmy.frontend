import ky from 'ky';

const SET_REPORT_DATA = 'Reports/OverviewMapState/SET_REPORT_DATA';
const SET_LOCATION = 'Reports/ReportsDialogState/SET_LONG_LAT';
const SET_LOCATION_MODE = 'Reports/ReportsDialogState/SET_LOCATION_MODE';
export const LOCATION_MODE_DEVICE = 'device'; // not an action type, keeping this here to prevent typos
export const LOCATION_MODE_GEOCODING = 'geocoding'; // not an action type, keeping this here to prevent typos

const initialState = {
  reports: [], // existing reports, fetched via API
  newReport: null, // the new report object, populated while stepping through the dialog
  error: null // holds an error message to which displaying components can bind to
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

export function setLocation({ lngLat, address }) {
  return { type: SET_LOCATION, payload: { lngLat, address } };
}

export function setLocationMode(mode) {
  return { type: SET_LOCATION_MODE, mode };
}

export default function ReportsReducer(state = initialState, action = {}) {
  switch (action.type) {
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
    default:
      return { ...state };
  }
}

const defaultState = {
  ErrorState: {
    message: null,
    proceedMessage: null,
    proceedFunc: null,
  },
  OverviewMapState: {
    reports: [], // report items fetched from api
    reportFetchState: 'waiting', // not using constant to avoid dependency cycle
    selectedReport: null, // an item of the reports list
    selectedReportPosition: { x: 0, y: 0 }, // projected position of report popup,
    zoomIn: false, // wether or not the map zooms to a marker
  },
  SubmitReportState: {
    locationMode: null, // either LOCATION_MODE_DEVICE or LOCATION_MODE_GEOCODING
    deviceLocation: null, // { lng, lat}
    geocodeResult: null, // { coords, address}
    reverseGeocodeResult: null,
    tempLocation: {
      // fostered when the user searches a suitable location for a report. when confirmed, props get attached to the newReport item
      lngLat: null, // { lng, lat}
      address: '', // reverse-geocoding result
      pinned: false, // true when the user has confirmed the location he set using the map
      valid: true, // set to false when a location is outside the area of interest
    },
    apiRequestStatus: {
      submitting: false, // set true during submission of the report item to the api
      submitted: false, // set true on submit success
    },
    newReport: {
      // instance of json schema agreed upon
      address: null, // address string
      geometry: {}, // GeoJson point feature
      details: {
        subject: 'BIKE_STANDS',
        number: null, // number of bikestands
        fee_acceptable: null, // if the user would pay for managed parking
      },
      photo: null, // jpeg in base64
      description: null, // textual description of the problem / potential site
    },
  },
};

export default (window.Cypress && window.initialState?.ReportsState) ||
  defaultState;

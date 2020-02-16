import globalConfig from '~/config';

const reportsConfig = {
  apiRoute: '/reports',
  dialog: {
    imageResizeOptions: {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.9
    }
  },
  overviewMap: {
    style: 'mapbox://styles/hejco/cjpnt0cc41ipy2rlpu19jgt7a',
    bounds: [
      [13.3651, 52.4658],
      [13.4945, 52.5479]
    ],
    maxBounds: [
      [13.2, 52.4158],
      [13.6, 52.5979]
    ]
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/Fhain-Xberg-trimmed.json',
    outofBoundaryText:
      'Diese Adresse liegt außerhalb Friedrichshain-Kreuzbergs',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3
    }
  }
};

export default {
  ...globalConfig,
  reports: reportsConfig
};

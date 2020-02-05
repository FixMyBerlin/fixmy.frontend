export default {
  overviewMap: {
    style: 'mapbox://styles/hejco/ck6969iav0iw11io0m8ykq1de',
    bounds: [
      [7.08, 50.7],
      [7.14, 50.8]
    ],
    maxBounds: [
      [7.0, 49.0],
      [7.3, 52]
    ]
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/Bonn.json',
    outofBoundaryText: 'Diese Adresse liegt außerhalb Bonns',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3
    }
  },
  title: 'Fahrradbügel für Bonn',
  region: 'Bonn'
};

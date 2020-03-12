export default {
  overviewMap: {
    style: 'mapbox://styles/hejco/ck6969iav0iw11io0m8ykq1de',
    bounds: [
      [6.05, 50.71],
      [6.11, 50.82]
    ],
    maxBounds: [
      [5.95, 49.0],
      [6.2, 52]
    ]
  },
  locateMeMap: {
    zoomOnGeocodedLocation: 15.5,
    boundaryGeodataUrl: '/data/Bonn.json',
    outofBoundaryText: 'Diese Adresse liegt außerhalb Aachens',
    reverseGeocoderUrl:
      'https://api.mapbox.com/geocoding/v5/mapbox.places/{long},{lat}.json',
    paddingInDegree: 0.1,
    geocoder: {
      debounceTime: 1000,
      searchStringMinLength: 3
    }
  },
  title: 'Fahrradbügel für Aachen',
  region: 'Aachen'
};

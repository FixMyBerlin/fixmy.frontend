// WebGL and other features used by MapboxGL are not available in the test
// environment so mapbox-gl is mocked
//
// https://github.com/mapbox/mapbox-gl-js/issues/3436#issuecomment-485535598
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

export default undefined;

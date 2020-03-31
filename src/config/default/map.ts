const MapboxStyles = {
  'FMB-release-3': 'mapbox://styles/hejco/cjiolwa78299h2sq8age91h2h',
  'FMB-release-4': 'mapbox://styles/hejco/ck0nzclbk0ey01ct9ilwefpzc',
  'FMB-release-5': 'mapbox://styles/hejco/ck37eiywp0un71cpd01dutt7r',
  'FMB-release-6': 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9'
};

export default {
  accessToken:
    'pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q',
  style: MapboxStyles['FMB-release-6'],
  view: {
    zoom: 12,
    bearing: 0,
    pitch: 0,
    center: [13.415669, 52.513219],
    show3dBuildings: false,
    animate: false,
    dim: false
  },
  layers: {
    projects: {
      center: 'fmb-projects-center',
      side0: 'fmb-projects-side-0',
      side1: 'fmb-projects-side-1',
      overlayLine: 'fmb-projects-overlay-line '
    },
    hbi: {
      center: 'fmb-HBI-center',
      side0: 'fmb-HBI-side-0',
      side1: 'fmb-HBI-side-1',
      overlayLine: 'fmb-HBI-overlay-line',
      intersections: 'fmb-HBI-intersections',
      intersectionsSide0: 'fmb-HBI-intersections-side-0',
      intersectionsSide1: 'fmb-HBI-intersections-side-1',
      intersectionsOverlay: 'fmb-HBI-intersections-overlay-line'
    },
    buildings3d: '3d-buildings',
    dimmingLayer: 'fmb-dimming'
  },
  zoomAfterGeocode: 15,
  geocoderUrl: 'https://geocoder.cit.api.here.com/6.2/geocode.json',
  geocoderAppId: 'WOhEXnd20kbhT8Lxx4n4',
  geocoderAppCode: 'uFkDYK0WKXBPZgG8mRb9Rg',
  geocoderBounds: '13.3651,52.4658,13.4945,52.5479',
  dimmingOpacity: 0.3,
  bounds: [
    [13.2826, 52.4615],
    [13.46391, 52.5544374]
  ]
};

import { MapConfig } from '~/apps/Map/types';

const MapboxStyles = {
  'FMB-release-3': 'mapbox://styles/hejco/cjiolwa78299h2sq8age91h2h',
  'FMB-release-4': 'mapbox://styles/hejco/ck0nzclbk0ey01ct9ilwefpzc',
  'FMB-release-5': 'mapbox://styles/hejco/ck37eiywp0un71cpd01dutt7r',
  'FMB-release-6': 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9',
  'FMB-release-8': 'mapbox://styles/hejco/ckdzvkywj0u3g1amidtrbnw5v',
};

const map: MapConfig = {
  bounds: [
    [13.2826, 52.4615],
    [13.46391, 52.5544374],
  ],
  features: {
    accidents: true,
  },
  geocoder: {
    url: 'https://geocoder.cit.api.here.com/6.2/geocode.json',
    appId: 'WOhEXnd20kbhT8Lxx4n4',
    appCode: 'uFkDYK0WKXBPZgG8mRb9Rg',
    bounds: '13.3651,52.4658,13.4945,52.5479',
    zoomAfterGeocode: 15,
  },
  layers: {
    projects: {
      center: 'fmb-projects-center',
      side0: 'fmb-projects-side-0',
      side1: 'fmb-projects-side-1',
      overlayLine: 'fmb-projects-overlay-line',
    },
    hbi: {
      center: 'HBI-track-center',
      side0: 'HBI-track-side-0',
      side1: 'HBI-track-side-1',
      overlayLine: 'HBI-track-overlay',
      xCenter: 'fmb-HBI-intersections',
      xSide0: 'fmb-HBI-intersections-side-0',
      xSide1: 'fmb-HBI-intersections-side-1',
      xOverlay: 'fmb-HBI-intersections-overlay',
    },
    buildings3d: '3d-buildings',
    dimmingLayer: 'fmb-dimming',
  },
  style: MapboxStyles['FMB-release-8'],
  view: {
    zoom: 12,
    bearing: 0,
    pitch: 0,
    center: [13.415669, 52.513219],
    show3dBuildings: false,
    animate: false,
    dim: false,
  },
};

export default map;

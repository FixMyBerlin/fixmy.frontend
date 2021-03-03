import { HBI_STOPS, LEFT_SIDE, RIGHT_SIDE, BOTH_SIDES } from './constants';

// Shape of an object that contains all HBI data for a section

export type Side = typeof LEFT_SIDE | typeof RIGHT_SIDE | typeof BOTH_SIDES;

export type HBISide = {
  label: typeof HBI_STOPS[number]['label'];
  color: typeof HBI_STOPS[number]['color'];
  level: null | 0 | 1 | 2 | 3;
};

export type HBI = {
  [BOTH_SIDES]: HBISide;
  [LEFT_SIDE]?: HBISide;
  [RIGHT_SIDE]?: HBISide;
  components: {
    visionZeroIndex?: {
      [S in Side]: {
        level: null | 0 | 1 | 2 | 3;
        source: string;
        slightlyInjured: number;
        severelyInjured: number;
        killed: number;
      };
    };
  };
};

export type MapConfig = {
  bounds: mapboxgl.LngLatBoundsLike;
  features: {
    accidents: boolean;
  };
  geocoder: {
    zoomAfterGeocode: number;
    url: string;
    appId: string;
    appCode: string;
    bounds: string;
  };
  layers: {
    projects: {
      center: string;
      side0: string;
      side1: string;
      overlayLine: string;
    };
    hbi: {
      // Section layers
      center: string;
      side0: string;
      side1: string;
      overlayLine: string;
      // Intersection layers
      xCenter: string;
      xSide0: string;
      xSide1: string;
      xOverlay: string;
    };
    buildings3d: string;
    dimmingLayer: string;
  };
  style: string;
  view: {
    zoom: number;
    bearing: number;
    pitch: number;
    center: mapboxgl.LngLatLike;
    show3dBuildings: boolean;
    animate: boolean;
    dim: boolean;
  };
};

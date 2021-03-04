import {
  HBI_STOPS,
  LEFT_SIDE,
  RIGHT_SIDE,
  BOTH_SIDES,
  HBI_BAD,
  HBI_OK,
  HBI_SUPER,
  HBI_WORST,
} from './constants';

// Shape of an object that contains all HBI data for a section

export type Side = typeof LEFT_SIDE | typeof RIGHT_SIDE | typeof BOTH_SIDES;

export type HBISide = {
  label: typeof HBI_STOPS[number]['label'];
  color: typeof HBI_STOPS[number]['color'];
  level?: HBILevel;
};

export type HBI = {
  [BOTH_SIDES]: HBISide;
  [LEFT_SIDE]?: HBISide;
  [RIGHT_SIDE]?: HBISide;
  components: {
    visionZeroIndex?: {
      [S in Side]: {
        // eslint-disable-next-line camelcase
        risk_level?: VisionZeroIndex;
        source: string;
        // eslint-disable-next-line camelcase
        slightly_injured: number;
        // eslint-disable-next-line camelcase
        severely_injured: number;
        killed: number;
      };
    };
  };
};

export type HBILevel =
  | typeof HBI_WORST
  | typeof HBI_BAD
  | typeof HBI_OK
  | typeof HBI_SUPER;

// this scale is the reverse of the HBILevel scale
// (0 is best because it's vision zero duh)
export type VisionZeroIndex = 0 | 1 | 2 | 3;

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

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

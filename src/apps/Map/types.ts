export type MapConfig = {
  bounds: mapboxgl.LngLatBoundsLike;
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
      center: string;
      side0: string;
      side1: string;
      overlayLine: string;
      intersections: string;
      intersectionsSide0: string;
      intersectionsSide1: string;
      intersectionsOverlay: string;
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

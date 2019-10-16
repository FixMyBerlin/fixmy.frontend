/* eslint no-param-reassign: 0 */
import turfAlong from '@turf/along';
import turfLength from '@turf/length';
import { lineString as turfLineString } from '@turf/helpers';

import Store from '~/store';
import * as MapActions from '~/pages/Map/MapState';
import * as AppActions from '~/AppState';
import { byKey, isNumeric, getParameterByName } from '~/utils/utils';

const planningPhases = byKey(config.planningPhases, 'id');

export const intersectionLayers = [
  'intersections',
  'intersectionsSide0',
  'intersectionsSide1',
  'intersectionsOverlay'
];

export const standardLayers = ['center', 'side0', 'side1'];
export const standardLayersWithOverlay = [...standardLayers, 'overlayLine'];

export function setView(map, view) {
  if (view.zoom) map.setZoom(view.zoom);
  if (view.center) map.setCenter(view.center);
  if (view.pitch) map.setPitch(view.pitch);
  if (view.bearing) map.setBearing(view.bearing);
}

export function animateView(map, view) {
  map.easeTo({
    center: view.center,
    zoom: view.zoom,
    bearing: view.bearing,
    pitch: view.pitch
  });
}

export function toggleLayer(map, layer, isVisible) {
  if (map.getLayer(layer)) {
    map.setLayoutProperty(layer, 'visibility', isVisible ? 'visible' : 'none');
  }
}

// used to highlight a section by id
export function filterLayersById(map, id) {
  if (id) {
    const VisibilityFilter = ['case', ['!=', ['get', 'id'], id], 0.2, 1];

    map.setPaintProperty(
      config.map.layers.projects.center,
      'line-opacity',
      VisibilityFilter
    );
  }
}

function setMapFilter(map, subMap, filter) {
  standardLayersWithOverlay.forEach((layerName) =>
    map.setFilter(config.map.layers[subMap][layerName], filter)
  );
  map.setFilter(config.map.layers.bgLayer, filter);
}

/**
 * Set color and opacity rules for the project layers depending on planning
 * phase and street side-association of plannings
 *
 * @param {Object} Mapbox instance
 * @param {Array<Boolean>} filter For each layer whether it should be visible
 */
export function colorizePlanningLines(map, filter) {
  const layers = config.map.layers.projects;

  // const mapPhasesToColors = [
  //   'case',
  //   ['==', 'draft', ['get', `phase`]],
  //   planningPhases.draft.color,
  //   ['==', 'planning', ['get', `phase`]],
  //   planningPhases.planning.color,
  //   ['==', 'execution', ['get', `phase`]],
  //   planningPhases.execution.color,
  //   ['==', 'ready', ['get', `phase`]],
  //   planningPhases.ready.color,
  //   '#FFF'
  // ];

  // // All layers except for the overlay line are colored according
  // // to their associated project's phase.
  // map.setPaintProperty(layers.center, 'line-color', mapPhasesToColors);
  // map.setPaintProperty(layers.side0, 'line-color', mapPhasesToColors);
  // map.setPaintProperty(layers.side1, 'line-color', mapPhasesToColors);

  // // The `center` and `overlayLine` layers should be visible everywhere
  // map.setPaintProperty(layers.center, 'line-opacity', 1);
  // map.setPaintProperty(layers.overlayLine, 'line-opacity', 1);

  // // The opacity of the two street sides is changed depending on whether
  // // a project is planned on that side, so that sides with no planned projects
  // // are invisble.
  // //
  // // sides:
  // //   right: 0
  // //   left: 1
  // //   both: 2
  // const planningSideOpacity = (side) => [
  //   'case',
  //   ['==', side, ['get', 'side']],
  //   1,
  //   ['==', 2, ['get', 'side']],
  //   1,
  //   0
  // ];

  // map.setPaintProperty(layers.side0, 'line-opacity', planningSideOpacity(0));
  // map.setPaintProperty(layers.side1, 'line-opacity', planningSideOpacity(1));
}

function getHbiExpression(sideKey) {
  // formula:
  // HBI = ((s - rs) * 1.6) + ((v - rv) * 0.5)
  // const securityExpr = ['*', ['-', ['to-number', ['get', `${sideKey}safety`], -1000], rs], 1.6];
  // const speedExpr = ['*', ['-', ['to-number', ['get', `${sideKey}velocity`], -1000], rv], 0.5];
  // return ['number', ['+', securityExpr, speedExpr]];
  const safety = ['to-number', ['get', `${sideKey}safety`], -1000];
  const velociy = ['to-number', ['get', `${sideKey}velocity`], -1000];

  return ['number', ['+', safety, velociy]];
}

function getHbiLineColorRules(hbi) {
  return [
    'case',
    ['<', hbi, 0],
    'white', // we set a negative default value in order to recognize invalid sections. see function above
    ['<', hbi, config.hbiStops[0].max],
    config.hbiStops[0].color,
    ['<', hbi, config.hbiStops[1].max],
    config.hbiStops[1].color,
    ['<', hbi, config.hbiStops[2].max],
    config.hbiStops[2].color,
    ['<=', hbi, config.hbiStops[3].max],
    config.hbiStops[3].color,
    config.hbiStops[3].color
  ];
}

function getHbiFilterRules(hbi, filter) {
  return [
    'case',
    [
      'all',
      ['>', hbi, config.hbiStops[0].min],
      ['<', hbi, config.hbiStops[0].max]
    ],
    filter[0] ? 1 : 0,
    [
      'all',
      ['>', hbi, config.hbiStops[1].min],
      ['<', hbi, config.hbiStops[1].max]
    ],
    filter[1] ? 1 : 0,
    [
      'all',
      ['>', hbi, config.hbiStops[2].min],
      ['<', hbi, config.hbiStops[2].max]
    ],
    filter[2] ? 1 : 0,
    [
      'all',
      ['>', hbi, config.hbiStops[3].min],
      ['<', hbi, config.hbiStops[3].max]
    ],
    filter[3] ? 1 : 0,
    0
  ];
}

export function colorizeHbiLines(map, hbiValues, hbiFilter) {
  setMapFilter(map, 'hbi', [
    'any',
    ['has', 'side0_safety'],
    ['has', 'side0_velocity']
  ]);

  const rv = (hbiValues[0] - 5) / 10;
  const rs = (hbiValues[1] - 5) / 10;

  const hbiExprCenter = getHbiExpression('', rs, rv);
  const hbiExprSide0 = getHbiExpression('side0_', rs, rv);
  const hbiExprSide1 = getHbiExpression('side1_', rs, rv);

  const lineColorRules = [
    getHbiLineColorRules(hbiExprCenter),
    getHbiLineColorRules(hbiExprSide0),
    getHbiLineColorRules(hbiExprSide1)
  ];

  standardLayers.forEach((layerName, i) =>
    map.setPaintProperty(
      config.map.layers.hbi[layerName],
      'line-color',
      lineColorRules[i]
    )
  );

  const lineOpacityRules = [
    getHbiFilterRules(hbiExprCenter, hbiFilter),
    getHbiFilterRules(hbiExprSide0, hbiFilter),
    getHbiFilterRules(hbiExprSide1, hbiFilter)
  ];

  standardLayers.forEach((layerName, i) =>
    map.setPaintProperty(
      config.map.layers.hbi[layerName],
      'line-opacity',
      lineOpacityRules[i]
    )
  );
}

export function resetMap({ zoom = null } = {}) {
  Store.dispatch(AppActions.setActiveSection(null));
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));

  const nextMapView = {
    show3dBuildings: false,
    dim: false,
    pitch: 0,
    bearing: 0,
    animate: true,
    center: null
  };

  if (zoom) {
    nextMapView.zoom = zoom;
  }

  Store.dispatch(MapActions.setView(nextMapView));
}

export function getCenterFromGeom(geometry, defaultCenter = null) {
  if (geometry && geometry.coordinates) {
    if (geometry.type === 'MultiLineString') {
      geometry = turfLineString(
        geometry.coordinates.reduce((res, coord) => res.concat(coord)),
        []
      );
    }

    const length = turfLength(geometry);
    return turfAlong(geometry, length * 0.5).geometry.coordinates;
  }

  return defaultCenter;
}

export async function getGeoLocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (err) => {
          reject(err);
        },
        { timeout: 10000 }
      );
    } else {
      reject();
    }
  });
}

export function parseUrlOptions() {
  const lat = getParameterByName('lat');
  const lng = getParameterByName('lng');
  const zoom = getParameterByName('zoom');
  const validZoom = zoom && isNumeric(+zoom);

  if (!lat || !lng || !isNumeric(+lat) || !isNumeric(+lng)) {
    return false;
  }

  return {
    center: [+lng, +lat] || config.map.view.center,
    zoom: validZoom ? +zoom : config.map.view.zoom
  };
}

export default {
  setView,
  animateView,
  filterLayersById,
  toggleLayer,
  colorizeHbiLines,
  colorizePlanningLines,
  resetMap,
  getCenterFromGeom,
  getGeoLocation,
  parseUrlOptions
};

/* eslint no-param-reassign: 0 */
import turfAlong from '@turf/along';
import turfLength from '@turf/length';
import { lineString as turfLineString } from '@turf/helpers';

import config from '~/pages/Map/config';
import { isNumeric, getParameterByName } from '~/utils/utils';

export const intersectionLayers = [
  'intersections',
  'intersectionsSide0',
  'intersectionsSide1',
  'intersectionsOverlay'
];

export const standardLayers = ['center', 'side0', 'side1'];
export const standardLayersWithOverlay = [...standardLayers, 'overlayLine'];

export function setView(map, view) {
  // attach flag to enables listeners to differentiate between natural user interaction and programmatic map change
  const eventData = { programmaticMove: true };
  if (view.zoom) map.setZoom(view.zoom, eventData);
  if (view.center) map.setCenter(view.center, eventData);
  if (view.pitch) map.setPitch(view.pitch, eventData);
  if (view.bearing) map.setBearing(view.bearing, eventData);
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

/**
 * Change opacity of all non-active sections to highlight a specific one or
 * reset filter when no section is selected
 *
 * @param {Object} map Mapbox instance
 * @param {String} subMap either `projects` or `hbi`
 * @param {Number} id Identifier of the active section (null for reset)
 */
export function filterLayersById(map, subMap, id) {
  let VisibilityFilter;
  if (id) {
    VisibilityFilter = ['case', ['!=', ['get', 'id'], id], 0.2, 1];
  } else {
    VisibilityFilter = 1;
  }

  standardLayers.forEach((layer) =>
    map.setPaintProperty(
      config.map.layers[subMap][layer],
      'line-opacity',
      VisibilityFilter
    )
  );
}

const sideFilter0 = ['match', ['get', 'side'], [2, 0], true, false];
const sideFilter1 = ['match', ['get', 'side'], [2, 1], true, false];

/**
 * Set a filter on projects to display only those of a certain phase
 *
 * @param {Object} map Mapbox instance
 * @param {Array<boolean>} filters Four booleans describe which phases are visible
 */
export function setPlanningLegendFilter(map, selected) {
  const phases = config.planningPhases.map((phase) => phase.id);
  const filters = selected
    .map((isSelected, phaseIndex) =>
      isSelected === true ? ['==', phases[phaseIndex], ['get', 'phase']] : null
    )
    .filter((entry) => entry !== null);

  // Also show temporary projects if the filter for phase "ready" is active
  if (selected[3] === true) {
    filters.push(['==', 'inactive', ['get', 'phase']]);
  }

  // Planning legend filter can be directly set for center and overlayLine
  // layer, but need  to be concatenated with side filter for the side layers

  map.setFilter(config.map.layers.projects.center, ['any', ...filters]);
  map.setFilter(config.map.layers.projects.overlayLine, ['any', ...filters]);
  map.setFilter(config.map.layers.projects.side0, [
    'all',
    sideFilter0,
    ['any', ...filters]
  ]);
  map.setFilter(config.map.layers.projects.side1, [
    'all',
    sideFilter1,
    ['any', ...filters]
  ]);
}

/**
 * Show all popup bike lanes from the projects layer
 *
 * @param {MapboxGL instance} map
 */
export function setPopupLanesFilter(map) {
  const filter = ['==', 'inactive', ['get', 'phase']];
  map.setFilter(config.map.layers.projects.center, filter);
  map.setFilter(config.map.layers.projects.overlayLine, filter);
  map.setFilter(config.map.layers.projects.side0, ['all', sideFilter0, filter]);
  map.setFilter(config.map.layers.projects.side1, ['all', sideFilter1, filter]);
}

/**
 * Return a Mapbox expression to access the HBI values embedded in Mapbox
 *
 * @param {*} sideKey which side's HBI value to retrieve (layer prefix)
 */
function getHbiExpression(sideKey) {
  // formula:
  // HBI = ((s - rs) * 1.6) + ((v - rv) * 0.5)
  // const securityExpr = ['*', ['-', ['to-number', ['get', `${sideKey}safety`], -1000], rs], 1.6];
  // const speedExpr = ['*', ['-', ['to-number', ['get', `${sideKey}velocity`], -1000], rv], 0.5];
  // return ['number', ['+', securityExpr, speedExpr]];
  const safety = ['to-number', ['get', `${sideKey}safety`], -1000];
  const velocity = ['to-number', ['get', `${sideKey}velocity`], -1000];

  return ['number', ['+', safety, velocity]];
}

/**
 * Returns active filters for hbi state colorization
 *
 * @param {Object} map Mapbox instance
 * @param {Array<boolean>} filters Four booleans describe which hbi states are visible
 */
function getHbiFilterRules(sideKey, hbiFilters) {
  const hbi = getHbiExpression(sideKey);
  const activeHbiStops = config.hbiStops.filter((d, i) => hbiFilters[i]);
  return activeHbiStops.map((hbiStop) => [
    'all',
    ['>', hbi, hbiStop.min],
    ['<', hbi, hbiStop.max]
  ]);
}

export function toggleVisibleHbiLines(map, hbiValues, hbiFilter) {
  const centerRules = getHbiFilterRules('', hbiFilter);
  const side0rules = getHbiFilterRules('side0_', hbiFilter);
  const side1rules = getHbiFilterRules('side1_', hbiFilter);

  map.setFilter(config.map.layers.hbi.center, ['any', ...centerRules]);
  map.setFilter(config.map.layers.hbi.side0, ['any', ...side0rules]);
  map.setFilter(config.map.layers.hbi.side1, ['any', ...side1rules]);
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
  getCenterFromGeom,
  getGeoLocation,
  parseUrlOptions
};

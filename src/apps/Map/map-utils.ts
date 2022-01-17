import turfAlong from '@turf/along';
import { lineString as turfLineString } from '@turf/helpers';
import turfLength from '@turf/length';
import debug from 'debug';

import config from '~/config';
import { isNumeric, getParameterByName } from '~/utils/utils';

import { PLANNING_PHASES, HBI_STOPS } from './constants';

// eslint-disable-next-line
/// <reference lib="dom" />

type MapboxFilter = any[];
type SideKey = 'side0_' | 'side1_' | 'side2_';

const logger = debug('fmc:map:utils');

// names of the keys that respond to sets of layers in `config`
export const intersectionLayers = ['xCenter', 'xSide0', 'xSide1'];
export const intersectionLayersWithOverlay = [
  ...intersectionLayers,
  'overlayLine',
];
export const standardLayers = ['center', 'side0', 'side1'];
export const standardLayersWithOverlay = [...standardLayers, 'overlayLine'];

export function setView(map: mapboxgl.Map, view: mapboxgl.MapboxOptions) {
  logger('set view', view);
  // attach flag to enables listeners to differentiate between natural user interaction and programmatic map change
  const eventData = { programmaticMove: true };
  if (view.zoom) map.setZoom(view.zoom, eventData);
  if (view.center) map.setCenter(view.center, eventData);
  if (view.pitch) map.setPitch(view.pitch, eventData);
  if (view.bearing) map.setBearing(view.bearing, eventData);
}

export function animateView(map: mapboxgl.Map, view: mapboxgl.MapboxOptions) {
  logger('set view animated', view);
  map.easeTo({
    center: view.center,
    zoom: view.zoom,
    bearing: view.bearing,
    pitch: view.pitch,
  });
}

export function toggleLayer(
  map: mapboxgl.Map,
  layer: string,
  isVisible: boolean
): void {
  logger('toggle layer', layer, isVisible);
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
export function filterLayersById(
  map: mapboxgl.Map,
  subMap: 'projects' | 'hbi',
  id: number
): void {
  let VisibilityFilter;
  if (id) {
    VisibilityFilter = ['case', ['!=', ['get', 'id'], id], 0.2, 1];
  } else {
    VisibilityFilter = 1;
  }

  const targets =
    subMap === 'projects'
      ? standardLayers
      : standardLayers.concat(intersectionLayers);

  targets.forEach((layer) =>
    map.setPaintProperty(
      config.apps.map.layers[subMap][layer],
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
export function setPlanningLegendFilter(
  map: mapboxgl.Map,
  selected: boolean[]
): void {
  const phases = PLANNING_PHASES.map((phase) => phase.id);
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

  map.setFilter(config.apps.map.layers.projects.center, ['any', ...filters]);
  map.setFilter(config.apps.map.layers.projects.overlayLine, [
    'any',
    ...filters,
  ]);
  map.setFilter(config.apps.map.layers.projects.side0, [
    'all',
    sideFilter0,
    ['any', ...filters],
  ]);
  map.setFilter(config.apps.map.layers.projects.side1, [
    'all',
    sideFilter1,
    ['any', ...filters],
  ]);
}

/**
 * Return a Mapbox expression to access the HBI values embedded in Mapbox
 *
 * @param {*} sideKey which side's HBI value to retrieve (layer prefix)
 */
function getHbiExpression(sideKey: SideKey | '') {
  if (sideKey === '') {
    return ['min', ...['side0_', 'side1_', 'side2_'].map(getHbiExpression)];
  }
  const hasValue = ['has', `${sideKey}risk_level`];
  // risk level is subtracted from 3 because the risk level scale is the inverse
  // of the hbi level scale
  const getValue = ['-', 3, ['to-number', ['get', `${sideKey}risk_level`]]];
  const fallback = 1000;
  return ['case', hasValue, getValue, fallback];
}

/**
 * Returns active filters for hbi state colorization
 *
 * @param {Object} map Mapbox instance
 * @param {Array<boolean>} filters Four booleans describe which hbi states are visible
 */
function getHbiFilterRules(
  sideKey: SideKey | '',
  hbiFilters: boolean[]
): MapboxFilter[] {
  const expression = getHbiExpression(sideKey);
  const activeHbiStops = HBI_STOPS.filter((_, i) => hbiFilters[i]);
  return activeHbiStops.map((hbiStop) => ['==', expression, hbiStop.value]);
}

export function toggleVisibleHbiLines(
  map: mapboxgl.Map,
  hbiFilter: MapboxFilter
): void {
  const side2rules = getHbiFilterRules('side2_', hbiFilter);

  map.setFilter(config.apps.map.layers.hbi.xCenter, ['any', ...side2rules]);
  map.setFilter(config.apps.map.layers.hbi.xSide0, ['any', ...side2rules]);
  map.setFilter(config.apps.map.layers.hbi.xSide1, ['any', ...side2rules]);
}

/**
 * Takes a Point or MultilineString feature and returns its center
 * coordinates. Returns `defaultCenter` if `geometry` is either null or not a
 * Point/MultiLineString geometry.
 */
export function getCenterFromGeom(geometry: any, defaultCenter = null) {
  let lineString = geometry;
  if (geometry && geometry.coordinates) {
    if (geometry.type === 'Point') return geometry.coordinates;

    if (geometry.type === 'MultiLineString') {
      lineString = turfLineString(
        geometry.coordinates.reduce((res, coord) => res.concat(coord)),
        []
      );
    }

    const length = turfLength(lineString);
    return turfAlong(lineString, length * 0.5).geometry.coordinates;
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

export function parseUrlOptions():
  | {
      center: mapboxgl.LngLatLike;
      zoom: number;
    }
  | false {
  const lat = getParameterByName('lat');
  const lng = getParameterByName('lng');
  const zoom = getParameterByName('zoom');
  const validZoom = zoom && isNumeric(+zoom);

  if (!lat || !lng || !isNumeric(+lat) || !isNumeric(+lng)) {
    return false;
  }

  return {
    center: [+lng, +lat] || config.apps.map.view.center,
    zoom: validZoom ? +zoom : config.apps.map.view.zoom,
  };
}

export default {
  setView,
  animateView,
  filterLayersById,
  toggleLayer,
  getCenterFromGeom,
  getGeoLocation,
  parseUrlOptions,
};

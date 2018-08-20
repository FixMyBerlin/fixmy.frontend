/* eslint no-param-reassign: 0 */

import turfAlong from '@turf/along';
import turfLength from '@turf/length';
import { lineString as turfLineString } from '@turf/helpers';

import Store from '~/redux/store';
import * as MapActions from '~/modules/MapView/MapState';
import * as AppActions from '~/modules/App/AppState';

export function setView(map, view) {
  map.setZoom(view.zoom);
  map.setCenter(view.center);
  map.setPitch(view.pitch);
  map.setBearing(view.bearing);
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
    const VisibilityFilter = ['case',
      ['!=', ['get', 'id'], id], 0.2,
      1
    ];

    map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', VisibilityFilter);
    map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', VisibilityFilter);
    map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', VisibilityFilter);
  }
}

function setMapFilter(map, filter) {
  map.setFilter(config.map.layers.centerLayer, filter);
  map.setFilter(config.map.layers.side0Layer, filter);
  map.setFilter(config.map.layers.side1Layer, filter);
  map.setFilter(config.map.layers.bgLayer, filter);
  map.setFilter(config.map.layers.overlayLine, filter);
}

function getPlanningLineColorRules(side = '') {
  return [
    'case',
    ['==', 'draft', ['get', `${side}planning_phase`]], config.planningPhases.draft.color,
    ['==', 'planning', ['get', `${side}planning_phase`]], config.planningPhases.planning.color,
    ['==', 'execution', ['get', `${side}planning_phase`]], config.planningPhases.execution.color,
    ['==', 'ready', ['get', `${side}planning_phase`]], config.planningPhases.ready.color,
    '#FFF'
  ];
}

// function getPlanningOpacityRules(side = '') {
//   return [
//     'case',
//     ['==', true, ['has', ['get', `${side}planning_phase`]]], 1,
//     0
//   ];
// }

export function colorizePlanningLines(map) {
  setMapFilter(map, ['any',
    ['has', 'side0_planning_phase'],
    ['has', 'side1_planning_phase'],
    ['has', 'planning_phase']
  ]);

  const paintRulesCenter = getPlanningLineColorRules();
  const paintRulesSide0 = getPlanningLineColorRules('side0_');
  const paintRulesSide1 = getPlanningLineColorRules('side1_');

  map.setPaintProperty(config.map.layers.centerLayer, 'line-color', paintRulesCenter);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-color', paintRulesSide0);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-color', paintRulesSide1);

  map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', 1);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', 1);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', 1);
}

function getHbiExpression(sideKey, rs, rv) {
  // formula:
  // HBI = ((s - rs) * 1.6) + ((v - rv) * 0.5)
  const securityExpr = ['*', ['-', ['to-number', ['get', `${sideKey}safety`]], rs], 1.6];
  const speedExpr = ['*', ['-', ['to-number', ['get', `${sideKey}velocity`]], rv], 0.5];
  return ['number', ['+', securityExpr, speedExpr]];
}

function getHbiLineColorRules(hbi) {
  return [
    'case',
    ['<', hbi, config.hbiStops[0].max], config.hbiStops[0].color,
    ['<', hbi, config.hbiStops[1].max], config.hbiStops[1].color,
    ['<', hbi, config.hbiStops[2].max], config.hbiStops[2].color,
    ['<=', hbi, config.hbiStops[3].max], config.hbiStops[3].color,
    config.hbiStops[3].color
  ];
}

function getHbiFilterRules(hbi, filter) {
  return [
    'case',
    ['all', ['>', hbi, config.hbiStops[0].min], ['<', hbi, config.hbiStops[0].max]], filter[0] ? 1 : 0,
    ['all', ['>', hbi, config.hbiStops[1].min], ['<', hbi, config.hbiStops[1].max]], filter[1] ? 1 : 0,
    ['all', ['>', hbi, config.hbiStops[2].min], ['<', hbi, config.hbiStops[2].max]], filter[2] ? 1 : 0,
    ['all', ['>', hbi, config.hbiStops[3].min], ['<', hbi, config.hbiStops[3].max]], filter[3] ? 1 : 0,
    0
  ];
}

export function colorizeHbiLines(map, hbiValues, hbiFilter) {
  setMapFilter(map, ['any',
    ['has', 'side0_safety'],
    ['has', 'side0_velocity']
  ]);

  const rv = (hbiValues[0] - 5) / 10;
  const rs = (hbiValues[1] - 5) / 10;

  const hbiExprCenter = getHbiExpression('', rs, rv);
  const hbiExprSide0 = getHbiExpression('side0_', rs, rv);
  const hbiExprSide1 = getHbiExpression('side1_', rs, rv);

  const lineColorRulesCenter = getHbiLineColorRules(hbiExprCenter);
  const lineColorRules0 = getHbiLineColorRules(hbiExprSide0);
  const lineColorRules1 = getHbiLineColorRules(hbiExprSide1);

  map.setPaintProperty(config.map.layers.centerLayer, 'line-color', lineColorRulesCenter);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-color', lineColorRules0);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-color', lineColorRules1);

  const lineOpacityRulesCenter = getHbiFilterRules(hbiExprCenter, hbiFilter);
  const lineOpacityRulesSide0 = getHbiFilterRules(hbiExprSide0, hbiFilter);
  const lineOpacityRulesSide1 = getHbiFilterRules(hbiExprSide1, hbiFilter);

  map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', lineOpacityRulesCenter);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', lineOpacityRulesSide0);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', lineOpacityRulesSide1);
}

export function resetMap() {
  Store.dispatch(AppActions.setActiveSection(null));
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));
  Store.dispatch(MapActions.setView({ show3dBuildings: false, dim: false, pitch: 0, bearing: 0, animate: true }));
}

export function getCenterFromGeom(geometry, defaultCenter = null) {
  if (geometry && geometry.coordinates) {
    if (geometry.type === 'MultiLineString') {
      geometry = turfLineString(geometry.coordinates.reduce((res, coord) => res.concat(coord)), []);
    }

    const length = turfLength(geometry);
    return turfAlong(geometry, length * 0.5).geometry.coordinates;
  }

  return defaultCenter;
}

export default {
  setView,
  animateView,
  filterLayersById,
  toggleLayer,
  colorizeHbiLines,
  colorizePlanningLines,
  resetMap,
  getCenterFromGeom
};

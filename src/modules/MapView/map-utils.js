export function setView(map, view) {
  map.setZoom(view.zoom);
  map.setCenter(view.center);
  map.setPitch(view.pitch);
  map.setBearing(view.bearing);
}

export function animateView(map, view) {
  map.flyTo({
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
      ['!=', ['get', 'id'], id], 0,
      1
    ];

    map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', VisibilityFilter);
    map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', VisibilityFilter);
    map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', VisibilityFilter);
  }
}

export function colorizePlanningLines(map) {
  map.setPaintProperty(config.map.layers.centerLayer, 'line-color', config.colors.change_4);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-color', config.colors.change_4);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-color', config.colors.change_4);

  map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', 1);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', 1);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', 1);
}

function getHbiExpression(sideKey, rs, rv) {
  // formula:
  // HBI = ((s - rs) * 1.6) + ((v - rv) * 0.5)
  const securityExpr = ['*', ['-', ['get', `${sideKey}s`], rs], 1.6];
  const speedExpr = ['*', ['-', ['get', `${sideKey}v`], rv], 0.5];
  return ['number', ['+', securityExpr, speedExpr]];
}

function getHbiLineColorRules(hbi) {
  return [
    'case',
    ['<', hbi, 2.5], 'hsl(22, 100%, 52%)',
    ['<', hbi, 5], 'hsl(14, 83%, 74%)',
    ['<', hbi, 7.5], '#a0ebe3',
    ['<=', hbi, 10], 'hsl(174, 87%, 43%)',
    'hsl(174, 87%, 43%)'
  ];
}

function getHbiFilterRules(hbi, min, max) {
  return [
    'case',
    ['<=', hbi, min], 0,
    ['>=', hbi, max], 0,
    1
  ];
}

export function colorizeHbiLines(map, hbiValues, filterHbi) {
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

  if (filterHbi && typeof filterHbi[0] === 'number' && typeof filterHbi[1] === 'number') {
    const min = filterHbi[0];
    const max = filterHbi[1];

    map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', getHbiFilterRules(hbiExprCenter, min, max));
    map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', getHbiFilterRules(hbiExprSide0, min, max));
    map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', getHbiFilterRules(hbiExprSide1, min, max));
  }
}

export default {
  setView,
  animateView,
  filterLayersById,
  toggleLayer,
  colorizeHbiLines,
  colorizePlanningLines
};

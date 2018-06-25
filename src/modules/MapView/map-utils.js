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
    const OpacityRule = ['case',
      ['!=', ['get', 'id'], id], 0,
      1
    ];

    map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', OpacityRule);
    map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', OpacityRule);
    map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', OpacityRule);
  } else {
    map.setPaintProperty(config.map.layers.side0Layer, 'line-opacity', 1);
    map.setPaintProperty(config.map.layers.side1Layer, 'line-opacity', 1);
    map.setPaintProperty(config.map.layers.centerLayer, 'line-opacity', 1);
  }
}

function getLineColorRules(sideKey, rs, rv) {
  // formula:
  // HBI = ((s - rs) * 1.6) + ((v - rv) * 0.5)
  const securityExpr = ['*', ['-', ['get', `${sideKey}s`], rs], 1.6];
  const speedExpr = ['*', ['-', ['get', `${sideKey}v`], rv], 0.5];
  const hbi = ['number', ['+', securityExpr, speedExpr]];

  return [
    'case',
    ['<', hbi, 2.5], 'hsl(22, 100%, 52%)',
    ['<', hbi, 5], 'hsl(14, 83%, 74%)',
    ['<', hbi, 7.5], '#a0ebe3',
    ['<=', hbi, 10], 'hsl(174, 87%, 43%)',
    'hsl(174, 87%, 43%)'
  ];
}

export function colorizePlanningLines(map) {
  map.setPaintProperty(config.map.layers.centerLayer, 'line-color', config.colors.change_4);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-color', config.colors.change_4);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-color', config.colors.change_4);
}

export function colorizeHbiLines(map, hbiValues) {
  const rv = (hbiValues[0] - 5) / 10;
  const rs = (hbiValues[1] - 5) / 10;

  const lineColorRulesCenter = getLineColorRules('', rs, rv);
  const lineColorRules0 = getLineColorRules('side0_', rs, rv);
  const lineColorRules1 = getLineColorRules('side1_', rs, rv);

  map.setPaintProperty(config.map.layers.centerLayer, 'line-color', lineColorRulesCenter);
  map.setPaintProperty(config.map.layers.side0Layer, 'line-color', lineColorRules0);
  map.setPaintProperty(config.map.layers.side1Layer, 'line-color', lineColorRules1);
}

export default {
  setView,
  animateView,
  filterLayersById,
  toggleLayer,
  colorizeHbiLines,
  colorizePlanningLines
};

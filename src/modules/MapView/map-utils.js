const LAYERS = [
  'planungen-bg-inactive',
  'planungen-bg-active',
  'planungen-side0-active',
  'planungen-side0-inactive',
  'planungen-side1-active',
  'planungen-side1-inactive',
  'zustand-bg-active',
  'zustand-bg-inactive',
  'zustand-side0-active',
  'zustand-side0-inactive',
  'zustand-side1-active',
  'zustand-side1-inactive',
  'zustand-center-active',
  'zustand-center-inactive'
];

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

// used to switch between activeLayer (zustand/planung)
// we need activeSection (section id) when user has active section
export function setActiveLayer(map, activeLayer, activeSection) {
  LAYERS.forEach((layer) => {
    const isCurrentLayer = layer.indexOf(activeLayer) >= 0;
    const isActiveLayer = layer.indexOf('inactive') < 0;
    const isVisible = isCurrentLayer && (activeSection || isActiveLayer);
    toggleLayer(map, layer, isVisible);
  });
}

// used to highlight a section by id
export function filterLayersById(map, id) {
  LAYERS.forEach((layer) => {
    if (map.getLayer(layer)) {
      const isActiveLayer = layer.indexOf('inactive') < 0;
      if (id) {
        map.setFilter(layer, [isActiveLayer ? '==' : '!=', 'id', id]);
      } else {
        map.setFilter(layer, null);
      }
    } else {
      console.log('layer does not exist:', layer);
    }
  });
}

// function getLineColorRules(property, index) {
//   return [
//     'case',
//     ['<', ['number', ['get', property]], index], 'hsl(22, 100%, 52%)',
//     ['<', ['number', ['get', property]], index], 'hsl(14, 83%, 74%)',
//     ['<', ['number', ['get', property]], index], '#a0ebe3',
//     ['<=', ['number', ['get', property]], index], 'hsl(174, 87%, 43%)',
//     'hsl(174, 87%, 43%)'
//   ];
// }

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

export function colorizeLines(map, hbiValues) {
  const rv = (hbiValues[0] - 5) / 10;
  const rs = (hbiValues[1] - 5) / 10;

  const lineColorRulesCenter = getLineColorRules('', rs, rv);
  const lineColorRules0 = getLineColorRules('side0_', rs, rv);
  const lineColorRules1 = getLineColorRules('side1_', rs, rv);

  // @TODO: always use this function to colorize the sides
  // @TODO: calculate index for zustand-center-active separately
  map.setPaintProperty('zustand-center-active', 'line-color', lineColorRulesCenter);
  map.setPaintProperty('zustand-side0-active', 'line-color', lineColorRules0);
  map.setPaintProperty('zustand-side1-active', 'line-color', lineColorRules1);
}

export default {
  setView,
  animateView,
  setActiveLayer,
  filterLayersById,
  toggleLayer,
  colorizeLines
};

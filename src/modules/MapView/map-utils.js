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

export function setActiveLayer(map, activeLayer, activeSection) {
  LAYERS.forEach((layer) => {
    const isCurrentLayer = layer.indexOf(activeLayer) >= 0;
    const isActiveLayer = layer.indexOf('inactive') < 0;
    const isVisible = isCurrentLayer && (activeSection || isActiveLayer);
    toggleLayer(map, layer, isVisible);
  });
}

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

export default {
  setView,
  animateView,
  setActiveLayer,
  filterLayersById,
  toggleLayer
};

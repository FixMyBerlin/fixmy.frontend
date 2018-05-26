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

export default {
  setView,
  animateView
};

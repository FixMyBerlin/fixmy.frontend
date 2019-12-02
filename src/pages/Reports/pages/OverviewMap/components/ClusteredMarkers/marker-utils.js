import MapboxGL from 'mapbox-gl';

import BikeStandMarker from '~/images/reports/pin-meldung.png';

const ICONS = {
  BIKE_STANDS: BikeStandMarker
};

function createClusterMarker({ pointCount, map, clusterSource, id, lngLat }) {
  const el = document.createElement('div');
  el.className = 'reports-cluster';

  const elInner = document.createElement('div');
  elInner.className = 'reports-cluster__inner';
  elInner.innerHTML = pointCount;

  el.appendChild(elInner);

  if (pointCount >= 10) {
    el.style.width = '50px';
    el.style.height = '50px';
  } else if (pointCount > 24) {
    el.style.width = '60px';
    el.style.height = '60px';
  }

  el.addEventListener('click', () => {
    clusterSource.getClusterExpansionZoom(id, (err, zoom) => {
      if (err) return;

      map.easeTo({
        center: lngLat,
        zoom: zoom + 0.1
      });
    });
  });

  return new MapboxGL.Marker(el).setLngLat(lngLat).setOffset([-10, -10]);
}

function createPinMarker({
  markerData,
  geometry,
  lngLat,
  selectedReport,
  detailId,
  onClick
}) {
  const details = JSON.parse(markerData.details || {});
  const el = document.createElement('div');

  el.dataset.id = markerData.id;
  el.style.cursor = 'pointer';
  el.style.opacity = 1;
  el.style.width = '40px';
  el.style.height = 'auto';

  if (selectedReport || detailId) {
    const activeId = selectedReport ? selectedReport.id : detailId;
    const isActive = markerData.id.toString() === activeId.toString();

    if (!isActive) {
      el.style.filter = 'brightness(1.15) grayscale(0.7)';
    }
  }

  const updatedMarkerData = { ...markerData, geometry, details };

  el.innerHTML = `<img style="width: 100%;" class="marker-image" src="${
    ICONS[details.subject]
  }" />`;
  el.addEventListener('click', (evt) => onClick(evt, updatedMarkerData));

  return new MapboxGL.Marker(el).setLngLat(lngLat).setOffset([0, -20]);
}

export { createClusterMarker, createPinMarker };

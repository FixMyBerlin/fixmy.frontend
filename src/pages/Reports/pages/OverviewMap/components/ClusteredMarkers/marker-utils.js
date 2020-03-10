import MapboxGL from 'mapbox-gl';

// import MarkerNew from '~/images/reports/pin-new.png';
import MarkerVerification from '~/images/reports/pin-verification.png';
import MarkerAccepted from '~/images/reports/pin-accepted.png';
import MarkerRejected from '~/images/reports/pin-rejected.png';
import MarkerDone from '~/images/reports/pin-done.png';

import logger from '~/utils/logger';

// The "new" marker is not used anymore and replaced by the verification marker
// for now
const ICONS_BY_STATUS = {
  new: MarkerVerification,
  verification: MarkerVerification,
  accepted: MarkerAccepted,
  rejected: MarkerRejected,
  done: MarkerDone
};

/**
 * Returns a marker image source depending on report status
 *
 * @param {Object} markerData containing the status field
 */
const getMarkerSrc = (markerData) => {
  const { status } = markerData;
  if (status == null) logger('Record is missing status:', markerData);
  return ICONS_BY_STATUS[status];
};

function createClusterMarker({ pointCount, map, clusterSource, id, lngLat }) {
  const el = document.createElement('div');
  el.className = 'reports-cluster';

  const elInner = document.createElement('div');
  elInner.className = 'reports-cluster__inner';
  elInner.innerHTML = pointCount;

  el.dataset.cy = 'reports-marker-cluster';

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
  el.className = 'reports-marker';

  el.dataset.cy = 'reports-marker';

  if (selectedReport || detailId) {
    const activeId = selectedReport ? selectedReport.id : detailId;
    const isActive = markerData.id.toString() === activeId.toString();

    if (!isActive) {
      el.style.filter = 'brightness(1.15) grayscale(0.7)';
    }
  }

  const updatedMarkerData = { ...markerData, geometry, details };

  el.innerHTML = `<img class="marker-image" src="${getMarkerSrc(
    markerData
  )}" />`;
  el.addEventListener('click', (evt) => onClick(evt, updatedMarkerData));

  return new MapboxGL.Marker(el).setLngLat(lngLat).setOffset([0, -20]);
}

function setupClusters(name, map, data, radius, handleUpdate) {
  map.on('data', (e) => {
    if (e.sourceId !== name || !e.isSourceLoaded) return;

    map.on('move', () => handleUpdate());
    map.on('moveend', () => handleUpdate());

    handleUpdate();
  });

  map.addSource(name, {
    type: 'geojson',
    data,
    cluster: true,
    clusterRadius: radius
  });

  map.addLayer({
    id: `${name}_circle`,
    type: 'circle',
    source: name,
    filter: ['!=', 'cluster', true],
    paint: {
      'circle-opacity': 0
    }
  });
}

export { createClusterMarker, createPinMarker, setupClusters };

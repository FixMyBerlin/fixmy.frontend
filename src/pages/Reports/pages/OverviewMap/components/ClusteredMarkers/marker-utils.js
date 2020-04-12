import MapboxGL from 'mapbox-gl';

import config from '~/pages/Reports/config';
import utils from '~/pages/Reports/utils';

function createClusterMarker({ pointCount, map, clusterSource, id, lngLat }) {
  const el = document.createElement('div');
  el.className = 'reports-cluster';
  el.style.borderColor = config.reports.overviewMap.clusterColor.outer;

  const elInner = document.createElement('div');
  elInner.className = 'reports-cluster__inner';
  elInner.innerHTML = pointCount;
  elInner.style.borderColor = config.reports.overviewMap.clusterColor.inner;

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

function createPinMarker({ markerData, geometry, lngLat, onClick }) {
  const details = JSON.parse(markerData.details || {});
  const el = document.createElement('div');

  el.dataset.id = markerData.id;
  el.className = 'reports-marker';

  el.dataset.cy = 'reports-marker';

  const updatedMarkerData = { ...markerData, geometry, details };

  el.innerHTML = `<img class="marker-image marker-${
    markerData.status
  }" src="${utils.getMarkerSrc(markerData)}" />`;
  el.addEventListener('click', (evt) => onClick(evt, updatedMarkerData));

  return new MapboxGL.Marker(el).setLngLat(lngLat).setOffset([0, -0]);
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

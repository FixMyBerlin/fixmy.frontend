import { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';

import BikeStandMarker from '~/images/reports/pin-meldung.png';

const Markers = {
  BIKE_STANDS: BikeStandMarker
};


function getClusterMarker({ pointCount, map, clusterSource, id, lngLat }) {
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

  return new MapboxGL.Marker(el)
    .setLngLat(lngLat)
    .setOffset([-10, -10]);
}

function getPinMarker({ markerData, geometry, lngLat, selectedReport, detailId, onClick }) {
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

  markerData.geometry = geometry;
  markerData.details = details;

  el.innerHTML = `<img style="width: 100%;" class="marker-image" src="${Markers[details.subject]}" />`;
  el.addEventListener('click', evt => onClick(evt, markerData));

  return new MapboxGL.Marker(el)
    .setLngLat(lngLat)
    .setOffset([0, -20]);
}

// TODO: Establish a base Marker class that contains generic lifecycle logic to de-dupe
class ReportMarkers extends PureComponent {
  constructor() {
    super();

    this.markers = [];
    this.markerCache = {};
    this.renderedMarkers = {};
  }

  componentDidMount() {
    this.updateMarkers();
  }

  componentDidUpdate() {
    this.updateMarkers();
  }

  removeMarkers() {
    this.markers.forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });
    this.markers = [];
  }

  updateMarkers() {
    const { data, map, clusters, selectedReport, detailId, clusterSource } = this.props;
    if (!data || !map) {
      return false;
    }

    const newMarkers = {};

    clusters.forEach((markerData) => {
      const lngLat = markerData.geometry.coordinates;
      const isCluster = markerData.properties.cluster;
      const id = isCluster ? `cluster_${markerData.properties.cluster_id}` : markerData.properties.id;
      let marker = this.markerCache[id];

      if (isCluster && !marker) {
        const { point_count } = markerData.properties;
        marker = getClusterMarker({ pointCount: point_count, lngLat, clusterSource, id: markerData.properties.cluster_id, map });
      } else if (!isCluster && !marker) {
        marker = getPinMarker({
          markerData: markerData.properties,
          geometry: markerData._geometry,
          lngLat,
          selectedReport,
          detailId,
          onClick: this.props.onClick
        });
      }

      this.markerCache[id] = marker;
      newMarkers[id] = marker;

      if (!this.renderedMarkers[id]) {
        marker.addTo(map);
      }
    });

    Object.keys(this.renderedMarkers).forEach((id) => {
      if (!newMarkers[id]) {
        this.renderedMarkers[id].remove();
      }
    });

    this.renderedMarkers = newMarkers;

    return true;
  }

  render() {
    return null;
  }
}

export default ReportMarkers;

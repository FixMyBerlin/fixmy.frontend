import { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';

import BikeStandMarker from '~/images/reports/pin-meldung.png';

const Markers = {
  BIKE_STANDS: BikeStandMarker
};


function getClusterMarker({ html, map, clusterSource, id, lngLat }) {
  const el = document.createElement('div');
  el.className = 'reports-cluster';
  el.innerHTML = html;

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

function getPinMarker({ markerData, lngLat, selectedReport, detailId }) {
  const details = JSON.parse(markerData.details || {});
  const el = document.createElement('div');

  el.dataset.id = markerData.id;
  el.style.cursor = 'pointer';
  el.style.opacity = 1;

  if (selectedReport || detailId) {
    const activeId = selectedReport ? selectedReport.id : detailId;
    const isActive = markerData.id.toString() === activeId.toString();

    if (!isActive) {
      el.style.filter = 'brightness(1.1) grayscale(0.4)';
    }
  }

  el.innerHTML = `<img class="marker-image" src="${Markers[details.subject]}" />`;
  el.addEventListener('click', evt => this.props.onClick(evt, markerData));

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
        marker = getClusterMarker({ html: point_count, lngLat, clusterSource, id: markerData.properties.cluster_id, map });
      } else if (!isCluster && !marker) {
        marker = getPinMarker({ markerData: markerData.properties, lngLat, selectedReport, detailId });
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

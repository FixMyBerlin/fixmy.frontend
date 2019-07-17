import { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';

import BikeStandMarker from '~/images/reports/pin-meldung.png';

const Markers = {
  BIKE_STANDS: BikeStandMarker
};

// TODO: Establish a base Marker class that contains generic lifecycle logic to de-dupe
class ReportMarkers extends PureComponent {
  constructor() {
    super();

    this.markers = [];
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
    const { data, map, selectedReport, detailId } = this.props;
    if (!data || !map) {
      return false;
    }

    this.removeMarkers();

    this.markers = data.map((d) => {
      if (!Markers[d.details.subject]) {
        return null;
      }

      const lngLat = d.geometry.coordinates;
      const el = document.createElement('div');
      el.className = 'reports-marker';
      el.dataset.id = d.id;
      el.style.cursor = 'pointer';
      el.style.opacity = 1;

      if (selectedReport || detailId) {
        const activeId = selectedReport ? selectedReport.id : detailId;
        const isActive = d.id.toString() === activeId.toString();

        if (!isActive) {
          el.style.filter = 'brightness(1.1) grayscale(0.4) opacity(0.8)';
        }
      }

      el.innerHTML = `<img class="marker-image" src="${Markers[d.details.subject]}" />`;
      el.addEventListener('click', evt => this.props.onClick(evt, d));

      return new MapboxGL.Marker(el)
        .setLngLat(lngLat)
        .setOffset([0, -20])
        .addTo(map);
    });

    return true;
  }

  render() {
    return null;
  }
}

export default ReportMarkers;

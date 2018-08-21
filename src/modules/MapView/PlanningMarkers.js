import { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import { injectGlobal } from 'styled-components';

import DraftMarker from '~/images/planning-icons/konzept-marker.png';
import PlanningMarker from '~/images/planning-icons/planung-marker.png';
import ExecutionMarker from '~/images/planning-icons/bau-marker.png';
import ReadyMarker from '~/images/planning-icons/fertig-marker.png';

import { getCenterFromGeom } from './map-utils';

injectGlobal([`
  .marker {
    width: 32px;

    .marker-image {
      width: 100%;
    }
  }
`]);

const Markers = {
  draft: DraftMarker,
  planning: PlanningMarker,
  execution: ExecutionMarker,
  ready: ReadyMarker
};

class PlanningMarkers extends PureComponent {
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

  removeMarkers = () => {
    this.markers.forEach(marker => marker && marker.remove());
    this.markers = [];
  }

  updateMarkers = () => {
    const { active, data, map } = this.props;

    if (!data || !map) {
      return false;
    }

    this.removeMarkers();

    if (active) {
      this.markers = data.map((d) => {
        if (!Markers[d.phase]) {
          return null;
        }

        const center = getCenterFromGeom(d.geometry);
        const el = document.createElement('div');
        el.className = 'marker';
        el.innerHTML = `<img class="marker-image" src="${Markers[d.phase]}" />`;
        // el.addEventListener('click', () => this.props.onClick(d));

        return new MapboxGL.Marker(el)
          .setLngLat(center)
          .setOffset([0, -20])
          .addTo(map);
      });
    }
  }

  render() {
    return null;
  }
}

export default PlanningMarkers;

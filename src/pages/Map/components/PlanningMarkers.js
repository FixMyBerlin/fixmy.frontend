import { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';

import DraftMarker from '~/images/planning-icons/konzept-marker.png';
import PlanningMarker from '~/images/planning-icons/planung-marker.png';
import ExecutionMarker from '~/images/planning-icons/bau-marker.png';
import ReadyMarker from '~/images/planning-icons/fertig-marker.png';

const Markers = {
  draft: DraftMarker,
  planning: PlanningMarker,
  execution: ExecutionMarker,
  ready: ReadyMarker
};

const phasesOrder = Object.keys(Markers);

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
    this.markers.forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });
    this.markers = [];
  }

  updateMarkers = () => {
    const { active, data, map } = this.props;
    if (!data || !map) {
      return false;
    }

    this.removeMarkers();

    if (!active) {
      return false;
    }

    this.markers = data.map((d) => {
      // @TODO remove when api has all the data
      d.phase = d.phase || 'draft';

      if (!Markers[d.phase]) {
        return null;
      }

      const phaseIndex = phasesOrder.indexOf(d.phase);
      if (!this.props.filterPlannings[phaseIndex]) {
        return null;
      }

      const center = d.center.coordinates;
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `<img class="marker-image" src="${Markers[d.phase]}" />`;
      el.dataset.phase = d.phase;
      el.addEventListener('click', evt => this.props.onClick(evt, d));

      return new MapboxGL.Marker(el)
        .setLngLat(center)
        .setOffset([0, -20])
        .addTo(map);
    });

    return true;
  }

  render() {
    return null;
  }
}

export default PlanningMarkers;

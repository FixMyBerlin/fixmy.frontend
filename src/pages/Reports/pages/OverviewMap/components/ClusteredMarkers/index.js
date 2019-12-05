import React from 'react';
import PropTypes from 'prop-types';
import GeoPropTypes from 'geojson-prop-types';

import FMCPropTypes from '~/propTypes';

import {
  createPinMarker,
  createClusterMarker,
  setupClusters
} from './marker-utils';

/**
 * This component does not render to the dom but clusters report markers
 * once they are loaded into the map through the Mapbox API
 */
class ClusteredMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.markerCache = {};
    this.renderedMarkers = {};

    this.state = {
      clusters: [],
      clusterSource: null,
      clusterCreated: false
    };
  }

  componentDidMount() {
    this.createClusters();
    this.updateMarkers();
  }

  componentDidUpdate() {
    this.createClusters();
  }

  createClusters() {
    if (this.state.clusterCreated || !this.props.map) {
      return;
    }

    const { map, name, data, radius } = this.props;

    setupClusters(name, map, data, radius, () => this.updateCluster());

    this.setState({
      clusterSource: map.getSource(name),
      clusterCreated: true
    });
  }

  removeMarkers() {
    this.markers.forEach((marker) => {
      if (marker) {
        marker.remove();
      }
    });
    this.markers = [];
  }

  updateCluster() {
    const clusters = this.props.map.querySourceFeatures(this.props.name);

    this.setState({ clusters });
    this.updateMarkers();
  }

  updateMarkers() {
    const { data, detailId, map, selectedReport } = this.props;
    const { clusters, clusterSource } = this.state;
    const newMarkers = {};

    if (!data || !map) return;

    clusters.forEach((markerData) => {
      const lngLat = markerData.geometry.coordinates;
      const isCluster = markerData.properties.cluster;
      const id = isCluster
        ? `cluster_${markerData.properties.cluster_id}`
        : markerData.properties.id;
      let marker = this.markerCache[id];

      if (isCluster && !marker) {
        marker = createClusterMarker({
          id: markerData.properties.cluster_id,
          pointCount: markerData.properties.point_count,
          lngLat,
          clusterSource,
          map
        });
      } else if (!isCluster && !marker) {
        marker = createPinMarker({
          markerData: markerData.properties,
          // eslint-disable-next-line no-underscore-dangle
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
      if (!newMarkers[id]) this.renderedMarkers[id].remove();
    });

    this.renderedMarkers = newMarkers;
  }

  render() {
    return null;
  }
}

ClusteredMarkers.propTypes = {
  data: GeoPropTypes.FeatureCollection,
  map: FMCPropTypes.map,
  name: PropTypes.string,
  radius: PropTypes.number,
  detailId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedReport: FMCPropTypes.report.isRequired
};

ClusteredMarkers.defaultProps = {
  name: 'cluster',
  radius: 50,
  data: [],
  map: null
};

export default ClusteredMarkers;

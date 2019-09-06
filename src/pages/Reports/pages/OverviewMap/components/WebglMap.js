/* eslint-disable react/forbid-prop-types */ // TODO: state props types properly,
import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';

import BaseMap from '~/pages/Reports/components/BaseMap';
import ClusterWrapper from './ClusterWrapper';
import ReportMarkersClustered from './ReportMarkersClustered';
import ReportMarkers from './ReportMarkers';

function toFeature(d) {
  const { geometry, ...properties } = d;

  return {
    type: 'Feature',
    geometry,
    properties
  };
}

function toGeojson(data) {
  return {
    type: 'FeatureCollection',
    features: data.map(toFeature)
  };
}

class WebglMap extends PureComponent {
  static propTypes = {
    reportsData: PropTypes.array,
    center: PropTypes.array,
    onLoad: PropTypes.func,
    onMove: PropTypes.func,
    disabled: PropTypes.bool,
    zoomControlPosition: PropTypes.string,
    selectedMarkerZoomLevel: PropTypes.number,
    fitExtentOnPopupClose: PropTypes.bool
  }

  static defaultProps = {
    reportsData: [],
    center: null,
    onLoad: () => {},
    onMove: () => {},
    disabled: false,
    zoomControlPosition: 'bottom-left',
    selectedMarkerZoomLevel: 14,
    fitExtentOnPopupClose: true
  }

  nav = new MapboxGL.NavigationControl({ showCompass: false })

  map = null

  componentDidUpdate() {
    if (!this.map) {
      return false;
    }

    const {
      center,
      disabled,
      fitExtentOnPopupClose,
      selectedMarkerZoomLevel
    } = this.props;

    if (center) {
      this.map.easeTo({ center, zoom: selectedMarkerZoomLevel });
    } else if (fitExtentOnPopupClose) {
        this.map.fitBounds(config.reportsMap.bounds);
      }

    this.toggleMapInteractivity(disabled);
  }

  onLoad(map) {
    this.map = map;
    this.toggleZoomControl();

    // in order to rerender Report Markers
    this.forceUpdate();

    // notify containers that map has been initialized
    this.props.onLoad(map);
  }

  toggleZoomControl = (isActive = false) => {
    if (isActive) {
      this.map.addControl(this.nav, this.props.zoomControlPosition);
    } else {
      try {
        this.map.removeControl(this.nav);
      } catch(e) {}
    }
  }

  toggleMapInteractivity(disabled) {
    if (disabled) {
      this.map.dragPan.disable();
    } else {
      this.map.dragPan.enable();
    }

    this.toggleZoomControl(!disabled);
  }

  render() {
    const { reportsData, onMarkerClick, selectedReport, detailId } = this.props;

    return (
      <BaseMap
        onLoad={map => this.onLoad(map)}
        onMove={() => this.props.onMove()}
      >
        {/*<ReportMarkers
          map={this.map}
          data={reportsData}
          onClick={onMarkerClick}
          selectedReport={selectedReport}
          detailId={detailId}
        />*/}
        {reportsData.length && (
          <ClusterWrapper
            name="reports-cluster"
            map={this.map}
            data={toGeojson(reportsData)}
            radius={60}
            render={({ clusters, clusterSource }) => (
              <ReportMarkersClustered
                map={this.map}
                data={reportsData}
                onClick={onMarkerClick}
                selectedReport={selectedReport}
                detailId={detailId}
                clusters={clusters}
                clusterSource={clusterSource}
              />
            )}
          />
        )}
      </BaseMap>
    );
  }
}

export default withRouter(WebglMap);

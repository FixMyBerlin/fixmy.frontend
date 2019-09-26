import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';

import BaseMap from '~/pages/Reports/components/BaseMap';
import ClusteredMarkers from './ClusteredMarkers';
import FMCPropTypes from '~/propTypes';

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
    center: PropTypes.arrayOf(PropTypes.number),
    detailId: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    fitExtentOnPopupClose: PropTypes.bool,
    onLoad: PropTypes.func,
    onMarkerClick: PropTypes.func.isRequired,
    onMove: PropTypes.func,
    reportsData: PropTypes.arrayOf(FMCPropTypes.report),
    selectedReport: FMCPropTypes.report,
    zoomControlPosition: PropTypes.string
  };

  static defaultProps = {
    reportsData: [],
    center: null,
    onLoad: () => {},
    onMove: () => {},
    detailId: null,
    disabled: false,
    zoomControlPosition: 'bottom-left',
    fitExtentOnPopupClose: true,
    selectedReport: null,
    error: null
  };

  nav = new MapboxGL.NavigationControl({ showCompass: false });

  map = null;

  componentDidUpdate() {
    if (!this.map) {
      return;
    }

    const { center, disabled, fitExtentOnPopupClose } = this.props;

    if (center) {
      this.map.easeTo({ center });
    } else if (fitExtentOnPopupClose) {
      this.map.fitBounds(config.reportsMap.bounds);
    }

    this.toggleMapInteractivity(disabled);
  }

  onLoad(map) {
    this.map = map;
    this.toggleZoomControl(true);

    // in order to rerender Report Markers
    this.forceUpdate();

    // notify containers that map has been initialized
    this.props.onLoad(map);
  }

  toggleZoomControl = (isActive = false) => {
    if (isActive) {
      this.map.addControl(this.nav, this.props.zoomControlPosition);
    } else {
      this.map.removeControl(this.nav);
    }
  };

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
        onLoad={(map) => this.onLoad(map)}
        onMove={() => this.props.onMove()}
      >
        {reportsData.length > 0 && (
          <ClusteredMarkers
            data={toGeojson(reportsData)}
            map={this.map}
            name="reports-cluster"
            radius={60}
            detailId={detailId}
            onClick={onMarkerClick}
            selectedReport={selectedReport}
          />
        )}
      </BaseMap>
    );
  }
}

export default withRouter(WebglMap);

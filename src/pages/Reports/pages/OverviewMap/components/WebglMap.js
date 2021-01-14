import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import debug from 'debug';

import FMCPropTypes from '~/pages/Reports/propTypes';
import config from '~/pages/Reports/config';
import BaseMap from '~/pages/Reports/components/BaseMap';
import ClusteredMarkers from './ClusteredMarkers';

const logger = debug('fmc:reports:WebglMap.js');

function toFeature(d) {
  const { geometry, ...properties } = d;

  return {
    type: 'Feature',
    geometry,
    properties,
  };
}

function toGeojson(data) {
  return {
    type: 'FeatureCollection',
    features: data.map(toFeature),
  };
}

// we wrap this with a try catch in order to prevent a crash on IE11
try {
  MapboxGL.clearStorage((err) => {
    logger('Clearing Mapbox cache');
    if (err) logger('Error clearing Mapbox storage:', err);
  });
} catch (e) {
  logger('Error clearing Mapbox storage:', e);
}

class WebglMap extends PureComponent {
  nav = new MapboxGL.NavigationControl({ showCompass: false });

  map = null;

  componentDidUpdate() {
    if (!this.map) {
      return;
    }

    const { center, disabled, isCTAButtonShifted } = this.props;

    if (center) this.pointMapAt(center);

    // Reset camera offset when the details panel is not open
    if (!isCTAButtonShifted && this.map.getPadding().right > 0)
      this.map.easeTo({ padding: { right: 0 } });

    this.toggleMapInteractivity(disabled);
  }

  onBaseMapLoad = (map) => {
    logger('onLoad');
    this.map = map;
    this.toggleZoomControl(true);

    // in order to rerender Report Markers
    this.forceUpdate();

    // notify containers that map has been initialized
    this.props.onLoad(map);
  };

  /**
   * Ease map to new location, adjusting zoom level and offset for details panel
   *
   * @param {Object} center coordinates for camera target
   */
  pointMapAt = (center) => {
    const newCameraOptions = { center };
    const { isCTAButtonShifted, zoomIn } = this.props;
    const zoomTarget = config.reports.overviewMap.zoomDeepLinkedMarkers || 16;

    if (isCTAButtonShifted) newCameraOptions.padding = { right: 400 };
    if (zoomIn && this.map.getZoom() < zoomTarget) {
      newCameraOptions.zoom = zoomTarget;
      logger(`Ease map and zoom camera:`, newCameraOptions);
    } else {
      logger(`Ease map to camera:`, newCameraOptions);
    }
    this.map.easeTo(newCameraOptions);
  };

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
    const {
      reportsData,
      onMarkerClick,
      selectedReport,
      detailId,
      setHoveredReport,
      unSetHoveredReport,
      arcLayerProps,
    } = this.props;

    const isReportsDataLoaded = !!reportsData.length;

    return (
      <BaseMap
        onLoad={this.onBaseMapLoad}
        onMove={this.props.onMove}
        didOverlayLoad={isReportsDataLoaded}
        arcLayerProps={arcLayerProps}
      >
        {isReportsDataLoaded > 0 && (
          <ClusteredMarkers
            data={toGeojson(reportsData)}
            map={this.map}
            name="reports-cluster"
            radius={60}
            detailId={detailId}
            onClick={onMarkerClick}
            selectedReport={selectedReport}
            setHoveredReport={setHoveredReport}
            unSetHoveredReport={unSetHoveredReport}
          />
        )}
      </BaseMap>
    );
  }
}

WebglMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoomIn: PropTypes.bool,
  detailId: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.shape({ message: PropTypes.string }),
  onLoad: PropTypes.func,
  onMarkerClick: PropTypes.func.isRequired,
  onMove: PropTypes.func,
  reportsData: PropTypes.arrayOf(FMCPropTypes.report),
  selectedReport: FMCPropTypes.report,
  arcLayerProps: FMCPropTypes.arcLayerProps,
  zoomControlPosition: PropTypes.string,
  setHoveredReport: PropTypes.func.isRequired,
  unSetHoveredReport: PropTypes.func.isRequired,
  isCTAButtonShifted: PropTypes.bool,
};

WebglMap.defaultProps = {
  reportsData: [],
  arcLayerProps: null,
  center: null,
  zoomIn: true,
  onLoad: () => {},
  onMove: () => {},
  detailId: null,
  disabled: false,
  zoomControlPosition: 'bottom-left',
  selectedReport: null,
  error: null,
  isCTAButtonShifted: false,
};

export default withRouter(WebglMap);

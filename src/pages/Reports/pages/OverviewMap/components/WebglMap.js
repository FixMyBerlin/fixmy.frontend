import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import config from '~/pages/Reports/config';
import logger from '~/utils/logger';
import { BaseMap } from '~/pages/Reports/components/BaseMap';
import ClusteredMarkers from './ClusteredMarkers';
import FMCPropTypes from '~/pages/Reports/propTypes';
import ArcLayer from '~/utils/geo/arcLayer/ArcLayer';

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
  // instance of https://deck.gl/docs/api-reference/core/deck
  deck = null;

  componentDidUpdate() {
    if (!this.map) {
      return;
    }

    const { center, zoomIn, disabled, fitExtentOnPopupClose } = this.props;

    if (center) {
      const newCameraOptions = { center };
      if (zoomIn) {
        newCameraOptions.zoom =
          config.reports.overviewMap.zoomDeepLinkedMarkers || 16;
      }
      this.map.easeTo(newCameraOptions);
    } else if (fitExtentOnPopupClose) {
      this.map.fitBounds(config.reportsMap.bounds);
    }

    this.toggleMapInteractivity(disabled);
  }

  onLoad(map, deck) {
    this.map = map;
    this.deck = deck;
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
    const {
      reportsData,
      onMarkerClick,
      selectedReport,
      detailId,
      arcData
    } = this.props;

    const isReportsDataLoaded = !!reportsData.length;
    return (
      <BaseMap
        onLoad={(map) => this.onLoad(map)}
        onMove={() => this.props.onMove()}
        didOverlayLoad={isReportsDataLoaded}
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
          />
        )}
        <ArcLayer
          deck={this.deck}
          arcData={arcData}
          color={config.reports.overviewMap.arcColor}
        />
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
  fitExtentOnPopupClose: PropTypes.bool,
  onLoad: PropTypes.func,
  onMarkerClick: PropTypes.func.isRequired,
  onMove: PropTypes.func,
  reportsData: PropTypes.arrayOf(FMCPropTypes.report),
  arcData: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number))
  ),
  selectedReport: FMCPropTypes.report,
  zoomControlPosition: PropTypes.string
};

WebglMap.defaultProps = {
  arcData: [],
  reportsData: [],
  center: null,
  zoomIn: true,
  onLoad: () => {},
  onMove: () => {},
  detailId: null,
  disabled: false,
  zoomControlPosition: 'bottom-left',
  fitExtentOnPopupClose: true,
  selectedReport: null,
  error: null
};

export default withRouter(WebglMap);

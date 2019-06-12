/* eslint-disable react/forbid-prop-types */ // TODO: state props types properly,
import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';

import ReportMarkers from '~/pages/Reports/components/OverviewMap/ReportMarkers';
import BaseMap from '~/pages/Reports/components/BaseMap';

class WebglMap extends PureComponent {
  static propTypes = {
    reportsData: PropTypes.array,
    center: PropTypes.array,
    onLoad: PropTypes.func
  }

  static defaultProps = {
    reportsData: [],
    center: null,
    onLoad: () => {}
  }

  nav = new MapboxGL.NavigationControl({ showCompass: false })

  map = null

  componentDidUpdate() {
    if (!this.map) {
      return false;
    }

    if (this.props.center) {
      this.map.easeTo({ center: this.props.center, zoom: 14 });
    } else {
      this.map.fitBounds(config.reportsMap.bounds);
    }

    this.toggleMapInteractivity(this.props.disabled);
  }

  onLoad(map) {
    this.map = map;
    this.toggleZoomControl();

    // in order to rerender Report Markers
    this.forceUpdate();

    // notify containers that map has been initialized
    this.props.onLoad();
  }

  toggleZoomControl = (isActive) => {
    if (isActive) {
      this.map.addControl(this.nav, 'bottom-left');
    } else {
      this.map.removeControl(this.nav);
    }
  }

  toggleMapInteractivity(isInteractive) {
    if (isInteractive) {
      this.map.dragPan.enable();
    } else {
      this.map.dragPan.disable();
    }
    this.toggleZoomControl(isInteractive);
  }

  render() {
    const { reportsData, onMarkerClick } = this.props;

    return (
      <BaseMap
        onLoad={map => this.onLoad(map)}
      >
        <ReportMarkers
          map={this.map}
          data={reportsData}
          onClick={onMarkerClick}
        />
      </BaseMap>
    );
  }
}

export default withRouter(WebglMap);

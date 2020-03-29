import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _isEqual from 'lodash.isequal';
import MapboxGL from 'mapbox-gl';

import config from '~/pages/Reports/config';
import { animateView, setView } from '~/pages/Map/map-utils';
import BaseMap from '~/pages/Reports/components/BaseMap';

class WebglMap extends PureComponent {
  map = null;

  maxExtent = null;

  nav = new MapboxGL.NavigationControl({ showCompass: false });

  constructor(props) {
    super(props);
    this.maxExtent = this.addPaddingToBounds(
      config.reports.overviewMap.maxBounds
    );
  }

  componentDidUpdate(prevProps) {
    if (!this.map) return;

    if (
      this.props.zoomedOut &&
      config.reports.form?.zoomOutForInvalidLocations !== false
    ) {
      this.map.easeTo({ zoom: 12, duration: 3000 });
    }
    const isNewLocation = !_isEqual(prevProps.center, this.props.center);
    if (isNewLocation) {
      this.setView(this.getViewFromProps(), this.props.animate);
    }
    const allowDragChanged = prevProps.allowDrag !== this.props.allowDrag;
    if (allowDragChanged) {
      const dragPanHandler = this.map.dragPan;
      const updateDragPanFunc = this.props.allowDrag
        ? dragPanHandler.enable
        : dragPanHandler.disable;
      updateDragPanFunc.call(dragPanHandler);
    }
  }

  addPaddingToBounds = (bounds) => {
    const PADDING_IN_DEG = config.reports.locateMeMap.paddingInDegree || 0.2;
    const [sw, ne] = bounds;
    const moreSw = sw.map((coord) => coord - PADDING_IN_DEG);
    const moreNe = ne.map((coord) => coord + PADDING_IN_DEG);

    return [moreSw, moreNe];
  };

  onLoad = (map) => {
    this.map = map;

    // center prop might have been set by getting the device´s geolocation before the component sets up.
    // otherwise the map will be left already centered according to its configured bounds
    const isMapLoadedWithCenter = !this.props.center;
    if (!isMapLoadedWithCenter) {
      this.map.setZoom(this.props.newLocationZoomLevel);
      this.map.setCenter(this.props.center);
      this.handleMoveEnd();
    }

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('zoomend', this.handleMoveEnd);

    // add controls
    const { zoomControlPosition } = this.props;
    if (zoomControlPosition)
      this.map.addControl(this.nav, this.props.zoomControlPosition);

    // notify containers that map has been initialized
    this.props.onLoad();
  };

  setView = (view, animate = false) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  };

  getViewFromProps = () => ({
    zoom: this.props.newLocationZoomLevel,
    center: this.props.center
  });

  handleMoveEnd = ({programmaticMove}) => {
    if (programmaticMove) return;
    const mapCenter = this.map.getCenter();
    const { lat, lng } = mapCenter;
    this.props.onMapMove({ lat, lng });
  };

  render() {
    return (
      <BaseMap maxBounds={this.maxExtent} onLoad={(map) => this.onLoad(map)} />
    );
  }
}

WebglMap.propTypes = {
  animate: PropTypes.bool,
  center: PropTypes.arrayOf(PropTypes.number),
  newLocationZoomLevel: PropTypes.number,
  onMapMove: PropTypes.func,
  allowDrag: PropTypes.bool,
  onLoad: PropTypes.func,
  zoomedOut: PropTypes.bool,
  zoomControlPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

WebglMap.defaultProps = {
  animate: false,
  center: null,
  newLocationZoomLevel: 18,
  onMapMove: () => {},
  allowDrag: true,
  onLoad: () => {},
  zoomedOut: false,
  zoomControlPosition: false
};

export default withRouter(WebglMap);

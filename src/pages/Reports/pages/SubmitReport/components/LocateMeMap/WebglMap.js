import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';
import PropTypes from 'prop-types';
import _isEqual from 'lodash.isequal';

import { animateView, setView } from '~/pages/Map/map-utils';
import BaseMap from '~/pages/Reports/components/BaseMap';

class WebglMap extends PureComponent {
  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    newLocationZoomLevel: PropTypes.number,
    onMapDrag: PropTypes.func,
    allowDrag: PropTypes.bool,
    onLoad: PropTypes.func,
    zoomedOut: PropTypes.bool
  }

  static defaultProps = {
    center: config.map.view.center,
    newLocationZoomLevel: 18,
    onMapDrag: () => console.log('onMapDrag says implement me'),
    allowDrag: true,
    onLoad: () => {},
    zoomedOut: false
  }

  map = null

  maxExtent = null

  constructor(props) {
    super(props);
    this.maxExtent = this.addPaddingToBounds(config.reports.overviewMap.maxBounds);
  }

  componentDidUpdate(prevProps) {
    if (!this.map) {
      return false;
    }

    if (this.props.zoomedOut) {
       this.map.easeTo({ zoom: 12, duration: 3000 });
    }

    const isNewLocation = !_isEqual(prevProps.center, this.props.center);

    if (isNewLocation) {
      this.setView(this.getViewFromProps(), this.props.animate);
    }

    const allowDragChanged = prevProps.allowDrag !== this.props.allowDrag;
    if (allowDragChanged && this.map) {
      const dragPanHandler = this.map.dragPan;
      const updateDragPanFunc = this.props.allowDrag ? dragPanHandler.enable : dragPanHandler.disable;
      updateDragPanFunc.call(dragPanHandler);
    }
  }

  addPaddingToBounds = (bounds) => {
    const PADDING_IN_DEG = config.reports.locateMeMap.paddingInDegree || 0.2;
    const [sw, ne] = bounds;
    const moreSw = sw.map(coord => coord - PADDING_IN_DEG);
    const moreNe = ne.map(coord => coord + PADDING_IN_DEG);

    return [moreSw, moreNe];
  }

  onLoad = (map) => {
    this.map = map;

    // center prop might have been set by getting the device´s geolocation before the component sets up
    if (this.props.center !== config.map.view.center) {
      this.map.setZoom(this.props.newLocationZoomLevel);
      this.map.setCenter(this.props.center);
      this.handleMoveEnd();
    }

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('zoomEnd', this.handleMoveEnd);

    // notify containers that map has been initialized
    this.props.onLoad();
  }

  setView = (view, animate = false) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  }

  getViewFromProps = () => (
    {
      zoom: this.props.newLocationZoomLevel,
      center: this.props.center
    }
  )

  handleMoveEnd = () => {
    const mapCenter = this.map.getCenter();
    const { lat, lng } = mapCenter;
    this.props.onMapDrag({ lat, lng });
  }

  render() {
    return (
      <BaseMap
        maxBounds={this.maxExtent}
        onLoad={map => this.onLoad(map)}
      />
    );
  }
}

export default withRouter(WebglMap);

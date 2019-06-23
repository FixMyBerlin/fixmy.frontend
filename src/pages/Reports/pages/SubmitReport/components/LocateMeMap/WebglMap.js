import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';
import PropTypes from 'prop-types';
import _isEqual from 'lodash.isequal';

import { animateView, setView } from '~/pages/Map/map-utils';
import BaseMap from '~/pages/Reports/components/BaseMap';

class WebglMap extends PureComponent {
  static propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    onMapDrag: PropTypes.func,
    allowDrag: PropTypes.bool,
    onLoad: PropTypes.func,
    zoomedOut: PropTypes.bool
  }

  static defaultProps = {
    center: config.map.view.center,
    zoom: 18, // TODO: make this configurable
    onMapDrag: () => console.log('onMapDrag says implement me'),
    allowDrag: true,
    onLoad: () => {},
    zoomedOut: false
  }

  map = null

  maxExtent = null

  constructor(props) {
    super(props);
    this.maxExtent = this.addPaddingToBounds(config.reportsMap.maxBounds);
  }

  componentDidUpdate(prevProps) {
    if (!this.map) {
      return false;
    }

    if (this.props.zoomedOut) {
       this.map.easeTo({ zoom: 12, duration: 3000 });
    }

    const viewChanged = prevProps.zoom !== this.props.zoom ||
      !_isEqual(prevProps.center, this.props.center) ||
      prevProps.pitch !== this.props.pitch ||
      prevProps.bearing !== this.props.bearing;

    if (viewChanged) {
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
    const PADDING_IN_DEG = config.reportsLocateMeMap.paddingInDegree || 0.2;
    const [sw, ne] = bounds;
    const moreSw = sw.map(coord => coord - PADDING_IN_DEG);
    const moreNe = ne.map(coord => coord + PADDING_IN_DEG);

    return [moreSw, moreNe];
  }

  onLoad = (map) => {
    this.map = map;

    // center prop might have been set by getting the device´s geolocation before the component sets up
    if (this.props.center !== config.map.view.center) {
      this.map.setZoom(this.props.zoom);
      this.map.setCenter(this.props.center);
      this.handleMoveEnd();
    }

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);
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
      zoom: this.props.zoom,
      center: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch
    }
  )

  handleMoveEnd = () => {
    const mapCenter = this.map.getCenter();
    const { lat, lng } = mapCenter;
    this.props.onMapDrag({ lat, lng });
  }

  // in case we need it later on
  handleMove = () => {}

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

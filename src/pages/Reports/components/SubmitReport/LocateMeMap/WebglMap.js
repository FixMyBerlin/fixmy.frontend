import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEqual from 'lodash.isequal';
import { animateView, setView } from '~/pages/Map/map-utils';

const StyledMap = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const MB_STYLE_URL = `${config.reportsOverViewMap.style}?fresh=true`;
MapboxGL.accessToken = MapboxGL.accessToken || config.map.accessToken;


class WebglMap extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    onMapDrag: PropTypes.func,
    allowDrag: PropTypes.bool
  };

  static defaultProps = {
    className: 'locator-map',
    center: config.map.view.center,
    zoom: 18, // TODO: make this configurable
    onMapDrag: () => console.log('onMapDrag says implement me'),
    allowDrag: true
  };

  state = {
    loading: true
  };

  componentDidMount() {
    // set up mapbox-gl js map
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL,
      bounds: config.reportsOverViewMap.bounds,
      // add enough padding to allow mapCenter to be moved to the outer boundary of the area of interest
      maxBounds: this.addPaddingToBounds(config.reportsOverViewMap.maxBounds)
    });

    this.map.on('load', this.handleLoad);
  }

  componentDidUpdate(prevProps) {
    if (this.state.loading) {
      return false;
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
  };

  handleLoad = () => {
    this.setState({ loading: false });

    // center prop might have been set by getting the device´s geolocation before the component sets up
    if (this.props.center !== config.map.view.center) {
      this.map.setZoom(this.props.zoom);
      this.map.setCenter(this.props.center);
      this.handleMoveEnd();
    }

    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);
  };

  setView = (view, animate = false) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  };

  getViewFromProps = () => (
    {
      zoom: this.props.zoom,
      center: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch
    }
  );

  handleMoveEnd = () => {
    const mapCenter = this.map.getCenter();
    const { lat, lng } = mapCenter;
    this.props.onMapDrag({ lat, lng });
  };

  handleMove = () => {

  };


  render() {
    const { className } = this.props;
    return (
      <StyledMap
        className={className}
        ref={(ref) => {
          this.root = ref;
        }}
      />
    );
  }
}

export default withRouter(WebglMap);

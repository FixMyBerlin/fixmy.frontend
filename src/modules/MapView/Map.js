import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';
import idx from 'idx';
import PropTypes from 'prop-types';
import withRouter from 'react-router/withRouter';
import turfCenter from '@turf/center';

import Store from '~/redux/store';
import { arrayIsEqual } from '~/utils';
import { isSmallScreen } from '~/style-utils';
import * as AppActions from '~/modules/App/AppState';
import * as MapActions from './MapState';
import {
  colorizeHbiLines, animateView, setView, colorizePlanningLines, toggleLayer, filterLayersById
} from './map-utils';

const MB_STYLE_URL = `${config.map.style}?fresh=true`;
MapboxGL.accessToken = config.map.accessToken;

const StyledMap = styled.div`
  width: 100%;
  flex: 1;
`;

class Map extends PureComponent {
  static propTypes = {
    zoom: PropTypes.number,
    center: PropTypes.arrayOf(PropTypes.number),
    pitch: PropTypes.number,
    bearing: PropTypes.number,
    show3dBuildings: PropTypes.bool,
    animate: PropTypes.bool,
    setMapContext: PropTypes.func,
    activeLayer: PropTypes.string,
    activeSection: PropTypes.number,
    hasMoved: PropTypes.bool,
    calculatePopupPosition: PropTypes.bool,
    drawOverlayLine: PropTypes.bool,
    dim: PropTypes.bool
  }

  static defaultProps = {
    zoom: config.map.view.zoom,
    center: config.map.view.center,
    pitch: config.map.view.pitch,
    bearing: config.map.view.bearing,
    show3dBuildings: true,
    animate: false,
    activeLayer: null,
    activeSection: null,
    setMapContext: () => {},
    hasMoved: false,
    calculatePopupPosition: false,
    drawOverlayLine: true,
    dim: false
  }

  state = {
    loading: true,
    popupLngLat: false
  }

  componentDidMount() {
    this.map = new MapboxGL.Map({
      container: this.root,
      style: MB_STYLE_URL
    });

    this.setView(this.getViewFromProps(), false);
    this.map.on('load', this.handleLoad);
    this.props.setMapContext(this.map);

    window.map = this.map;
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

    const layerChanged = prevProps.activeLayer !== this.props.activeLayer ||
      prevProps.activeSection !== this.props.activeSection ||
      prevProps.show3dBuildings !== this.props.show3dBuildings ||
      !_isEqual(prevProps.filterHbi, this.props.filterHbi);

    if (layerChanged) {
      this.updateLayers();
    }

    if (!this.props.activeSection && this.state.popupLngLat) {
      this.disablePopup();
    }

    if (this.props.match.url === '/my-hbi' && !arrayIsEqual(prevProps.hbi_values, this.props.hbi_values)) {
      colorizeHbiLines(this.map, this.props.hbi_values);
    }

    return this.map.resize();
  }

  getViewFromProps = () => (
    {
      zoom: this.props.zoom,
      center: this.props.center,
      bearing: this.props.bearing,
      pitch: this.props.pitch
    }
  )

  setView = (view, animate) => {
    if (animate) {
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  }

  disablePopup() {
    this.setState({ popupLngLat: null });
  }

  handleLoad = () => {
    this.map.on('click', config.map.layers.bgLayer, this.handleClick);
    this.map.on('dragend', this.handleMoveEnd);
    this.map.on('move', this.handleMove);

    this.updateLayers();

    this.setView(this.getViewFromProps(), this.props.animate);
    this.setState({ loading: false });

    this.map.resize();
  }

  updateLayers = () => {
    const filterId = this.props.activeSection;

    if (this.props.activeLayer === 'zustand') {
      colorizeHbiLines(this.map, this.props.hbi_values, this.props.filterHbi);
    }

    if (this.props.activeLayer === 'planungen') {
      colorizePlanningLines(this.map);
    }

    toggleLayer(this.map, config.map.layers.buildings3d, this.props.show3dBuildings);
    toggleLayer(this.map, config.map.layers.dimmingLayer, this.props.dim);
    toggleLayer(this.map, config.map.layers.overlayLine, this.props.drawOverlayLine);

    filterLayersById(this.map, filterId);
  }

  handleClick = (e) => {
    const properties = idx(e.features, _ => _[0].properties);
    const geometry = idx(e.features, _ => _[0].geometry);

    const center = geometry ? turfCenter(geometry).geometry.coordinates : [e.lngLat.lng, e.lngLat.lat];

    // @TODO: how can we handle these planning urls/ ids better?
    const sideNonePlanningUrl = properties.side0_planning_url || properties.side0_planning_url || properties.sideNone_planning_url;
    const id = this.props.activeView === 'planungen' ? sideNonePlanningUrl.match(/\d/)[0] : properties.id;
    console.log(properties)
    if (properties) {
      // when user is in detail mode, we don't want to show the tooltip again,
      // but directly switch to another detail view
      if (this.props.activeSection && !this.props.displayPopup) {
        const detailRoute = `/${this.props.activeView}/${id}`;
        this.props.history.push(detailRoute);
      } else {
        Store.dispatch(MapActions.setPopupData(properties));
        Store.dispatch(MapActions.setPopupVisible(true));
      }

      Store.dispatch(AppActions.setActiveSection(properties.id));
      Store.dispatch(MapActions.setView({
        center,
        animate: true,
        zoom: isSmallScreen() ? config.map.zoomAfterGeocode : this.map.getZoom()
      }));

      this.handleMove();
    }

    if (geometry && this.props.calculatePopupPosition) {
      this.setState({ popupLngLat: center });
      const projCenter = this.map.project(center);
      Store.dispatch(MapActions.setPopupLocation(projCenter));
    }
  }

  handleMoveEnd = () => {
    if (!this.props.hasMoved) {
      Store.dispatch(MapActions.setHasMoved(true));
    }
  }

  handleMove = () => {
    if (this.state.popupLngLat && this.props.calculatePopupPosition) {
      const center = this.map.project(this.state.popupLngLat);
      Store.dispatch(MapActions.setPopupLocation(center));
    }
  }

  render() {
    return (
      <StyledMap className={this.props.className} innerRef={(ref) => { this.root = ref; }}>
        {this.props.children}
      </StyledMap>
    );
  }
}

export default withRouter(Map);

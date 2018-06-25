/* eslint-disable */
import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';
import idx from 'idx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import 'mapbox-gl/dist/mapbox-gl.css';

import Store from '~/redux/store';

import * as MapActions from './MapState';
import MapUtils from './map-utils';
import { arrayIsEqual } from '~/utils';

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
    updateView: PropTypes.func,
    activeLayer: PropTypes.string,
    activeSection: PropTypes.object,
    accessToken: PropTypes.string.isRequired,
    hasMoved: PropTypes.bool
  }

  static defaultProps = {
    zoom: config.map.views.default.zoom,
    center: config.map.views.default.center,
    pitch: config.map.views.default.pitch,
    bearing: config.map.views.default.bearing,
    show3dBuildings: true,
    animate: true,
    activeLayer: null,
    activeSection: null,
    updateView: () => {},
    hasMoved: false
  }

  state = {
    loading: true
  }

  componentDidMount() {
    MapboxGL.accessToken = this.props.accessToken;
    
    const mbStyleUrl = `${config.map.style}?fresh=true`;

    this.map = new MapboxGL.Map({
      container: this.root,
      style: mbStyleUrl
    });

    this.setView(this.getViewFromProps(), false);
    this.map.on('load', this.handleLoad);

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
      prevProps.show3dBuildings !== this.props.show3dBuildings;

    if (layerChanged) {
      this.updateLayers();
    }

    if (prevProps.location !== this.props.location || layerChanged) {
      this.map.resize();
    }

    if (this.props.match.url === '/my-hbi' && !arrayIsEqual(prevProps.hbi_values, this.props.hbi_values)) {
      MapUtils.colorizeHbiLines(this.map, this.props.hbi_values);
    }

    return true;
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
      MapUtils.animateView(this.map, view);
    } else {
      MapUtils.setView(this.map, view);
    }
  }

  handleLoad = () => {
    this.map.on('click', config.map.layers.bgLayer, this.handleClick);
    this.map.on('dragend', this.handleMove);

    this.updateLayers();

    this.setView(this.getViewFromProps(), this.props.animate);
    this.setState({ loading: false });
  }

  updateLayers = () => {
    const filterId = idx(this.props, _ => _.activeSection.id);

    console.log(this.props.activeLayer);
    if (this.props.activeLayer === 'zustand') {
      MapUtils.colorizeHbiLines(this.map, this.props.hbi_values);
    }

    if (this.props.activeLayer === 'planungen') {
      MapUtils.colorizePlanningLines(this.map);
    }

    MapUtils.filterLayersById(this.map, filterId);

    MapUtils.toggleLayer(this.map, config.map.layers.buildings3d, this.props.show3dBuildings);
    MapUtils.toggleLayer(this.map, config.map.layers.dimmingLayer, !!this.props.activeSection);
  }

  handleClick = (e) => {
    const properties = idx(e, _ => _.features[0].properties);

    if (properties) {
      Store.dispatch(MapActions.setSectionActive(properties));
      Store.dispatch(MapActions.setView({
        center: [e.lngLat.lng, e.lngLat.lat],
        animate: true,
        zoom: config.map.zoomAfterGeocode,
        show3dBuildings: true,
        pitch: 45
      }));

      this.handleMove();
    }
  }

  handleMove = () => {
    if (!this.props.hasMoved) {
      Store.dispatch(MapActions.setHasMoved(true));
    }
  }

  render() {
    return (
      <StyledMap innerRef={(ref) => { this.root = ref; }} />
    );
  }
}

export default withRouter(Map);

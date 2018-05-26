import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';
import idx from 'idx';
import PropTypes from 'prop-types';

import 'mapbox-gl/dist/mapbox-gl.css';

import { animateView, setView } from './map-utils';

const StyledMap = styled.div`
  height: 100%;
  width: 100%;
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
    accessToken: PropTypes.string.isRequired
  }

  static defaultProps = {
    zoom: config.map.views.default.zoom,
    center: config.map.views.default.center,
    pitch: config.map.views.default.pitch,
    bearing: config.map.views.default.bearing,
    show3dBuildings: true,
    animate: true,
    updateView: () => {}
  }

  state = {
    loading: true
  }

  componentDidMount() {
    MapboxGL.accessToken = this.props.accessToken;

    this.map = new MapboxGL.Map({
      container: this.root,
      style: config.map.style
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

    if (prevProps.show3dBuildings !== this.props.show3dBuildings) {
      this.update3dBuildings();
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
      animateView(this.map, view);
    } else {
      setView(this.map, view);
    }
  }

  handleLoad = () => {
    this.map.on('click', 'planungen-bg', this.handleClick);
    this.map.on('click', 'planungen-bg-inactive', this.handleClick);
    this.update3dBuildings();
    this.setView(this.getViewFromProps(), this.props.animate);
    this.setState({ loading: false });
  }

  update3dBuildings = () => {
    console.log(this.props.show3dBuildings);
    if (this.props.show3dBuildings) {
      this.map.setLayoutProperty('3d-buildings', 'visibility', 'visible');
    } else {
      this.map.setLayoutProperty('3d-buildings', 'visibility', 'none');
    }
  }

  handleClick = (e) => {
    const properties = idx(e, _ => _.features[0].properties);

    if (properties) {
      this.map.setFilter('planungen-bg', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s1', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s2', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);

      this.map.setFilter('planungen-bg-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s1-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s2-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);

      this.props.updateView({
        center: [e.lngLat.lng, e.lngLat.lat],
        animate: true,
        zoom: config.map.zoomAfterGeocode
      });
    }
  }

  render() {
    return (
      <StyledMap innerRef={(ref) => { this.root = ref; }} />
    );
  }
}

export default Map;

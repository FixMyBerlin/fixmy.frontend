import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';
import idx from 'idx';

import 'mapbox-gl/dist/mapbox-gl.css';

import { animateView, setView } from './map-utils';

const StyledMap = styled.div`
  height: 100%;
  width: 100%;
`;

class Map extends PureComponent {
  state = {
    loading: true
  }

  componentDidMount() {
    MapboxGL.accessToken = this.props.accessToken;

    this.map = new MapboxGL.Map({
      container: this.root,
      style: config.map.style
    });

    this.setView(this.props.view, false);
    this.map.on('load', this.handleLoad);

    window.map = this.map;
  }

  componentDidUpdate(prevProps) {
    if (!_isEqual(prevProps.view, this.props.view)) {
      this.setView(this.props.view, this.props.animate);
    }
  }

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
    this.setState({ loading: false });
  }

  handleClick = (e) => {
    console.log(e);
    const properties = idx(e, _ => _.features[0].properties);

    if (properties) {
      this.map.setFilter('planungen-bg', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s1', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s2', ['all', ['==', 'ELEM_NR', properties.ELEM_NR]]);

      this.map.setFilter('planungen-bg-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s1-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);
      this.map.setFilter('planungen-s2-inactive', ['all', ['!=', 'ELEM_NR', properties.ELEM_NR]]);

      this.props.handleLocationChange([e.lngLat.lng, e.lngLat.lat]);
    }
  }

  render() {
    return (
      <StyledMap innerRef={(ref) => { this.root = ref; }} />
    );
  }
}

export default Map;

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
    this.map.on('click', 'planning-sections-bg', this.handleClick);
    this.map.on('click', 'planning-sections-bg-inactive', this.handleClick);
    this.setState({ loading: false });
  }

  handleClick = (e) => {
    const properties = idx(e, _ => _.features[0].properties);

    if (properties) {
      this.map.setFilter('planning-sections-bg', ['all', ['==', 'id', properties.id], ['==', 'side', 0]]);
      this.map.setFilter('planning-sections-s1', ['all', ['==', 'id', properties.id], ['==', 'side', 0]]);
      this.map.setFilter('planning-sections-s2', ['all', ['==', 'id', properties.id], ['==', 'side', 0]]);

      this.map.setFilter('planning-sections-bg-inactive', ['all', ['!=', 'id', properties.id], ['==', 'side', 0]]);
      this.map.setFilter('planning-sections-s1-inactive', ['all', ['!=', 'id', properties.id], ['==', 'side', 0]]);
      this.map.setFilter('planning-sections-s2-inactive', ['all', ['!=', 'id', properties.id], ['==', 'side', 0]]);
    }
  }

  render() {
    return (
      <StyledMap innerRef={(ref) => { this.root = ref; }} />
    );
  }
}

export default Map;

import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';
import _isEqual from 'lodash.isequal';
import styled from 'styled-components';

import 'mapbox-gl/dist/mapbox-gl.css';

const StyledMap = styled.div`
  height: 100%;
  width: 100%;
`;

class Map extends PureComponent {
  componentDidMount() {
    MapboxGL.accessToken = this.props.accessToken;

    this.map = new MapboxGL.Map({
      container: this.root,
      style: config.map.style
    });

    this.setView(this.props.view, false);
  }

  componentDidUpdate(prevProps) {
    if (!_isEqual(prevProps.view, this.props.view)) {
      this.setView(this.props.view, this.props.animate);
    }
  }

  setView = (view, animate) => {
    if (animate) {
      this.map.flyTo({ center: view.center, zoom: view.zoom });
    } else {
      this.map.setZoom(view.zoom);
      this.map.setCenter(view.center);
    }
  }

  render() {
    return (
      <StyledMap innerRef={(ref) => { this.root = ref; }} />
    );
  }
}

export default Map;

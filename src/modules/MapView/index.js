import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Map from '~/components/Map';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = styled.div`
  height: 100%;
  width: 100%;
`;

class MapViewComponent extends PureComponent {
  render() {
    const zoom = this.props.location.pathname === '/map' ? 8 : 10;

    return (
      <MapView>
        <Map
          accessToken={config.map.accessToken}
          view={{
            center: [13, 52],
            zoom
          }}
          animate
        />
      </MapView>
    );
  }
}

export default withRouter(connect(state => state)(MapViewComponent));

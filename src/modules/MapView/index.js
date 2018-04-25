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
    const view = Object.assign({}, config.map.views.default, config.map.views[this.props.location.pathname] || {});

    return (
      <MapView>
        <Map
          accessToken={config.map.accessToken}
          view={view}
          animate
        />
      </MapView>
    );
  }
}

export default withRouter(connect(state => state)(MapViewComponent));

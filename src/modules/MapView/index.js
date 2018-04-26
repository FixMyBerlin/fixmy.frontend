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

const DisplayMapRoutes = ['/', '/zustand', '/planungen'];

class MapViewComponent extends PureComponent {
  render() {
    const { pathname } = this.props.location;

    if (!DisplayMapRoutes.includes(pathname)) {
      return null;
    }

    const view = Object.assign({}, config.map.views.default, config.map.views[pathname] || {});

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

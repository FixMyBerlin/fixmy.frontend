import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Map from '~/components/Map';
import LocatorControl from '~/components/LocatorControl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapView = styled.div`
  height: 100%;
  width: 100%;

  .mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right {
    position: fixed;
    z-index: 99999999;
  }
`;

class MapViewComponent extends PureComponent {
  render() {
    const { pathname } = this.props.location;
    const view = Object.assign({}, config.map.views.default, config.map.views[pathname] || {});

    return (
      <MapView>
        <Route
          path="/zustand"
          render={() => <LocatorControl key="LocatorControl" />}
        />
        <Route
          path="(/|/zustand|/planungen)"
          render={() => (
            <Map
              key="MapComponent"
              accessToken={config.map.accessToken}
              view={view}
              animate
            />
          )}
        />
      </MapView>
    );
  }
}

export default withRouter(connect(state => state)(MapViewComponent));

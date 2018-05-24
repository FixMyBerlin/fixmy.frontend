import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Map from '~/components/Map';
import SearchBar from '~/components/SearchBar';
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
  state = {
    userLocation: null
  }

  handleLocationChange = (userLocation) => {
    console.log(userLocation);
    this.setState({ userLocation });
  }

  render() {
    const { pathname } = this.props.location;
    const view = Object.assign({}, config.map.views.default, config.map.views[pathname] || {});

    // we need to overwrite the current position when the user has done geolocation
    if (this.state.userLocation) {
      view.center = this.state.userLocation;
      view.zoom = config.map.zoomAfterGeocode;
    }

    return (
      <MapView>
        <Route
          path="(/zustand|/planungen)"
          component={SearchBar}
        />
        <Route
          path="(/zustand|/planungen)"
          render={() => (
            <LocatorControl
              onChange={this.handleLocationChange}
              position="top-right"
            />
          )}
        />
        <Route
          path="(/|/zustand|/planungen)"
          render={() => (
            <Map
              key="MapComponent"
              accessToken={config.map.accessToken}
              view={view}
              animate
              handleLocationChange={this.handleLocationChange}
            />
          )}
        />
      </MapView>
    );
  }
}

export default withRouter(MapViewComponent);

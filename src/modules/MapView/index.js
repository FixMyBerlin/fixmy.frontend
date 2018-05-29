import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SearchBar from '~/components/SearchBar';
import LocatorControl from '~/components/LocatorControl';

import Store from '~/redux/store';

import Map from './Map';
import MapModal from './MapModal';
import * as MapActions from './MapState';

const MapView = styled.div`
  height: 100%;
  width: 100%;
`;

const MapViewInner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

class MapViewComponent extends PureComponent {
  state = {
    userLocation: null
  }

  componentDidMount() {
    const view = config.map.views[this.props.location.pathname];
    if (view) {
      Store.dispatch(MapActions.setView(Object.assign(view, { animate: false })));
    }
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;
    const thisPath = this.props.location.pathname;
    const nextView = config.map.views[thisPath];

    if (prevPath !== thisPath && nextView) {
      const view = this.props.hasMoved ? { activeLayer: nextView.activeLayer } : nextView;
      Store.dispatch(MapActions.setView(view));
    }
  }

  updateView = (view) => {
    Store.dispatch(MapActions.setView(view));
  }

  handleLocationChange = (userLocation) => {
    this.updateView({ center: userLocation });
  }

  render() {
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
        <MapViewInner>
          <Route
            path="(/|/zustand|/planungen)"
            render={() => (
              <Map
                key="MapComponent"
                accessToken={config.map.accessToken}
                zoom={this.props.zoom}
                center={this.props.center}
                bearing={this.props.bearing}
                pitch={this.props.pitch}
                show3dBuildings={this.props.show3dBuildings}
                activeLayer={this.props.activeLayer}
                activeSection={this.props.activeSection}
                animate={this.props.animate}
                updateView={this.updateView}
                hasMoved={this.props.hasMoved}
              />
            )}
          />
          <Route
            path="(/zustand|/planungen)"
            component={MapModal}
          />
        </MapViewInner>
      </MapView>
    );
  }
}

export default withRouter(connect(state => state.MapState)(MapViewComponent));

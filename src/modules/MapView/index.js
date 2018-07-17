import React, { PureComponent } from 'react';
import withRouter from 'react-router-dom/withRouter';
import Route from 'react-router-dom/Route';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';

import SearchBar from '~/components/SearchBar';
import LocatorControl from '~/components/LocatorControl';
import MapModal from '~/components/MapModal';
import MapControl from '~/components/MapControl';
import FMBLogo from '~/components/FMBLogo';
import SectionDetail from '~/components/SectionDetail';
import PlanningDetail from '~/components/PlanningDetail';

import MyHBI from '~/modules/MyHBI';

import Store from '~/redux/store';

import { matchMediaSize, breakpoints } from '~/style-utils';
import { getActiveLayerFromPath } from './map-utils';

import Map from './Map';
import MapContent from './MapContent';

import * as MapActions from './MapState';

const MapView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

class MapViewComponent extends PureComponent {
  state = {
    userLocation: null
  }

  componentDidMount() {
    const view = config.map.views[this.props.location.pathname];
    if (view) {
      this.updateView(Object.assign(view, { animate: false }));
    }
  }

  updateView = (view) => {
    Store.dispatch(MapActions.setView(view));
  }

  handleLocationChange = (userLocation) => {
    this.updateView({ center: userLocation });
  }

  render() {
    const isDesktopView = matchMediaSize(breakpoints.m);
    const displayLegend = !this.props.activeSection || isDesktopView;
    const calculatePopupPosition = isDesktopView;
    const activeLayer = getActiveLayerFromPath(this.props.location.pathname);

    return (
      <MapView>
        <MapWrapper>
          <Route
            path="(/zustand|/planungen|/my-hbi)"
            component={SearchBar}
          />

          <Map
            key="MapComponent"
            accessToken={config.map.accessToken}
            zoom={this.props.zoom}
            center={this.props.center}
            bearing={this.props.bearing}
            pitch={this.props.pitch}
            show3dBuildings={this.props.show3dBuildings}
            activeLayer={activeLayer}
            activeSection={this.props.activeSection}
            animate={this.props.animate}
            updateView={this.updateView}
            setMapContext={this.setMapContext}
            hasMoved={this.props.hasMoved}
            hbi_values={this.props.hbi_values}
            filterHbi={this.props.filterHbi}
            calculatePopupPosition={calculatePopupPosition}
          >
            <Route
              path="(/zustand|/planungen)"
              render={() => [
                <LocatorControl
                  key="Map__LocatorControl"
                  onChange={this.handleLocationChange}
                  position="bottom-right"
                />,
                <MediaQuery
                  key="Map__FMBLogo"
                  minDeviceWidth={breakpoints.m}
                >
                  <MapControl position="top-right">
                    <FMBLogo width={67} />
                  </MapControl>
                </MediaQuery>
              ]}
            />
          </Map>

          <MapContent
            filterHbiIndex={this.props.filterHbiIndex}
            displayLegend={displayLegend}
          />

          <Route
            exact
            path="(/zustand|/planungen)"
            render={() => (
              this.props.activeSection && <MapModal />
            )}
          />
          <Route
            exact
            path="/zustand/:id"
            render={() => (
              <SectionDetail
                apiEndpoint="planning-sections"
                onCloseRoute="/zustand"
              />
            )}
          />
          <Route
            exact
            path="/planungen/:id"
            render={() => (
              <PlanningDetail
                apiEndpoint="plannings"
                onCloseRoute="/planungen"
              />
            )}
          />
        </MapWrapper>
        <Route
          path="/my-hbi"
          component={MyHBI}
        />
      </MapView>
    );
  }
}

export default withRouter(
  connect(state => ({
    activeSection: state.MapState.activeSection,
    activeLocation: state.MapState.activeLocation,
    activeLayer: state.MapState.activeLayer,
    filterHbi: state.MapState.filterHbi,
    filterHbiIndex: state.MapState.filterHbiIndex,
    filterPlannings: state.MapState.filterPlannings,
    hasMoved: state.MapState.hasMoved,
    hbi_speed: state.MapState.hbi_speed,
    hbi_safety: state.MapState.hbi_safety,
    zoom: state.MapState.zoom,
    bearing: state.MapState.bearing,
    pitch: state.MapState.pitch,
    center: state.MapState.center,
    show3dBuildings: state.MapState.show3dBuildings,
    animate: state.MapState.animate,
    ...state.UserState
  }))(MapViewComponent)
);

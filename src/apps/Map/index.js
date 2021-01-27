import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as MapActions from '~/apps/Map/MapState';
import LocatorControl from '~/apps/Map/components/LocatorControl';
import MapPopup from '~/apps/Map/components/MapPopup';
import MapControl from '~/apps/Map/components/MapControl';
import MapContent from '~/apps/Map/components/MapContent';
import SearchBar from '~/apps/Map/components/SearchBar';
import FMBCredits from '~/apps/Map/components/FMBCredits';
import SectionDetail from '~/apps/Map/components/DetailView/SectionDetail';
import ProjectDetail from '~/apps/Map/components/DetailView/ProjectDetail';
import ErrorMessage from '~/components/ErrorMessage';
import FMBLogo from '~/components2/Logo';
import Store from '~/store';
import history from '~/history';
import { matchMediaSize, breakpoints, media } from '~/styles/utils';
import { WebglMap } from '~/apps/Map/components/WebglMap';
import config from '~/config';

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

const StyledFMBLogo = styled(FMBLogo)`
  display: none;

  ${media.m`
    display: block;
  `}
`;

const dismissErrorMessage = () => Store.dispatch(MapActions.unsetError());

history.listen((location) =>
  Store.dispatch(MapActions.updateHistory(location))
);
Store.dispatch(MapActions.updateHistory(history.location));
Store.dispatch(MapActions.detectEmbedMode(history.location));

class MapViewComponent extends PureComponent {
  updateView = (view) => {
    Store.dispatch(MapActions.setView(view));
  };

  handleLocationChange = (userLocation) => {
    this.updateView({
      center: userLocation,
      zoom: config.apps.map.zoomAfterGeocode,
      animate: true,
    });
  };

  render() {
    const isDesktopView = matchMediaSize(breakpoints.m);
    const displayLegend = !this.props.activeSection || isDesktopView;
    const calculatePopupPosition = isDesktopView && this.props.displayPopup;
    const { isEmbedMode, error } = this.props;

    return (
      <MapView>
        {error != null && (
          <ErrorMessage message={error} onDismiss={dismissErrorMessage} />
        )}
        <MapWrapper>
          <SearchBar />
          <WebglMap
            key="MapComponent"
            updateView={this.updateView}
            calculatePopupPosition={calculatePopupPosition}
          >
            {!this.props.displayPopup && (
              <LocatorControl
                key="Map__LocatorControl"
                onChange={this.handleLocationChange}
                position="bottom-right"
              />
            )}
            {!isEmbedMode && (
              <MapControl position="top-right">
                <StyledFMBLogo showBetaIcon width={67} />
              </MapControl>
            )}
            {isEmbedMode && <FMBCredits />}
          </WebglMap>

          {this.props.displayPopup && <MapPopup />}

          <MapContent
            filterHbi={this.props.filterHbi}
            displayLegend={displayLegend}
            isEmbedMode={isEmbedMode}
          />

          <Route
            exact
            path="/zustand/:id/:name?"
            render={(props) => (
              <SectionDetail
                apiEndpoint="sections"
                onCloseRoute="/zustand"
                activeView={this.props.activeLayer}
                token={this.props.token}
                match={props.match}
              />
            )}
          />
          <Route
            exact
            path="/planungen/:id/:name?"
            render={(props) => (
              <ProjectDetail
                apiEndpoint="projects"
                onCloseRoute="/planungen"
                activeView={this.props.activeLayer}
                token={this.props.token}
                match={props.match}
              />
            )}
          />
          <Route
            exact
            path="/popupbikelanes/:id/:name?"
            render={(props) => (
              <ProjectDetail
                apiEndpoint="projects"
                onCloseRoute="/popupbikelanes"
                activeView={this.props.activeLayer}
                token={this.props.token}
                match={props.match}
              />
            )}
          />
        </MapWrapper>
      </MapView>
    );
  }
}

export default withRouter(
  connect((state) => ({
    activeLayer: state.MapState.activeView,
    activeSection: parseInt(state.MapState.activeSection, 0),
    displayPopup: state.MapState.displayPopup,
    filterHbi: state.MapState.filterHbi,
    isEmbedMode: state.MapState.isEmbedMode,
    error: state.MapState.error,
    ...state.UserState,
  }))(MapViewComponent)
);

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Route,
  RouteComponentProps,
  useLocation,
  withRouter,
} from 'react-router-dom';
import styled from 'styled-components';

import ErrorMessage from '~/components/ErrorMessage';
import { Logo as FMBLogo } from '~/components2/Logo';
import config from '~/config';
import Store, { RootState } from '~/store';
import { matchMediaSize, breakpoints, media } from '~/styles/utils';

import MapLegend from '../../components2/MapLegend';
import * as MapActions from './MapState';
import { DetailPanel } from './components/DetailView';
import ProjectDetail from './components/DetailView/ProjectDetail';
import { SectionDetail } from './components/DetailView/SectionDetail';
import FMBCredits from './components/FMBCredits';
import LocatorControl from './components/LocatorControl';
import MapContent from './components/MapContent';
import MapControl from './components/MapControl';
import { MapPopup } from './components/MapPopup';
import SearchBar from './components/SearchBar';
import { WebglMap } from './components/WebglMap';

const Wrapper = styled.div`
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

const connector = connect(
  ({ MapState, UserState }: RootState) => ({
    activeLayer: MapState.activeView,
    activeSection: MapState.activeSection,
    displayPopup: MapState.displayPopup,
    filterHbi: MapState.filterHbi,
    isEmbedMode: MapState.isEmbedMode,
    error: MapState.error,
    token: UserState.token,
  }),
  (dispatch) => ({
    dismissErrorMessage: () => dispatch(MapActions.unsetError()),
  })
);

/**
 * React to URL changes by updating embed mode, submap and selected section in
 * Redux store.
 */
const useURLParams = () => {
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore types for thunk not configured
    Store.dispatch(MapActions.detectEmbedMode(location));
    // @ts-ignore types for thunk not configured
    Store.dispatch(MapActions.updateHistory(location.pathname));
  }, [location]);
};

type Props = ConnectedProps<typeof connector> & RouteComponentProps<{}>;

const MapView = ({
  activeLayer,
  activeSection,
  dismissErrorMessage,
  displayPopup,
  filterHbi,
  isEmbedMode,
  error,
  token,
}: Props) => {
  const isDesktopView = matchMediaSize(breakpoints.m);
  const displayLegend = !activeSection || isDesktopView;
  const calculatePopupPosition = isDesktopView && displayPopup;

  const handleLocationChange = (userLocation: mapboxgl.LngLatLike) => {
    const view = {
      center: userLocation,
      zoom: config.apps.map.geocoder.zoomAfterGeocode,
      // animate: true,
    };
    Store.dispatch(MapActions.setView(view));
  };

  useURLParams();

  return (
    <Wrapper>
      {error != null && (
        <ErrorMessage message={error} onDismiss={dismissErrorMessage} />
      )}

      <MapWrapper>
        <SearchBar />
        <MapLegend isPopupVisible={false} isDetailOpen={false} />
        <WebglMap
          key="MapComponent"
          calculatePopupPosition={calculatePopupPosition}
        >
          {!displayPopup && (
            <LocatorControl
              key="Map__LocatorControl"
              onChange={handleLocationChange}
              position="bottom-right"
            />
          )}
          {!isEmbedMode && (
            <MapControl position="top-right">
              <StyledFMBLogo width={67} />
            </MapControl>
          )}
          {isEmbedMode && <FMBCredits />}
        </WebglMap>

        {displayPopup && <MapPopup />}

        <MapContent
          filterHbi={filterHbi}
          displayLegend={displayLegend}
          isEmbedMode={isEmbedMode}
        />

        <Route exact path={config.routes.map.hbiDetail}>
          <DetailPanel>
            <SectionDetail />
          </DetailPanel>
        </Route>
        <Route
          exact
          path={config.routes.map.projectsDetail}
          render={({ match }) => (
            <ProjectDetail
              apiEndpoint="projects"
              onCloseRoute={config.routes.map.projectsIndex}
              activeView={activeLayer}
              token={token}
              match={match}
            />
          )}
        />
        <Route
          exact
          path={config.routes.map.popupDetail}
          render={({ match }) => (
            <ProjectDetail
              apiEndpoint="projects"
              onCloseRoute={config.routes.map.popupIndex}
              activeView={activeLayer}
              token={token}
              match={match}
            />
          )}
        />
      </MapWrapper>
    </Wrapper>
  );
};

export default withRouter(connector(MapView));

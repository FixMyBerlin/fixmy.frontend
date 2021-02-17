import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import {
  generatePath,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import slugify from 'slugify';

import { RootState } from '~/store';
import * as MapActions from '~/apps/Map/MapState';
import { media } from '~/styles/utils';
import { ProjectStatus } from './ProjectStatus';
import { HBIStatus } from './HBIStatus';
import MapPopupWrapper from '~/components/MapPopupWrapper';
import Button from '~/components/Button';
import Label from '~/components2/Label';
import Brace from '~/apps/Map/components/Brace';
import resetMap from '~/apps/Map/reset';
import config from '~/config';

const arrowSize = 19;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${media.m`
    padding-bottom: 0;
  `}
`;

const BraceWrapper = styled.div`
  ${media.m`
    display: none;
  `}
`;

const IntersectionContent = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  min-height: 80px;
`;

const connector = connect(
  (state: RootState) => ({
    popupLocation: state.MapState.popupLocation,
    activeSection: state.MapState.activeSection,
    activeView: state.MapState.activeView,
    data: state.MapState.popupData,
    displayPopup: state.MapState.displayPopup,
  }),
  (dispatch) => ({
    setDetailsMapView: () => dispatch<any>(MapActions.setDetailsMapView()),
  })
);

class MapPopup extends PureComponent<
  ConnectedProps<typeof connector> &
    RouteComponentProps<{
      activeView: string;
      activeSection: string;
      name?: string;
    }>
> {
  openDetailView = () => {
    const detailRoutes = {
      zustand: config.routes.map.hbiDetail,
      planungen: config.routes.map.projectsDetail,
    };
    const url = generatePath(detailRoutes[this.props.activeView], {
      id: this.props.activeSection,
      name: slugify(this.props.data.street_name || '').toLowerCase(),
    });
    this.props.history.push(url);
    this.props.setDetailsMapView();
  };

  render() {
    const { data, displayPopup, activeView, popupLocation } = this.props;

    if (!data || !displayPopup) {
      return null;
    }

    const isPlanningView = activeView === 'planungen';
    const isStatus = activeView === 'zustand';
    const isSmallScreen = window.innerWidth <= 768;
    const x = popupLocation && !isSmallScreen ? popupLocation.x : 0;
    const y = popupLocation && !isSmallScreen ? popupLocation.y - arrowSize : 0;

    return (
      <MapPopupWrapper
        x={x}
        y={y}
        data={data}
        onClick={() => this.openDetailView()}
        onClose={() => resetMap()}
      >
        {data.isIntersection ? (
          <>
            <IntersectionContent>
              <Label>Zu den Kreuzungen gibt es noch keine Informationen</Label>
            </IntersectionContent>
            <BraceWrapper>
              <Brace type={this.props.activeView} />
            </BraceWrapper>
          </>
        ) : (
          <>
            {isPlanningView && <ProjectStatus section={data} />}
            {isStatus && (
              <HBIStatus onClick={this.openDetailView} section={data} />
            )}
            <MoreButtonWrapper>
              <Button
                data-cy="plannings-more-info-btn"
                onClick={this.openDetailView}
              >
                mehr Infos
              </Button>
            </MoreButtonWrapper>
            <BraceWrapper>
              <Brace type={activeView} />
            </BraceWrapper>
          </>
        )}
      </MapPopupWrapper>
    );
  }
}

export default withRouter(connector(MapPopup));

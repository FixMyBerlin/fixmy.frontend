/* eslint indent: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import slugify from 'slugify';

import Store from '~/store';
import * as MapActions from '~/apps/Map/MapState';
import { media } from '~/styles/utils';
import ProjectStatus from './ProjectStatus';
import BikeLevelStatus from './BikeLevelStatus';
import MapPopupWrapper from '~/components/MapPopupWrapper';
import Button from '~/components/Button';
import Label from '~/components/Label';
import Brace from '~/apps/Map/components/Brace';
import resetMap from '~/apps/Map/reset';

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

const closePopup = () => {
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));
  Store.dispatch(
    MapActions.setView({
      show3dBuildings: true,
      pitch: 40,
      dim: true,
      animate: true,
      zoom: 16
    })
  );
};

class MapPopup extends PureComponent {
  onDetailClick = () => {
    const name = slugify(this.props.data.street_name || '').toLowerCase();
    const detailRoute = `/${this.props.activeView}/${this.props.activeSection}/${name}`;
    this.props.history.push(detailRoute);
    closePopup();
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
        onClick={() => this.onDetailClick()}
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
              <BikeLevelStatus onClick={this.onDetailClick} section={data} />
            )}
            <MoreButtonWrapper>
              <Button
                data-cy="plannings-more-info-btn"
                onClick={this.onDetailClick}
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

export default withRouter(
  connect((state) => ({
    popupLocation: state.MapState.popupLocation,
    activeSection: state.MapState.activeSection,
    activeView: state.MapState.activeView,
    data: state.MapState.popupData,
    displayPopup: state.MapState.displayPopup
  }))(MapPopup)
);

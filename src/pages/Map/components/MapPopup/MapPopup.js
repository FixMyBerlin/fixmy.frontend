import React, { PureComponent } from 'react';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import { connect } from 'react-redux';
import slugify from 'slugify';

import { media } from '~/utils/style-utils';
import Store from '~/store';
import * as MapActions from '~/pages/Map/MapState';

import PinIcon from '~/images/pin.svg';
import ResetMapButton from '~/pages/Map/components/ResetMapButton';
import BigLabel from '~/components/BigLabel';
import Label from '~/components/Label';
import Button from '~/components/Button';
import Brace from '~/pages/Map/components/Brace';

import PlanningStatus from './PlanningStatus';
import BikeLevelStatus from './BikeLevelStatus';

const MapPopup = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 16px 16px 0 16px;
  bottom: -1px;
  width: 100%;
  z-index:900;

  ${media.m`
    padding: 16px;
  `}
`;

const StyledPinIcon = styled(PinIcon)`
  margin-right: 10px;
`;

const MapPopupLocation = styled.div`
  display: flex;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${config.colors.darkgrey};
  text-decoration: none;
  cursor: pointer;
  line-height: 1.2;
`;

const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${media.m`
    padding-bottom: 0;
  `}
`;

const CloseBtn = styled(ResetMapButton)`
  position: absolute;
  top: -18px;
  right: 10px;
  z-index: 900;
  color: ${config.colors.midgrey};
`;

const BraceWrapper = styled.div`
  ${media.m`
    display: none;
  `}
`;

const closePopup = () => {
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));
  Store.dispatch(MapActions.setView({ show3dBuildings: true, pitch: 40, dim: true, animate: true, zoom: 16 }));
};

class MapPopupComponent extends PureComponent {
  onDetailClick = () => {
    const name = slugify(this.props.data.name || '').toLowerCase();
    const detailRoute = `/${this.props.activeView}/${this.props.activeSection}/${name}`;
    this.props.history.push(detailRoute);
    closePopup();
  }

  render() {
    const { data, displayPopup, activeView } = this.props;

    if (!data || !displayPopup) {
      return null;
    }

    const isPlaningView = activeView === 'planungen';
    const isStatus = activeView === 'zustand';

    return (
      <MapPopup className={this.props.className} style={this.props.style}>
        <CloseBtn />
        <MapPopupLocation onClick={this.onDetailClick}>
          <StyledPinIcon />
          <div>
            <BigLabel>{data.name || '-'}</BigLabel>
            <Label light>Abschnitt 1</Label>
          </div>
        </MapPopupLocation>
        {isPlaningView && <PlanningStatus section={data} />}
        {isStatus && <BikeLevelStatus onClick={this.onDetailClick} section={data} />}
        <MoreButtonWrapper>
          <Button onClick={this.onDetailClick}>
            mehr Infos
          </Button>
        </MoreButtonWrapper>
        <BraceWrapper>
          <Brace type={activeView} />
        </BraceWrapper>
      </MapPopup>
    );
  }
}

export default withRouter(
  connect(state => ({
    activeSection: state.AppState.activeSection,
    activeView: state.AppState.activeView,
    data: state.MapState.popupData,
    displayPopup: state.MapState.displayPopup
  }))(MapPopupComponent)
);

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import { connect } from 'react-redux';

import { media } from '~/style-utils';
import Store from '~/redux/store';
import * as MapActions from '~/modules/MapView/MapState';

import PinIcon from '~/images/pin.svg';
import ResetMapButton from '~/components/ResetMapButton';
import PlanningStatus from './PlanningStatus';
import BikeLevelStatus from './BikeLevelStatus';

const MapPopup = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 1rem;
  bottom: -1px;
  width: 100%;
  z-index:900;
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

const MapPopupTitle = styled.div`
  font-size: 17px;
`;

const MapPopupSubtitle = styled.div`
  font-size: 10px;
`;

const MoreButton = styled.button`
  background: ${config.colors.interaction};
  display: inline-block;
  margin: 0 auto;
  padding: 8px 30px;
  color: ${config.colors.white};
  border-radius: 6px;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: 1px solid white;
  }
`;

const MoreButtonWrapper = styled.div`
  padding-bottom: 15px;
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

const closePopup = () => {
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));
  Store.dispatch(MapActions.setView({ show3dBuildings: true, pitch: 40, dim: true, animate: true, zoom: 16 }));
};

class MapPopupComponent extends PureComponent {
  onDetailClick = () => {
    const detailRoute = `/${this.props.activeView}/${this.props.activeSection}`;
    this.props.history.push(detailRoute);
    closePopup();
  }

  render() {
    const { data, displayPopup, activeView } = this.props;

    if (!data || !displayPopup) {
      return null;
    }

    return (
      <MapPopup className={this.props.className} style={this.props.style}>
        <CloseBtn />
        <MapPopupLocation onClick={this.onDetailClick}>
          <StyledPinIcon />
          <div>
            <MapPopupTitle>{data.name || '-'}</MapPopupTitle>
            <MapPopupSubtitle>Abschnitt 1</MapPopupSubtitle>
          </div>
        </MapPopupLocation>
        { activeView === 'planungen' && <PlanningStatus section={data} /> }
        { activeView === 'zustand' && <BikeLevelStatus onClick={this.onDetailClick} section={data} /> }
        <MoreButtonWrapper>
          <MoreButton onClick={this.onDetailClick}>
            mehr Infos
          </MoreButton>
        </MoreButtonWrapper>
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

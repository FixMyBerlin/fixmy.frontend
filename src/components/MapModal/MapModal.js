import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { media } from '~/style-utils';
import Store from '~/redux/store';
import { setSectionActive, setPopupVisible } from '~/modules/MapView/MapState';

import ResetMapButton from '~/components/ResetMapButton';
import PlanningStatus from './PlanningStatus';
import BikeLevelStatus from './BikeLevelStatus';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 1rem;
  bottom: -1px;
  width: 100%;
  z-index:900;
`;

const MapModalLocation = styled.div`
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${config.colors.darkgrey};
  display: block;
  text-decoration: none;
  cursor: pointer;
`;

const MoreButton = styled.button`
  background: ${config.colors.interaction};
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  color: ${config.colors.white};
  border-radius: 3px;

  &:focus {
    outline: 1px solid white;
  }
`;

const MoreButtonWrapper = styled.div`
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${config.colors.midgrey};

  ${media.m`
    border-bottom: none;
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

class MapModalComponent extends PureComponent {
  onDetailClick = () => {
    const detailRoute = `${this.props.location.pathname}/${this.props.activeSection.id}`;
    Store.dispatch(setSectionActive(null));
    Store.dispatch(setPopupVisible(false));
    this.props.history.push(detailRoute);
  }

  render() {
    const isBikeLevelMode = this.props.location.pathname === '/zustand';
    const isPlanningMode = this.props.location.pathname === '/planungen';
    const data = this.props.activeSection;
    const { displayPopup } = this.props;

    if (!data || !displayPopup) {
      return null;
    }

    const { name } = data;

    return (
      <MapModal className={this.props.className} style={this.props.style}>
        <CloseBtn />
        <MapModalLocation onClick={this.onDetailClick}>
          {name}
        </MapModalLocation>
        { isPlanningMode && <PlanningStatus section={data} /> }
        { isBikeLevelMode && <BikeLevelStatus onClick={this.onDetailClick} section={data} /> }
        <MoreButtonWrapper>
          <MoreButton onClick={this.onDetailClick}>
            mehr Infos
          </MoreButton>
        </MoreButtonWrapper>
      </MapModal>
    );
  }
}

export default withRouter(
  connect(state => ({
    activeSection: state.MapState.activeSection,
    displayPopup: state.MapState.displayPopup
  }))(MapModalComponent)
);

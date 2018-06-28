import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { If } from 'react-extras';

import { media } from '~/style-utils';
import Store from '~/redux/store';
import { setSectionActive } from '~/modules/MapView/MapState';

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
    this.props.history.push(detailRoute);
  }

  render() {
    const isBikeLevelMode = this.props.location.pathname === '/zustand';
    const isPlanningMode = this.props.location.pathname === '/planungen';
    const hasData = !!this.props.activeSection;

    if (!hasData) {
      return null;
    }

    return (
      <MapModal className={this.props.className} style={this.props.style}>
        <If
          condition={hasData}
          render={() => (
            <CloseBtn />
          )}
        />
        <If
          condition={hasData}
          render={() => (
            <MapModalLocation onClick={this.onDetailClick}>
              {this.props.activeSection.name}
            </MapModalLocation>
          )}
        />
        <If condition={isPlanningMode && hasData}>
          <PlanningStatus />
        </If>
        <If
          condition={isBikeLevelMode && hasData}
          render={() => (
            <BikeLevelStatus onClick={this.onDetailClick} section={this.props.activeSection} />
          )}
        />
        <If
          condition={hasData}
          render={() => (
            <MoreButtonWrapper>
              <MoreButton onClick={this.onDetailClick}>
                mehr Infos
              </MoreButton>
            </MoreButtonWrapper>
          )}
        />
      </MapModal>
    );
  }
}

export default withRouter(connect(state => ({ activeSection: state.MapState.activeSection }))(MapModalComponent));

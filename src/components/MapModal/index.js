import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { If } from 'react-extras';

import ResetMapButton from '~/components/ResetMapButton';
import PlanningStatus from './PlanningStatus';
import BikeLevelStatus from './BikeLevelStatus';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 1rem;
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  z-index:900;
`;

const MapModalLocation = styled.div`
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${config.colors.darkgrey};
`;

const MoreButton = styled(Link)`
  background: ${config.colors.interaction};
  display: inline-block;
  margin: 0 auto;
  padding: 10px 20px;
  text-decoration: none;
  color: ${config.colors.white};
  border-radius: 3px;
`;

const MoreButtonWrapper = styled.div`
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #979797;
`;

const CloseBtn = styled(ResetMapButton)`
  position: absolute;
  top: -18px;
  right: 10px;
  z-index: 900;
`;

class MapModalComponent extends PureComponent {
  render() {
    const isBikeLevelMode = this.props.location.pathname === '/zustand';
    const isPlanningMode = this.props.location.pathname === '/planungen';
    const hasData = !!this.props.activeSection;

    if (!hasData) {
      return null;
    }

    return (
      <MapModal>
        <If
          condition={hasData}
          render={() => (
            <CloseBtn />
          )}
        />
        <If
          condition={hasData}
          render={() => (
            <MapModalLocation>{this.props.activeSection.name}</MapModalLocation>
          )}
        />
        <If condition={isPlanningMode && hasData}>
          <PlanningStatus />
        </If>
        <If
          condition={isBikeLevelMode && hasData}
          render={() => (
            <BikeLevelStatus section={this.props.activeSection} />
          )}
        />
        <If
          condition={hasData}
          render={() => (
            <MoreButtonWrapper>
              <MoreButton to={`${this.props.location.pathname}/${this.props.activeSection.id}`}>
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

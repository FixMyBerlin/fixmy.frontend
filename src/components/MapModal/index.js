import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { If } from 'react-extras';

import MapSwitch from '~/components/MapSwitch';
import PlanningStatus from './PlanningStatus';
import BikeLevelStatus from './BikeLevelStatus';

const MapModal = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 24px;
`;

const MapModalLocation = styled.div`
  margin-bottom: 15px;
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
  margin-bottom: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #979797;
`;

class MapModalComponent extends PureComponent {
  handleChange = (checked) => {
    const to = checked ? '/planungen' : '/zustand';
    this.props.history.push(to);
  }

  render() {
    const isBikeLevelMode = this.props.location.pathname === '/zustand';
    const isPlanningMode = this.props.location.pathname === '/planungen';
    const hasData = !!this.props.activeSection;

    return (
      <MapModal>
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
            <BikeLevelStatus level0={this.props.activeSection.side0_index} level1={this.props.activeSection.side1_index} />
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
        <MapSwitch checked={isPlanningMode} onChange={this.handleChange} />
      </MapModal>
    );
  }
}

export default withRouter(connect(state => ({ activeSection: state.MapState.activeSection }))(MapModalComponent));

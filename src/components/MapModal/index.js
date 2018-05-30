import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
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
        <If condition={isBikeLevelMode && hasData}>
          <BikeLevelStatus />
        </If>
        <MapSwitch checked={isPlanningMode} onChange={this.handleChange} />
      </MapModal>
    );
  }
}

export default withRouter(connect(state => ({ activeSection: state.MapState.activeSection }))(MapModalComponent));

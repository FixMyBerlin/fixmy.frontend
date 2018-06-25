import React, { PureComponent } from 'react';
import styled from 'styled-components';
import RcSwitch from 'rc-switch';
import { withRouter } from 'react-router';

import 'rc-switch/assets/index.css';

const MapSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  max-width: 400px;
  margin: 0 auto;
`;

const MapSwitchItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
`;

const Switch = styled(RcSwitch)`

`;

const SwitchLabel = styled.div`
  font-weight: ${props => (props.isActive ? '400' : '800')};
  font-size: 14px;
  text-align: center;
`;

class MapSwitch extends PureComponent {
  handleChange = (checked) => {
    const to = checked ? '/planungen' : '/zustand';
    this.props.history.push(to);
  }

  render() {
    const checked = this.props.location.pathname === '/planungen';
    return (
      <MapSwitchWrapper>
        <MapSwitchItem justify="flex-start">
          <SwitchLabel isActive={checked}>Zustand</SwitchLabel>
        </MapSwitchItem>
        <MapSwitchItem justify="center">
          <Switch checked={checked} onChange={this.handleChange} />
        </MapSwitchItem>
        <MapSwitchItem justify="flex-end">
          <SwitchLabel isActive={!checked}>Planung</SwitchLabel>
        </MapSwitchItem>
      </MapSwitchWrapper>
    );
  }
}

export default withRouter(MapSwitch);

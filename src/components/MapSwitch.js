import React, { PureComponent } from 'react';
import styled from 'styled-components';
import RcSwitch from 'rc-switch';

import 'rc-switch/assets/index.css';

const MapSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
`;

const MapSwitchItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const Switch = styled(RcSwitch)`

`;

const SwitchLabel = styled.div`
  font-weight: ${props => (props.isActive ? '400' : '800')};
  font-size: 14px;
  text-align: center;
`;

class MapSwitch extends PureComponent {
  render() {
    return (
      <MapSwitchWrapper>
        <MapSwitchItem>
          <SwitchLabel isActive={this.props.checked}>Zustand</SwitchLabel>
        </MapSwitchItem>
        <MapSwitchItem>
          <Switch checked={this.props.checked} onChange={this.props.onChange} />
        </MapSwitchItem>
        <MapSwitchItem>
          <SwitchLabel isActive={!this.props.checked}>Planung</SwitchLabel>
        </MapSwitchItem>
      </MapSwitchWrapper>
    );
  }
}

export default MapSwitch;

/* eslint-disable */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ToggleSwitch from 'react-toggle-switch';
import { withRouter } from 'react-router';

import 'react-toggle-switch/dist/css/switch.min.css';

import BikeIcon from '~/images/bike.svg';

const MapSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  max-width: 400px;
  margin: 15px auto;
`;

const MapSwitchItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: ${props => (props.justify ? props.justify : 'none')};
  flex-direction: column;
  width: 33.3%;
  text-align: center;
`;

const Switch = styled(ToggleSwitch)`
  &.switch {
    width: 105px;
    height: 50px;
    border-radius: 50px;
    box-shadow: inset 0 1px 3px 1px rgba(140, 140, 140, 0.23), inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
    background: ${config.colors.midgrey};
  }

  .switch-toggle {
    width: 60px;
    height: 60px;
    left: -10px;
    top: -6px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #353535;
    border: 1px solid #E8E8E8;

    path {
      stroke: #353535;
      fill: #fff;
    }
  }

  &.switch.on {
    background: ${config.colors.midgrey};

    .switch-toggle {
      left: 43px;
    }
  }
`;

const SwitchLabel = styled.div`
  font-weight: 800;
  font-size: ${props => (props.isActive ? 19 : 14)}px;
  color: ${props => (props.isActive ? config.colors.darkbg : config.colors.inactivegrey)};
`;

const SwitchDescription = styled.div`
  display: ${props => (props.isActive ? 'block' : 'none')};
  font-size: 10px;
  color: #635638;
`;

class MapSwitch extends PureComponent {
  handleChange = (checked) => {
    return () => {
      const to = checked ? '/zustand' : '/planungen';
      this.props.history.push(to);
    }
  }

  render() {
    const checked = this.props.location.pathname === '/planungen';
    const enabled = process.env.NODE_ENV === 'development';
    
    return (
      <MapSwitchWrapper>
        <MapSwitchItem>
          <SwitchLabel isActive={!checked}>Happy-Bike-Level</SwitchLabel>
          <SwitchDescription isActive={!checked}>Zustand der Radwege</SwitchDescription>
        </MapSwitchItem>
        <MapSwitchItem justify="center">
          <Switch on={checked} onClick={this.handleChange(checked)} enabled={enabled}>
            <BikeIcon />
          </Switch>
        </MapSwitchItem>
        <MapSwitchItem>
          <SwitchLabel isActive={checked}>Planung</SwitchLabel>
          <SwitchDescription isActive={checked}>Das plant die Stadt</SwitchDescription>
        </MapSwitchItem>
      </MapSwitchWrapper>
    );
  }
}

export default withRouter(MapSwitch);

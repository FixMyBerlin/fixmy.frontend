import React, { PureComponent } from 'react';
import styled from 'styled-components';
import ToggleSwitch from 'react-toggle-switch';
import { withRouter } from 'react-router-dom';

import config from '~/config';
import { media } from '~/styles/utils';
import BikeIcon from '~/images/bike.svg';
import PylonIcon from '~/images/poempel.svg';
import Label from '~/components/Label';
import SvgIcon from '~/components/SvgIcon';

const MapSwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  max-width: 550px;
  margin: 0 auto;
  height: 75px;
  opacity: 1;

  ${media.m`
    padding: 25px 15px;
  `}
`;

const MapSwitchItem = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: ${(props) => (props.justify ? props.justify : 'none')};
  flex-direction: column;
  width: 33.3%;
  text-align: center;
  position: relative;
`;

const MapSwitchItemRight = styled(MapSwitchItem)`
  text-align: left;
`;

const Switch = styled(ToggleSwitch)`
  &.switch {
    width: 105px;
    height: 50px;
    border-radius: 50px;
    box-shadow: inset 0 1px 3px 1px rgba(140, 140, 140, 0.23),
      inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
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
    border: 2px solid #e8e8e8;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.6);

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
  font-size: ${(props) => (props.isActive ? 19 : 14)}px;
  color: ${(props) =>
    props.isActive ? config.colors.darkbg : config.colors.inactivegrey};
  user-select: none;
`;

const SwitchDescription = styled.div`
  display: ${(props) => (props.isActive ? 'block' : 'none')};
  font-size: 10px;
  color: ${config.colors.midgrey};
  user-select: none;
`;

const VorlaeufigIcon = styled(SvgIcon)`
  position: absolute;
  top: -35px;
  left: 25px;
  transform: rotate(-5deg);
  z-index: 999;
`;

class MapSwitch extends PureComponent {
  handleChange = (checked) => () => {
    const to = checked
      ? config.routes.map.hbiIndex
      : config.routes.map.projectsIndex;
    this.props.history.push(to);
  };

  render() {
    const isPlanningView =
      this.props.match.url === config.routes.map.projectsIndex;

    return (
      <MapSwitchWrapper>
        <MapSwitchItem>
          {!isPlanningView && <VorlaeufigIcon type="vorlaeufig" />}
          <SwitchLabel isActive={!isPlanningView}>Happy-Bike-Level</SwitchLabel>
          <SwitchDescription isActive={!isPlanningView}>
            <Label light>Wie radfreundlich sind Berlins Straßen?</Label>
          </SwitchDescription>
        </MapSwitchItem>
        <MapSwitchItem justify="center">
          <Switch
            on={isPlanningView}
            onClick={this.handleChange(isPlanningView)}
            enabled
          >
            {isPlanningView ? <PylonIcon /> : <BikeIcon />}
          </Switch>
        </MapSwitchItem>
        <MapSwitchItemRight>
          <SwitchLabel isActive={isPlanningView}>Planung</SwitchLabel>
          <SwitchDescription isActive={isPlanningView}>
            <Label light>Das plant die Stadt</Label>
          </SwitchDescription>
        </MapSwitchItemRight>
      </MapSwitchWrapper>
    );
  }
}

export default withRouter(MapSwitch);

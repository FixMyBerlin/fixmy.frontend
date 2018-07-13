import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import idx from 'idx';

import { getGeoLocation } from '~/utils';
import LocatorIcon from '~/images/location.svg';
import MapControl from './MapControl';
import Loader from './styled/Loader';

const LocatorButton = styled.button`
  background-color: ${config.colors.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &[disabled] {
    pointer-events: none;
    background-color: ${config.colors.lightgrey};
  }
`;

class Locator extends PureComponent {
  static propTypes = {
    position: PropTypes.string,
    onChange: PropTypes.func,
    onStart: PropTypes.func
  }

  static defaultProps = {
    position: 'top-left',
    onChange: () => {},
    onStart: () => {}
  }

  state = {
    isLoading: false
  }

  locate = async () => {
    this.setState({ isLoading: true });
    this.props.onStart();

    try {
      const position = await getGeoLocation();
      const lat = idx(position, _ => _.coords.latitude);
      const lng = idx(position, _ => _.coords.longitude);

      if (typeof lat === 'number' && typeof lng === 'number') {
        this.props.onChange([lng, lat]);
      }
    } catch (e) {
      alert('Um dich zu lokalisieren, benötigen wir deine Berechtigung.'); // eslint-disable-line
    }


    this.setState({ isLoading: false });
  }

  render() {
    const Icon = this.state.isLoading ? <Loader size={24} /> : <LocatorIcon />;

    return (
      <MapControl position={this.props.position}>
        <LocatorButton
          disabled={this.state.isLoading}
          onClick={this.locate}
        >
          { Icon }
        </LocatorButton>
      </MapControl>
    );
  }
}

export default Locator;

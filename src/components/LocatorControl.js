import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import idx from 'idx';

import { getGeoLocation } from '~/utils';
import MapControl from './MapControl';

const LocatorButton = styled.button`
  background-color: ${config.colors.interaction};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
`;

class Locator extends PureComponent {
  static propTypes = {
    position: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    position: 'top-left',
    onChange: () => {}
  }

  state = {
    isLoading: false
  }

  locate = async () => {
    this.setState({ isLoading: true });

    const position = await getGeoLocation();
    const lat = idx(position, _ => _.coords.latitude);
    const lng = idx(position, _ => _.coords.longitude);

    if (typeof lat === 'number' && typeof lng === 'number') {
      this.props.onChange([lng, lat]);
    }

    this.setState({ isLoading: false });
  }

  render() {
    const locatorIcon = this.state.isLoading ? 'X' : 'L';

    return (
      <MapControl position={this.props.position}>
        <LocatorButton
          disabled={this.state.isLoading}
          onClick={this.locate}
        >
          {locatorIcon}
        </LocatorButton>
      </MapControl>
    );
  }
}

export default Locator;

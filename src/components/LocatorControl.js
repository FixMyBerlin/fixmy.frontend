import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import idx from 'idx';

import { getGeoLocation } from '~/utils';
import MapControl from './MapControl';

const LocatorControl = styled(MapControl)`
  background-color: ${config.colors.interaction};
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
      <LocatorControl onClick={this.locate} position={this.props.position}>{locatorIcon}</LocatorControl>
    );
  }
}

export default Locator;

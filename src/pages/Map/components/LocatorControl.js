import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import idx from 'idx';

import config from '~/pages/Map/config';
import LocatorIcon from '~/images/location.svg';
import Loader from '~/components/Loader';
import { getGeoLocation } from '~/pages/Map/map-utils';
import MapControl from '~/pages/Map/components/MapControl';

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

class LocatorControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  locate = async () => {
    this.setState({ isLoading: true });
    this.props.onStart();

    try {
      const position = await getGeoLocation();
      const lat = idx(position, (_) => _.coords.latitude);
      const lng = idx(position, (_) => _.coords.longitude);

      if (typeof lat === 'number' && typeof lng === 'number') {
        this.props.onChange([lng, lat]);
      }
    } catch (err) {
      alert('Um dich zu lokalisieren, benötigen wir deine Berechtigung.'); // eslint-disable-line
      throw err;
    }

    this.setState({ isLoading: false });
  };

  render() {
    const Icon = this.state.isLoading ? <Loader size={24} /> : <LocatorIcon />;

    return (
      <MapControl
        position={this.props.position}
        customPosition={this.props.customPosition}
      >
        <LocatorButton disabled={this.state.isLoading} onClick={this.locate}>
          {Icon}
        </LocatorButton>
      </MapControl>
    );
  }
}

LocatorControl.propTypes = {
  position: PropTypes.string,
  customPosition: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string
  }),
  onChange: PropTypes.func,
  onStart: PropTypes.func
};

LocatorControl.defaultProps = {
  position: 'top-left',
  onChange: () => {},
  onStart: () => {},
  customPosition: undefined
};

export default LocatorControl;

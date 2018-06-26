/* eslint-disable */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { media } from '~/style-utils';

import MapModal from './MapModal';

const MapModalPositioner = styled(MapModal)`
  position: relative;

  ${media.m`
    position: absolute;
    top: ${props => props.y}px;
    left: ${props => props.x}px;
    max-width: 300px;
    bottom: auto;
    transform: translate(-50%, -101%);
  `}
`;

class MapModalWrapper extends PureComponent {
  render() {
    let x = 0, y = 0;

    if (this.props.popupLocation) {
      x = this.props.popupLocation.x;
      y = this.props.popupLocation.y;
    }

    return (
      <MapModalPositioner x={x} y={y} />
    );
  }
}

export default connect(state => ({
  popupLocation: state.MapState.popupLocation
}))(MapModalWrapper);

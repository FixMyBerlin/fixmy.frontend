import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PinIcon from '~/images/pin.svg';
import { media } from '~/styles/utils';
import CloseButton from '~/components/CloseButton';
import BigLabel from '~/components/BigLabel';
import Label from '~/components/Label';

const arrowSize = 19;
const outerArrowSize = 21;

function getArrowCSS({ size = 20, color = 'white', offset = 0 }) {
  return `
    content:'';
    display:block;
    width:0;
    height:0;
    position:absolute;
    border-right: ${size}px solid transparent;
    border-left: ${size}px solid transparent;
    border-top: ${size}px solid ${color};
    left: 50%;
    top: auto;
    bottom:-${(size + offset) - 1}px;
    margin-left:-${size}px;
  `;
}

const MapPopup = styled.div.attrs({
  style: props => ({
    top: `${props.y}px`,
    left: `${props.x}px`
  })
})`
  position: relative;
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 16px 16px 0 16px;
  bottom: -1px;
  width: 100%;
  z-index:900;

  ${media.m`
    position: absolute;
    max-width: 300px;
    bottom: auto;
    transform: translate(-50%, -101%);
    box-shadow: 2px 2px 2px 3px rgba(0,0,0,.2);
    padding: 16px;

    &:after {
      ${getArrowCSS({
        size: arrowSize,
        color: 'white'
      })}
    }

    &:before {
      ${getArrowCSS({
        size: outerArrowSize,
        color: config.colors.midgrey,
        offset: 1
      })}
    }
  `}
`;

const CloseBtn = styled(CloseButton)`
  position: absolute;
  top: -18px;
  right: 10px;
  z-index: 900;
  color: ${config.colors.midgrey};
`;

const MapPopupLocation = styled.div`
  display: flex;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${config.colors.darkgrey};
  text-decoration: none;
  cursor: pointer;
  line-height: 1.2;
`;

const StyledPinIcon = styled(PinIcon)`
  margin-right: 10px;
`;

function formatAddressString(address) {
  return address
    .replace('Berlin', '')
    .replace(/\b\d{5}\b/g, '')
    .replace(',', '')
    .trim();
}

function renderName(data) {
  if (data.isIntersection) {
    return 'Kreuzung';
  }

  if (data.name) {
    return data.name;
  }

  if (data.address) {
    return formatAddressString(data.address);
  }

  return 'Abschnittsname';
}

class MapPopupWrapper extends PureComponent {
  render() {
    return (
      <MapPopup x={this.props.x} y={this.props.y}>
        <CloseBtn onClick={this.props.onClose} />
        <MapPopupLocation onClick={this.props.onClick}>
          <StyledPinIcon />
          <div>
            <BigLabel uppercase>{renderName(this.props.data)}</BigLabel>
            {!this.props.data.isIntersection && <Label light>Abschnitt 1</Label>}
          </div>
        </MapPopupLocation>
        {this.props.children}
      </MapPopup>
    );
  }
}

export default MapPopupWrapper;

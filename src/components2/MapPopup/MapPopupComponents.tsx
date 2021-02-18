import styled from 'styled-components';

import config from '~/config';
import PinIcon from '~/images/pin.svg';
import { media } from '~/styles/utils';
import CloseButton from '~/components/NewCloseButton';

const ARROW_SIZE = 19;
const ARROW_SIZE_OUTER = 21;

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
      bottom:-${size + offset - 1}px;
      margin-left:-${size}px;
    `;
}

export const BigLabel = styled.div<{
  light?: boolean;
  margin?: number;
  uppercase: boolean;
}>`
  font-size: 17px;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: ${(props) =>
    props.light ? config.colors.midgrey : config.colors.darkgrey};
  margin: ${(props) => props.margin || 0};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'none')};
`;

export const Container = styled.div<{ x: number; y: number }>`
  position: relative;
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
  padding: 16px 16px 0 16px;
  bottom: -1px;
  width: 100%;
  z-index: 1001;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  ${media.m`
      position: absolute;
      max-width: 300px;
      bottom: auto;
      transform: translate(-50%, -101%);
      box-shadow: 2px 2px 2px 3px rgba(0,0,0,.2);
      padding: 16px;
  
      &:after {
        ${getArrowCSS({
          size: ARROW_SIZE,
          color: 'white',
        })}
      }
  
      &:before {
        ${getArrowCSS({
          size: ARROW_SIZE_OUTER,
          color: config.colors.midgrey,
          offset: 1,
        })}
      }
    `}
`;

export const CloseBtn = styled(CloseButton)`
  position: absolute;
  top: -18px;
  right: 10px;
  z-index: 900;
  color: ${config.colors.midgrey};
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${config.colors.darkgrey};
  text-decoration: none;
  cursor: pointer;
  line-height: 1.2;
`;

export const StyledPinIcon = styled(PinIcon)`
  margin-right: 10px;
`;

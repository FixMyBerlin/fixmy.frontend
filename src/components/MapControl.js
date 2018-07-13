import React from 'react';
import styled from 'styled-components';

const marginTop = '16px';
const marginRight = '16px';
const marginBottom = '16px';
const marginLeft = '16px';

const MapControl = styled.div`
  position: absolute;
  top: ${props => props.margins.top};
  right: ${props => props.margins.right};
  bottom: ${props => props.margins.bottom};
  left: ${props => props.margins.left};
  z-index: 1000;
`;

const getMargins = (props) => {
  switch (props.position) {
    case 'top-right':
      return { top: marginTop, right: marginRight, bottom: 'auto', left: 'auto' };
    case 'bottom-right':
      return { top: 'auto', right: marginRight, bottom: marginBottom, left: 'auto' };
    case 'bottom-left':
      return { top: 'auto', right: 'auto', bottom: marginBottom, left: marginLeft };
    default:
      return { top: marginTop, right: 'auto', bottom: 'auto', left: marginLeft };
  }
};

export default props => (
  <MapControl margins={getMargins(props)} {...props} />
);

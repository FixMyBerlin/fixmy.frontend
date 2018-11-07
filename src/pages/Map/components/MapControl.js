import React from 'react';
import styled from 'styled-components';

const margin = '16px';

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
      return {
        top: margin, right: margin, bottom: 'auto', left: 'auto'
      };
    case 'bottom-right':
      return {
        top: 'auto', right: margin, bottom: margin, left: 'auto'
      };
    case 'bottom-left':
      return {
        top: 'auto', right: 'auto', bottom: margin, left: margin
      };
    default:
      return {
        top: margin, right: 'auto', bottom: 'auto', left: margin
    };
  }
};

export default props => (
  <MapControl margins={getMargins(props)} {...props} />
);

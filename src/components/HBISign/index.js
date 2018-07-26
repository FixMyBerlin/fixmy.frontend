import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/bike.svg';
import { numberFormat, getHBIColorByIndex } from '~/utils';
import BetaIcon from '~/images/beta.svg';

const HBISign = styled.div`
  border: ${props => props.borderWeight}px solid ${props => props.color || config.colors.index};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 2px 2px rgba(0,0,0,.18);
  text-decoration: none;
  color:  ${config.colors.darkgrey};
  font-weight: 600;
  background: white;
  position: relative;
  cursor: pointer;
`;

const StyledBetaIcon = styled(BetaIcon)`
  position: absolute;
  transform: ${props => (props.isTooltip ? 'rotate(-6deg) translate(65px, -33px)' : 'rotate(-6deg) translate(65px, 15px)')};
`;

const StyledBikeIcon = styled(BikeIcon)`
  fill: ${props => props.color || config.colors.index};
`;

const HBISignComp = props => (
  <HBISign
    size={props.size}
    borderWeight={props.borderWeight}
    className={props.className}
    onClick={props.onClick}
    color={getHBIColorByIndex(props.hbi)}
  >
    <div>
      <StyledBikeIcon />
      <div>
        {numberFormat(props.hbi)}
      </div>
    </div>
    <StyledBetaIcon isTooltip={props.isTooltip} />
  </HBISign>
);

HBISignComp.defaultProps = {
  onClick: () => {},
  borderWeight: 5,
  size: 77,
  isTooltip: false
};

export default HBISignComp;

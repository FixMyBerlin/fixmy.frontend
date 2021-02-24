import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import BikeIcon from '~/images/bike.svg';
import BetaIcon from '~/images/beta.svg';
import { numberFormat } from '~/utils/utils';
import { getHBIColorByIndex } from '~/apps/Map/hbi-utils';

const HBISign = styled.div<{
  borderWeight: string;
  color: string;
  size: string;
}>`
  border: ${({ borderWeight }) => borderWeight}px solid
    ${({ color }) => color || config.colors.index};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.18);
  text-decoration: none;
  color: ${config.colors.darkgrey};
  font-weight: 600;
  background: white;
  position: relative;
  cursor: pointer;
`;

// styled-components passes the isToolTip prop on to the svg component
// which it shouldn't, so the props are made explicit here
const StyledBetaIcon = styled(({ isTooltip, ...props }) => (
  <BetaIcon {...props} />
))`
  position: absolute;
  transform: ${({ isTooltip }) =>
    isTooltip
      ? 'rotate(-6deg) translate(65px, -33px)'
      : 'rotate(-6deg) translate(65px, 15px)'};
`;

const StyledBikeIcon = styled(BikeIcon)`
  path {
    fill: ${({ color }) => color || config.colors.index};
  }
`;

type Props = {
  borderWeight?: number;
  color: string;
  className?: string;
  onClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size?: number;
};

const HBISignComp = ({
  borderWeight = 5,
  className = null,
  color,
  onClick,
  size = 77,
}: Props) => (
  <HBISign
    borderWeight={borderWeight.toString()}
    className={className}
    color={color}
    onClick={onClick}
    size={size.toString()}
  >
    <StyledBikeIcon />
  </HBISign>
);

export default HBISignComp;

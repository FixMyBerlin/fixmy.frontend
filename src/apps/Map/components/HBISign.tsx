import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import BikeIcon from '~/images/bike.svg';

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

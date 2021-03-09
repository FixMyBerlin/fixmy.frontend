import React from 'react';
import styled from 'styled-components';

import config from '~/config';

import { HBI_WORST, HBI_BAD, HBI_OK, HBI_SUPER } from '../../constants';
import HBIBike0 from './images/hbi-bike-0.svg';
import HBIBike1 from './images/hbi-bike-1.svg';
import HBIBike2 from './images/hbi-bike-2.svg';
import HBIBike3 from './images/hbi-bike-3.svg';

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
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.18);
  text-decoration: none;
  color: ${config.colors.darkgrey};
  font-weight: 600;
  background: white;
  position: relative;
  cursor: pointer;

  svg {
    width: 50px;
    height: 50px;
  }
`;

type Props = {
  borderWeight?: number;
  level?: 0 | 1 | 2 | 3;
  color?: string;
  className?: string;
  onClick?: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size?: number;
};

const HBISignComp = ({
  borderWeight = 5,
  className = null,
  level,
  color = config.colors.inactivegrey,
  onClick,
  size = 77,
}: Props) => {
  const Icon =
    {
      [HBI_WORST]: HBIBike0,
      [HBI_BAD]: HBIBike1,
      [HBI_OK]: HBIBike2,
      [HBI_SUPER]: HBIBike3,
    }[level] || HBIBike2;
  return (
    <HBISign
      borderWeight={borderWeight.toString()}
      className={className}
      color={color}
      onClick={onClick}
      size={size.toString()}
    >
      <Icon />
    </HBISign>
  );
};

export default HBISignComp;

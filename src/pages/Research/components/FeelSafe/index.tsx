import React from 'react';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';

import BikeIcon from '~/images/feelsafe-bike-icon.svg';
import CarIcon from '~/images/feelsafe-car-icon.svg';
import WalkIcon from '~/images/feelsafe-walk-icon.svg';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  position: absolute;
  top: 0;
  right: 0;

  ${media.m`
    position: relative;
    right: auto;
    margin-left: auto;
  `}
`;

interface TextContentProps {
  isSmall?: boolean;
}

const TextContent = styled.div<TextContentProps>`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  line-height: 1;
  height: 100%;

  svg {
    width: ${(props) => (props.isSmall ? 18 : 24)}px;
    height: ${(props) => (props.isSmall ? 10 : 14)}px;
  }
`;

const Number = styled.div<TextContentProps>`
  font-size: ${(props) => (props.isSmall ? 20 : 30)}px;
  font-weight: 700;
`;

const Text = styled.div<TextContentProps>`
  font-size: 8px;
  color: #999;
`;

const scale = scaleLinear(
  [10, 50, 75, 100],
  ['#c01d1d', '#f08141', '#abc759', '#45b834']
);

const getColorByValue = (index) => {
  return index <= 10 ? '#c01d1d' : scale(index);
};

export type FeelsafeSize = 'small' | 'big';
export type FeelsafeIcon = 'bike' | 'car' | 'walk';

interface FeelsafeProps {
  className?: string;
  value: number;
  size?: FeelsafeSize;
  icon?: FeelsafeIcon;
}

const sizes = {
  small: 80,
  big: 120
};

const icons = {
  bike: BikeIcon,
  car: CarIcon,
  walk: WalkIcon
};

const FeelSafe = ({
  className,
  value,
  size = 'small',
  icon = 'bike'
}: FeelsafeProps) => {
  const color = getColorByValue(value);
  const pxSize = sizes[size];
  const isSmall = size === 'small';
  const IconComponent = icons[icon];

  const valueDisplay = value.toLocaleString(undefined, {
    maximumFractionDigits: 0
  });

  return (
    <Wrapper className={className} style={{ width: pxSize, height: pxSize }}>
      <svg width="100%" height="100%" viewBox="0 0 42 42">
        <circle cx="21" cy="21" r="15.91549430918954" fill="#fff" />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#fff"
          strokeWidth="3"
        />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color}
          strokeOpacity={0.2}
          strokeWidth="3"
        />
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${value} ${100 - value}`}
          strokeDashoffset="25"
        />
      </svg>
      <TextContent isSmall={isSmall}>
        <IconComponent />
        <Number isSmall={isSmall}>{valueDisplay}%</Number>
        <Text isSmall={isSmall}>feel safe*</Text>
      </TextContent>
    </Wrapper>
  );
};

// Special variant of FeelSafe to use within Image containers
const ImageFeelSafe = styled(FeelSafe)`
  position: absolute;
  top: 12px;
  right: 12px;

  ${media.m`
    position: absolute;
    top: 12px;
    right: 12px;
  `}
`;

FeelSafe.Image = ImageFeelSafe;

export default FeelSafe;

import React from 'react';
import styled from 'styled-components';
import { scaleLinear } from 'd3-scale';

import BikeIcon from '~/images/bike-icon2.svg';

const Wrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (min-width: 800px) {
    position: relative;
    right: auto;
    margin-left: auto;
  }
`;

const TextContent = styled.div`
  position: absolute;
  left: 0;
  top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  line-height: 1;

  svg {
    width: 18px;
    height: 15px;
  }
`;

const Number = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Text = styled.div`
  font-size: 8px;
  color: #999;
`;

const scale = scaleLinear([40, 70, 100], ['#f08141', '#abc759', '#45b834']);

const getColorByValue = (index) => {
  return index <= 40 ? '#c01d1d' : scale(index);
};

interface FeelsafeProps {
  value: number;
}

export default ({ value }: FeelsafeProps) => {
  const color = getColorByValue(value);

  return (
    <Wrapper className="feelsafe">
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
      <TextContent>
        <BikeIcon />
        <Number>{value}%</Number>
        <Text>feel safe*</Text>
      </TextContent>
    </Wrapper>
  );
};

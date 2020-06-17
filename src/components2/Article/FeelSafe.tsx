import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/bike.svg';

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
  top: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  line-height: 1;

  svg {
    width: 20px;
    height: 20px;

    .bike {
      fill: #545454;
    }
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

const getColorByValue = (index) => {
  return index <= 50 ? '#c01d1d' : '#45b834';
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

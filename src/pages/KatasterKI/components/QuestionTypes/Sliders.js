/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Flex from '~/components/Flex';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Button from '~/pages/KatasterKI/components//Button';

const SliderLabel = styled.div`
  font-size: 14px;
  color: ${config.colors.midgrey};
`;

const SliderWrapper = styled.div`
  margin-bottom: 2em;
`;

const SliderComponent = (props) => (
  <SliderWrapper>
    <SliderLabel>{props.label}</SliderLabel>
    <Slider
      {...props.sliderOptions}
      onChange={(value) => props.onChange(value, props)}
    />
  </SliderWrapper>
);

export default (props) => {
  const onChange = (value, sliderProps) => {
    console.log('set store value', value, sliderProps);
  };

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{props.title}</QuestionTitle>

      {props.sliders.map((slider) => (
        <SliderComponent
          key={`slider_${slider.name}`}
          sliderOptions={props.sliderOptions}
          onChange={onChange}
          {...slider}
        />
      ))}

      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button as={Link} to={props.nextRoute} css={{ alignSelf: 'flex-end' }}>
          weiter
        </Button>
      </Flex>
    </Flex>
  );
};

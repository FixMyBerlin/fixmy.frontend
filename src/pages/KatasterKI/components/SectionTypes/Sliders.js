/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
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

export default ({ title, sliders, sliderOptions, handleChange, next }) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    <QuestionTitle>{title}</QuestionTitle>

    {sliders.map((slider) => (
      <SliderComponent
        key={`slider_${slider.name}`}
        sliderOptions={sliderOptions}
        onChange={(value) => handleChange({ type: slider.name, rating: value })}
        {...slider}
      />
    ))}

    <Flex css={{ flexGrow: 1 }} justifyContent="center">
      <Button onClick={next} css={{ alignSelf: 'flex-end' }}>
        weiter
      </Button>
    </Flex>
  </Flex>
);

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Flex from '~/components/Flex';

const SLIDER_HEIGHT = 40;

const SliderLabel = styled.div`
  font-size: 14px;
  color: ${config.colors.darkbg};
  font-weight: 700;
  margin-bottom: 5px;
`;

const SliderWrapper = styled.div`
  margin-bottom: 2em;
`;

const getTranslateX = (props) => {
  if (typeof props.value === 'undefined' || !props.value) {
    return 0;
  }

  return props.value === props.max ? `-${SLIDER_HEIGHT}px` : '-50%';
};

const tooltipLabels = [
  'Nie',
  'Selten',
  '1 mal im Monat',
  'Mehrmals im Monat',
  '1 mal wöchentlich',
  '(fast) täglich'
];

const StyledSlider = styled(Slider)`

  &&& {
    height: ${SLIDER_HEIGHT}px;
    padding: 0;
  }

  .rc-slider-track {
    background-color: ${config.colors.interaction};
  }

  .rc-slider-track, .rc-slider-rail, .rc-slider-step {
    height: 40px;
    border-radius: 40px;
  }

  .rc-slider-track {
    border-radius: ${(props) =>
      props.value === props.max
        ? `${SLIDER_HEIGHT}px`
        : `${SLIDER_HEIGHT}px 0 0 ${SLIDER_HEIGHT}px`};
  }

  .rc-slider-handle {
    width: ${SLIDER_HEIGHT}px;
    height: ${SLIDER_HEIGHT}px;
    background-color: ${config.colors.white};
    border: 3px solid ${config.colors.katasterHighlight};
    box-shadow: none;
    cursor: pointer;
    user-select: none;
    transform: translate(${(props) => getTranslateX(props)}, 0) !important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    margin-top: 0;

    &:focus {
      outline: none;
      border: 3px solid ${config.colors.katasterHighlight};
      box-shadow: none;
    }

    &:active, &:hover {
      outline: none;
      border: 3px solid ${config.colors.katasterHighlight};

      &:after {
        content: "${(props) => tooltipLabels[props.value || 0]}";
        display: block;
        user-select: none;
        color: ${config.colors.darkbg};
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        top: -28px;
        background: ${config.colors.katasterHighlight};
        padding: 4px 10px;
        position: absolute;
        border-radius: 10px;
        white-space: nowrap;
      }

      &:before {
        content: '';
        position: absolute;
        width: 4px;
        height: 8px;
        background: ${config.colors.katasterHighlight};
        top: -8px;
      }
    }

    &:active {
      box-shadow: none;
    }
  }

  .rc-slider-dot {
    display: none;
  }

  .rc-slider-mark {
    top: ${SLIDER_HEIGHT + 5}px;
  }

  .rc-slider-mark-text {
    color: ${config.colors.inactivegrey};
    letter-spacing: 0.2px;
    font-size: 10px;
    transform: translate(${SLIDER_HEIGHT /
      2}px, 0) translate(-50%, 0) !important;
  }
`;

export default (props) => {
  const Icon = props.icon;

  return (
    <SliderWrapper>
      <SliderLabel>{props.label}</SliderLabel>
      <Flex>
        <Icon />
        <StyledSlider
          {...props.sliderOptions}
          value={props.value}
          onChange={(value) => props.onChange(value, props)}
        />
      </Flex>
    </SliderWrapper>
  );
};

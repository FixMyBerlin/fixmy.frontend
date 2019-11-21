/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Flex from '~/components/Flex';
import { media } from '~/styles/utils';

const SLIDER_HEIGHT = 40;

const SliderLabel = styled.div`
  font-size: 14px;
  color: ${config.colors.darkbg};
  font-weight: 700;
  margin-bottom: 5px;

  .light {
    font-weight: 400;
  }
`;

const SliderWrapper = styled.div`
  margin-bottom: 42px;
  width: 100%;

  ${media.m`
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const getTranslateX = (props) => {
  if (typeof props.value === 'undefined' || !props.value) {
    return 0;
  }

  return props.value === props.max ? `-${SLIDER_HEIGHT}px` : '-50%';
};

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
        content: "${(props) => props.ratingLabels[props.value || 0]}";
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
    color: ${config.colors.darkbg};
    font-weight: 400;
    font-size: 14px;
    user-select: none;
    font-family: FranklinGothic-Med,sans-serif;

    ${(props) =>
      props.value === 0 || props.value === props.max
        ? css`
            width: ${SLIDER_HEIGHT}px;
            transform: translate(
              ${props.value === 0 ? 0 : '-100%'},
              0
            ) !important;
          `
        : null}
  }
`;

export default (props) => {
  const [showMarks, setShowMarks] = useState(true);
  const Icon = props.icon;
  const marks = showMarks
    ? {
        [props.value]: props.ratingLabels[props.value]
      }
    : {};

  const onAfterChange = () => {
    window.setTimeout(() => {
      setShowMarks(true);
    }, 200);
  };

  return (
    <SliderWrapper>
      <SliderLabel>{props.label}</SliderLabel>
      <Flex>
        <Icon />
        <StyledSlider
          {...props.sliderOptions}
          marks={marks}
          value={props.value}
          onChange={(value) => props.onChange(value, props)}
          ratingLabels={props.ratingLabels}
          onBeforeChange={() => setShowMarks(false)}
          onAfterChange={onAfterChange}
        />
      </Flex>
    </SliderWrapper>
  );
};

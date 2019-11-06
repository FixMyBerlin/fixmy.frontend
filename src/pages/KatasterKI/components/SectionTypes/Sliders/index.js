/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';

import Flex from '~/components/Flex';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Button from '~/pages/KatasterKI/components//Button';
import Slider from './Slider';

const Sliders = ({
  title,
  sliders,
  sliderOptions,
  handleChange,
  transportRatings,
  next
}) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    <QuestionTitle>{title}</QuestionTitle>

    {sliders.map((slider) => {
      const currentValue =
        typeof transportRatings[slider.name] !== 'undefined'
          ? transportRatings[slider.name]
          : slider.start;
      return (
        <Slider
          key={`slider_${slider.name}`}
          sliderOptions={sliderOptions}
          onChange={(value) =>
            handleChange({ type: slider.name, rating: value })
          }
          value={currentValue}
          {...slider}
        />
      );
    })}

    <Flex css={{ flexGrow: 1 }} justifyContent="center">
      <Button onClick={next} css={{ alignSelf: 'flex-end' }}>
        weiter
      </Button>
    </Flex>
  </Flex>
);

const mapStateToProps = (state) => ({
  transportRatings: state.KatasterKIState.transportRatings
});

export default connect(mapStateToProps)(Sliders);

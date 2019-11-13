/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Flex from '~/components/Flex';
import RatingSlider from '../RatingSlider';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Button from '~/pages/KatasterKI/components//Button';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';

const Sliders = ({
  title,
  ratings,
  sliderOptions,
  ratingLabels,
  handleChange,
  transportRatings,
  next
}) => {
  const [usedSlider, setUsedSlider] = useState(false);
  const [isLoading, onClick] = useHandlerTimeout(next);

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{title}</QuestionTitle>

      {ratings.map((rating) => {
        const currentValue =
          typeof transportRatings[rating.name] !== 'undefined'
            ? transportRatings[rating.name]
            : 0;
        return (
          <RatingSlider
            key={`slider_${rating.name}`}
            sliderOptions={sliderOptions}
            ratingLabels={ratingLabels}
            onChange={(value) => {
              setUsedSlider(true);
              handleChange({ type: rating.name, rating: value });
            }}
            value={currentValue}
            {...rating}
          />
        );
      })}

      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button
          onClick={onClick}
          css={{ alignSelf: 'flex-end' }}
          disabled={!usedSlider}
          isLoading={isLoading}
        >
          Weiter
        </Button>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  transportRatings: state.KatasterKIState.transportRatings
});

export default connect(mapStateToProps)(Sliders);

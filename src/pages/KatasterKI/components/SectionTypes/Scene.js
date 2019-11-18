import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Flex from '~/components/Flex';
import { getSceneImageSrc } from '~/pages/KatasterKI/scene-utils';

const RatingButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  width: 25%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &.active {
    font-weight: 700;
  }

  &:focus {
    outline: none;
  }
`;

const RatingLabel = styled.div`
  font-size: 12px;
  color: ${config.colors.darkbg};
`;

const startMeasurement = () => window.performance.mark('imageLoaded');
const finishMeasurement = (sceneID) => {
  window.performance.measure(sceneID, 'imageLoaded');
  const results = window.performance.getEntriesByName(sceneID);
  return results[0].duration;
};

const Scene = ({ title, name, options, currentValue, handleChange, next }) => {
  const onClick = (option) => {
    const duration = finishMeasurement(name);
    handleChange({ rating: option.value, duration });
    next();
  };

  return (
    <>
      <img
        src={getSceneImageSrc(name)}
        alt={title}
        onLoad={startMeasurement}
        onError={startMeasurement}
      />
      <QuestionTitle>{title}</QuestionTitle>
      <Flex>
        {options.map((option, index) => {
          const Icon = option.icon;
          const buttonClasses = classnames({
            active: currentValue.rating === index
          });

          return (
            <RatingButton
              key={`singlechoice__${option.value}`}
              onClick={() => onClick(option)}
              className={buttonClasses}
            >
              <Icon />
              <RatingLabel>{option.label}</RatingLabel>
            </RatingButton>
          );
        })}
      </Flex>
    </>
  );
};

export default Scene;

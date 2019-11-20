import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import Loader from '~/components/Loader';
import Flex from '~/components/Flex';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
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
  font-size: 14px;
  color: ${config.colors.darkbg};
  font-family: FranklinGothicFS-Med, sans-serif;
`;

const startMeasurement = () => window.performance.mark('imageLoaded');
const finishMeasurement = (sceneID) => {
  window.performance.measure(sceneID, 'imageLoaded');
  const results = window.performance.getEntriesByName(sceneID);
  return results[0].duration;
};

const Scene = ({ title, name, options, currentValue, handleChange, next }) => {
  const [clickedButton, setClickedButton] = useState(null);

  const onClick = (option) => {
    if (clickedButton) {
      return;
    }

    setClickedButton(option.label);

    setTimeout(() => {
      setClickedButton(null);
      let duration = 0;
      try {
        duration = finishMeasurement(name);
      } catch (err) {
        if (config.debug) console.error(`Error measuring response time ${err}`);
      }
      handleChange({ rating: option.value, duration });
      next();
    }, config.katasterKI.buttonTimeout);
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
              <RatingLabel>
                {clickedButton === option.label ? (
                  <Loader css={{ margin: '0 auto' }} />
                ) : (
                  option.label
                )}
              </RatingLabel>
            </RatingButton>
          );
        })}
      </Flex>
    </>
  );
};

export default Scene;

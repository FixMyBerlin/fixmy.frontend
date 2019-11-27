import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { media } from '~/styles/utils';
import Loader from '~/components/Loader';
import Flex from '~/components/Flex';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import { getSceneImageSrc } from '~/pages/KatasterKI/survey';
import loadingImage from '~/images/strassencheck/scene-loading.jpg';

const RatingTitle = styled(QuestionTitle)`
  margin-top: 10px;
  margin-bottom: 0;

  ${media.m`
    margin-top: 15px;
  `}
`;

const RatingButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  width: 25%;
  cursor: pointer;

  svg {
    width: 100%;
  }

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
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  font-weight: 500;
`;

const startMeasurement = () => window.performance.mark('imageLoaded');
const finishMeasurement = (sceneID) => {
  window.performance.measure(sceneID, 'imageLoaded');
  const results = window.performance.getEntriesByName(sceneID);
  return parseInt(results[0].duration, 10);
};

const Scene = ({ title, name, options, currentValue, handleChange, next }) => {
  const [enqueuedRating, setEnqueuedRating] = useState(null);
  const [showLoadingImage, setShowLoadingImage] = useState(null);

  useEffect(() => {
    setShowLoadingImage(true);
  }, [name]);

  if (showLoadingImage === null) {
    return null;
  }

  const onClick = (option) => {
    if (enqueuedRating != null) {
      return;
    }

    let duration = 0;
    try {
      duration = finishMeasurement(name);
    } catch (err) {
      if (config.debug) console.error(`Error measuring response time ${err}`);
    }

    setEnqueuedRating(option.label);
    setTimeout(() => {
      setEnqueuedRating(null);
      handleChange({ rating: option.value, duration });
      next();
    }, config.katasterKI.buttonTimeout);
  };

  const onImageLoad = () => {
    startMeasurement();
  };

  const onLoadingImageLoad = () => {
    setShowLoadingImage(false);
  };

  return (
    <>
      {showLoadingImage ? (
        <img
          src={loadingImage}
          alt="Lade Bild"
          onLoad={onLoadingImageLoad}
          onError={onLoadingImageLoad}
        />
      ) : (
        <img
          src={getSceneImageSrc(name)}
          alt={title}
          onLoad={onImageLoad}
          onError={onImageLoad}
        />
      )}
      <RatingTitle>{title}</RatingTitle>
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
                {enqueuedRating === option.label ? (
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

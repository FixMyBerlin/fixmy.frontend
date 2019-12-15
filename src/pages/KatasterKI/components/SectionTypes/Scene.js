import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import classnames from 'classnames';

import { media, bounce } from '~/styles/utils';
import Flex from '~/components/Flex';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import { getSceneImageSrc } from '~/pages/KatasterKI/survey';
import loadingImage from '~/images/strassencheck/scene-loading.jpg';
import logger from '~/utils/logger';

const SceneWrapper = styled.div`
  margin: 0;
  width: 100%;
  max-width: none;

  @media (max-height: 700px) {
    margin: 0 auto;
    max-width: 500px;
  }
`;

const ImageWrapper = styled.div`
  margin: 0 -15px 0 -15px;

  ${media.s`
    margin: 0;
  `}
`;

const RatingTitle = styled(QuestionTitle)`
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 25px;

  h1 {
    margin: 0;
  }

  ${media.m`
    margin-top: 10px;
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

  ${media.m`
    margin-top: 15px;
    &:hover {
      svg {
        use {
          fill: ${config.colors.katasterHighlight};
        }
      }
    }
  `}

  &.active {
    font-weight: 700;

    svg {
      use {
        fill: ${config.colors.katasterHighlight};
      }
    }
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

const animation = () => css`
  ${bounce} 1s;
`;
const IconWrapper = styled.div`
  animation: ${(props) => (props.isEnqueued ? animation : 'none')};
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
      logger(`Error measuring response time ${err}`);
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
    <SceneWrapper>
      <ImageWrapper data-cy="kat-scene-image-wrapper">
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
      </ImageWrapper>
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
              <IconWrapper isEnqueued={enqueuedRating === option.label}>
                <Icon />
              </IconWrapper>
              <RatingLabel>{option.label}</RatingLabel>
            </RatingButton>
          );
        })}
      </Flex>
    </SceneWrapper>
  );
};

export default Scene;

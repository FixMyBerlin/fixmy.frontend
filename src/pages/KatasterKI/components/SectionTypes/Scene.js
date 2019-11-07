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

const Scene = ({ title, name, options, currentValue, handleChange, next }) => {
  const onClick = (option) => {
    handleChange(option.value);
    next();
  };

  return (
    <>
      <img src={getSceneImageSrc(name)} alt={title} />
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

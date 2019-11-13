import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const SingleChoiceWrapper = styled.div`
  ${media.m`
    button {
      margin-left: auto;
      margin-right: auto
    }
  `}
`;

const SingleChoiceInput = ({
  title,
  options,
  currentValue,
  handleChange,
  next
}) => {
  const onClick = (option) => {
    handleChange(option.value);
    next();
  };

  return (
    <SingleChoiceWrapper>
      <QuestionTitle>{title}</QuestionTitle>
      {options.map((option) => (
        <GhostButton
          key={`singlechoice__${option.value}`}
          onClick={() => onClick(option)}
          css={{ textAlign: 'left', marginBottom: 10 }}
          isActive={option.value === currentValue}
        >
          {option.label}
        </GhostButton>
      ))}
    </SingleChoiceWrapper>
  );
};

export default SingleChoiceInput;

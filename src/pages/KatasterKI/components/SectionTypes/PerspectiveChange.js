import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Button from '~/pages/KatasterKI/components/Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const SingleChoiceWrapper = styled.div`
  ${media.m`
    button {
      margin-left: auto;
      margin-right: auto
    }
  `}
`;

const PerspectiveChange = ({ title, options, handleChange, next }) => {
  const onClick = (option) => {
    handleChange({ nextPerspective: option.value });
    next();
  };

  return (
    <SingleChoiceWrapper>
      <QuestionTitle>{title}</QuestionTitle>
      {options.map((option) => {
        const ButtonIcon = option.icon;
        return (
          <Button
            key={`singlechoice__${option.value}`}
            onClick={() => onClick(option)}
            css={{
              textAlign: 'left',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              height: 48
            }}
          >
            <ButtonIcon /> {option.label}
          </Button>
        );
      })}
    </SingleChoiceWrapper>
  );
};

export default PerspectiveChange;

import React from 'react';
import styled from 'styled-components';

import Button from '~/pages/KatasterKI/components/Button';
import CloseSurveyButton from '~/pages/KatasterKI/components/CloseSurveyButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import { media } from '~/styles/utils';

const SingleChoiceWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: 28px;
  }

  ${media.m`
    button {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 32px;
    }
  `};
`;

const Helper = styled.p`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  line-height: 1.4em;
`;

const PerspectiveChange = ({
  title,
  options,
  helper,
  handleChange,
  showCloseButton,
  next,
}) => {
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
            data-cy="kat-perspective-change-single-choice-button"
            sx={{
              textAlign: 'left',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              height: 48,
            }}
          >
            <ButtonIcon /> {option.label}
          </Button>
        );
      })}

      {helper !== null && <Helper>{helper}</Helper>}
      {showCloseButton === true && (
        <CloseSurveyButton
          style={{
            marginTop: 'auto',
          }}
        />
      )}
    </SingleChoiceWrapper>
  );
};

export default PerspectiveChange;

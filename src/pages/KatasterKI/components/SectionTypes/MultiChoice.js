import React from 'react';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';
import Checkbox from '~/pages/KatasterKI/components/Checkbox';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import config from '~/pages/KatasterKI/config';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';
import { media } from '~/styles/utils';

const CheckboxWrapper = styled.div`
  margin-bottom: 1em;

  label {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;

  &:focus {
    border-color: ${config.colors.katasterHighlight};
    outline: none;
  }
`;

const MultiChoice = styled.div`
  ${media.m`
    margin-left: auto;
    margin-right: auto;
    width: 500px;
  `}
`;

const isChecked = (currentValues, option) =>
  currentValues != null && currentValues[option.name] === true;

const OptionInput = ({ option, checked, value, onChange }) => {
  if (!option.input || !checked) {
    return null;
  }

  const text = value[`${option.name}-input`];

  return (
    <TextArea placeholder={option.placeholder} onChange={onChange}>
      {text}
    </TextArea>
  );
};

export default ({ title, options, currentValue, handleChange, page, next }) => {
  const [isLoading, onClick] = useHandlerTimeout(next);

  return (
    <Flex flexDirection="column" sx={{ flexGrow: 1 }}>
      <QuestionTitle>{title}</QuestionTitle>
      {options.map((option) => (
        <MultiChoice key={`multichoice_${page}_${option.name}`}>
          <CheckboxWrapper>
            <label htmlFor={option.name}>
              <Checkbox
                type="checkbox"
                name={option.name}
                id={option.name}
                checked={isChecked(currentValue, option)}
                onChange={(evt) =>
                  handleChange({
                    ...currentValue,
                    [option.name]: evt.target.checked,
                  })
                }
              />
              {option.label}
            </label>
          </CheckboxWrapper>
          <OptionInput
            option={option}
            checked={isChecked(currentValue, option)}
            value={currentValue}
            onChange={(evt) =>
              handleChange({
                ...currentValue,
                [`${option.name}-input`]: evt.target.value,
              })
            }
          />
        </MultiChoice>
      ))}
      <Flex sx={{ flexGrow: 1 }} justifyContent="center">
        <Button
          onClick={onClick}
          sx={{ alignSelf: 'flex-end', width: '100%', maxWidth: 500 }}
          isLoading={isLoading}
          data-cy="kat-multichoice-proceed-btn"
        >
          Weiter
        </Button>
      </Flex>
    </Flex>
  );
};

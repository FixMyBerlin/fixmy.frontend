import React, { Fragment } from 'react';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Checkbox from '~/pages/KatasterKI/components/Checkbox';

const CheckboxWrapper = styled.div`
  margin-bottom: 1em;

  label {
    cursor: pointer;
    user-select: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;

  &:focus {
    border-color: ${config.colors.katasterHighlight};
    outline: none;
  }
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

export default ({ title, options, currentValue, handleChange, next }) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    <QuestionTitle>{title}</QuestionTitle>
    {options.map((option) => (
      <Fragment key={`multichoice_${option.name}`}>
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
                  [option.name]: evt.target.checked
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
              [`${option.name}-input`]: evt.target.value
            })
          }
        />
      </Fragment>
    ))}
    <Flex css={{ flexGrow: 1 }} justifyContent="center">
      <Button onClick={next} css={{ alignSelf: 'flex-end' }}>
        weiter
      </Button>
    </Flex>
  </Flex>
);

import React, { Fragment } from 'react';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const CheckboxWrapper = styled.div`
  margin-bottom: 1em;

  input {
    margin-right: 10px;
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

const OptionInput = ({ option, checked, onChange }) => {
  if (!option.input || !checked) {
    return null;
  }

  return <TextArea placeholder={option.placeholder} onChange={onChange} />;
};

export default ({ title, options, currentValue, handleChange, next }) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    <QuestionTitle>{title}</QuestionTitle>
    {options.map((option) => (
      <Fragment key={`multichoice_${option.name}`}>
        <CheckboxWrapper>
          <input
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
          <label htmlFor={option.name}>{option.label}</label>
        </CheckboxWrapper>
        <OptionInput
          option={option}
          checked={isChecked(currentValue, option)}
          onChange={(evt) =>
            handleChange({
              ...currentValue,
              [`${option.name}-input`]: evt.target.checked
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

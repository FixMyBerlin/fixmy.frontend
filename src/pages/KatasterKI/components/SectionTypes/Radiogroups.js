import React from 'react';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import QuestionInfo from '~/pages/KatasterKI/components/QuestionInfo';
import Radio from '~/pages/KatasterKI/components/Radio';

const RadioGroupWrapper = styled.div`
  margin-bottom: 1em;
`;

const RadioGroupTitle = styled.div`
  font-size: 16px;
  color: ${config.colors.darkbg};
  margin-bottom: 10px;
  font-weight: 700;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width}%;

  input {
    cursor: pointer;
  }
`;

const RadioLabel = styled.label`
  font-size: 14px;
  color: ${(props) =>
    props.isChecked ? config.colors.darkbg : config.colors.midgrey};
  display: block;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
  user-select: none;
`;

const isChecked = (currentValues, name, value) =>
  typeof currentValues !== 'undefined' &&
  currentValues !== null &&
  currentValues[name] === value;

export default ({
  title,
  info,
  radiogroups,
  currentValue,
  handleChange,
  next
}) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    {info && <QuestionInfo>{info}</QuestionInfo>}
    <QuestionTitle>{title}</QuestionTitle>
    {radiogroups.map((radiogroup, index) => (
      <RadioGroupWrapper key={`radiogroup_${radiogroup.name}`}>
        <RadioGroupTitle>{radiogroup.label}</RadioGroupTitle>
        <RadioGroup>
          {radiogroup.options.map((option, optionIndex) => {
            const id = `${option.label}_${index}`;
            const isRadioChecked = isChecked(
              currentValue,
              radiogroup.name,
              option.value
            );
            const isLabelVisible =
              isRadioChecked ||
              (optionIndex === 0 ||
                optionIndex === radiogroup.options.length - 1);

            return (
              <RadioItem
                key={`${option.label}_${radiogroup.name}`}
                width={100 / radiogroup.options.length}
              >
                <RadioLabel isChecked={isRadioChecked} htmlFor={id}>
                  <Radio
                    type="radio"
                    id={id}
                    checked={isRadioChecked}
                    onChange={() =>
                      handleChange({
                        ...currentValue,
                        [radiogroup.name]: option.value
                      })
                    }
                    css={{ display: 'block' }}
                  />
                  {isLabelVisible && option.label}
                </RadioLabel>
              </RadioItem>
            );
          })}
        </RadioGroup>
      </RadioGroupWrapper>
    ))}
    <Flex css={{ flexGrow: 1 }} justifyContent="center">
      <Button onClick={next} css={{ alignSelf: 'flex-end' }}>
        weiter
      </Button>
    </Flex>
  </Flex>
);

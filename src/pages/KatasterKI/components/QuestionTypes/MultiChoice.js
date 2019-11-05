import React from 'react';
import { Link } from 'react-router-dom';
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

export default (props) => {
  const onChange = (evt, option) => {
    console.log('set store value', props.name, option.name, evt.target.checked);
  };

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{props.title}</QuestionTitle>
      {props.options.map((option) => (
        <CheckboxWrapper key={`multichoice_${option.name}`}>
          <input
            type="checkbox"
            name={option.name}
            id={option.name}
            onChange={(evt) => onChange(evt, option)}
          />
          <label htmlFor={option.name}>{option.label}</label>
        </CheckboxWrapper>
      ))}
      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button as={Link} to={props.nextRoute} css={{ alignSelf: 'flex-end' }}>
          weiter
        </Button>
      </Flex>
    </Flex>
  );
};

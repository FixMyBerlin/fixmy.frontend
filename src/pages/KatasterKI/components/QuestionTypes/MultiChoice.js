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

export default ({ title, options, handleChange, nextRoute }) => (
  <Flex flexDirection="column" css={{ flexGrow: 1 }}>
    <QuestionTitle>{title}</QuestionTitle>
    {options.map((option) => (
      <CheckboxWrapper key={`multichoice_${option.name}`}>
        <input
          type="checkbox"
          name={option.name}
          id={option.name}
          onChange={(evt) => handleChange(option.name, evt.target.checked)}
        />
        <label htmlFor={option.name}>{option.label}</label>
      </CheckboxWrapper>
    ))}
    <Flex css={{ flexGrow: 1 }} justifyContent="center">
      <Button as={Link} to={nextRoute} css={{ alignSelf: 'flex-end' }}>
        weiter
      </Button>
    </Flex>
  </Flex>
);

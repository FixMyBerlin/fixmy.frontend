import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components/Button';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

const ZipInput = styled.input`
  border: none;
  border-bottom: 1px solid ${config.colors.inactivegrey};
  font-size: 24px;

  &:focus {
    outline: none;
    border-bottom-color: ${config.colors.katasterHighlight};
  }
`;

export default (props) => {
  const onChange = (evt) => {
    console.log('set store value', props.name, evt.target.value);
  };

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{props.title}</QuestionTitle>

      <ZipInput type="text" placeholder="PLZ" onChange={onChange} />

      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button as={Link} to={props.nextRoute} css={{ alignSelf: 'flex-end' }}>
          weiter
        </Button>
      </Flex>
    </Flex>
  );
};

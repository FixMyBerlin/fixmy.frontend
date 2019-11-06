import React from 'react';
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
    const district = null;
    props.handleChange({
      zipcode: evt.target.value,
      district
    });
  };

  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <QuestionTitle>{props.title}</QuestionTitle>

      <ZipInput type="text" placeholder="PLZ" onChange={onChange} />

      <Flex css={{ flexGrow: 1 }} justifyContent="center">
        <Button onClick={props.next} css={{ alignSelf: 'flex-end' }}>
          weiter
        </Button>
      </Flex>
    </Flex>
  );
};

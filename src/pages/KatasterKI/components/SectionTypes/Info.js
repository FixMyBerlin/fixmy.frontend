import React from 'react';
import styled from 'styled-components';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';

const Headline = styled.h1`
  font-size: 40px;
  flex-grow: 1;
  line-height: 1.3;
  font-family: FranklinGothic-Med, sans-serif;
  margin-top: 0;
  font-weight: 400;
  hyphens: auto;
`;

export default ({ title, next }) => {
  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <Headline>{title}</Headline>
      <Flex justifyContent="center">
        <Button onClick={next}>Weiter</Button>
      </Flex>
    </Flex>
  );
};

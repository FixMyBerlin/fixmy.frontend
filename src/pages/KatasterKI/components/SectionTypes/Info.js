import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';

const Headline = styled.h1`
  font-size: 28px;
  flex-grow: 1;
  line-height: 1.3;
  font-family: 'Franklin Gothic FS', 'Open Sans', sans-serif;
  font-weight: 500;
  margin-top: 0;
  hyphens: auto;

  ${media.m`
    font-size: 40px;
  `}
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

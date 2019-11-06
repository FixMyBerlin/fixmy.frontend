import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components//Button';

const Headline = styled.h1`
  font-size: 40px;
  flex-grow: 1;
`;

export default ({ title, nextRoute }) => {
  return (
    <Flex flexDirection="column" css={{ flexGrow: 1 }}>
      <Headline>{title}</Headline>
      <Flex justifyContent="center">
        <Button as={Link} to={nextRoute}>
          weiter
        </Button>
      </Flex>
    </Flex>
  );
};

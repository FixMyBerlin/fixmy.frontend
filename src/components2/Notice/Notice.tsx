import { Paper } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

const Wrapper = styled(Paper)`
  display: flex;
  padding: 0.5em 2em 0.5em 0.5em;
  margin: 1em 0;

  ${media.m`
    margin: 1em 0;
  `};

  svg {
    margin: 0 0.5rem 0 0;
  }
`;

const Notice = ({ children }) => (
  <Wrapper elevation={3}>
    <InfoIcon />
    <div>{children}</div>
  </Wrapper>
);

export default Notice;

import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { media } from '~/styles/utils';

const Wrapper = styled(Paper)`
  display: flex;
  padding: 0.5em;
  margin: 1em 0;

  ${media.m`
    margin: 1em 0;
  `};

  svg {
    margin: 0 0.5em;
  }
`;

const Notice = () => (
  <Wrapper elevation={3}>
    <InfoIcon />
    <div>
      Alle Spielstraßen können eingerichtet werden, da die Mindestzahl an
      Unterstützer:innen erreicht wurde. Sie können sich aber noch registrieren,
      um die vorhandenen Kiezlots:innen zu unterstützen.
    </div>
  </Wrapper>
);

export default Notice;

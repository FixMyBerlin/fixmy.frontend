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
      Die Spielstraßen werden mit Ihrer Hilfe jetzt jeden Sonntag geöffnet. Wenn
      Sie bei der Betreuung helfen können, registrieren Sie sich hier, wir
      leiten Ihren Kontakt dann an die Teamkapitän:innen der jeweiligen Straße
      weiter.
    </div>
  </Wrapper>
);

export default Notice;

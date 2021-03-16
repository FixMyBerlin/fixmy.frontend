import { Container } from '@material-ui/core';
import React from 'react';

import { Header } from '~/components2/Header';
import config from '~/config';

const KiezNotFound = () => (
  <>
    <Header to={config.routes.spielstrassen.landing} showInfoLink>
      Temporäre Spielstraßen für Friedrichshain-Kreuzberg
    </Header>
    <Container>
      <h1>Diese Seite gibt es leider nicht.</h1>
    </Container>
  </>
);

export default KiezNotFound;

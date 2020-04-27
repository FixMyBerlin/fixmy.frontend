import React from 'react';
import { Container } from '@material-ui/core';
import Header from './Header';

const KiezNotFound = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h1>Diese Seite gibt es leider nicht.</h1>
    </Container>
  </>
);

export default KiezNotFound;

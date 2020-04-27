import React from 'react';
import Header from './Header';
import { Container } from '@material-ui/core';

const KiezNotFound = () => (
  <>
    <Header showInfoLink />
    <Container>
      <h1>Diese Seite gibt es leider nicht.</h1>
    </Container>
  </>
);

export default KiezNotFound;

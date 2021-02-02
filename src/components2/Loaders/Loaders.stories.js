import React from 'react';
import { Container } from '@material-ui/core';
import { BigLoader, DotLoader } from '.';

export default {
  title: 'Generic / Loaders',
  decorators: [
    (fn) => (
      <Container maxWidth="md" style={{ backgroundColor: '#eee' }}>
        The loader is positioned inside this container
        {fn()}
      </Container>
    ),
  ],
};

export const Dot = () => <DotLoader />;
export const Big = () => <BigLoader />;
export const BigWithAbsolutePosition = () => (
  <BigLoader useAbsolutePositioning />
);

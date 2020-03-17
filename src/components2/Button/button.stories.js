import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Link from '~/components/Link';
import Button from '.';

export default {
  title: 'Generic / Button'
};

export const Regular = () => <Button>Click me</Button>;

export const ButtonWithLink = () => (
  <MemoryRouter>
    <Button>
      <Link to="/">Link Button</Link>
    </Button>
  </MemoryRouter>
);

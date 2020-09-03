import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Link from '~/components/Link';
import Button from '.';

export default {
  title: 'Generic / Button',
  component: Button
};

const Template = (args) => <Button {...args}>Click me</Button>;

export const Regular = Template.bind({});
Regular.args = {};

export const Flat = Template.bind({});
Flat.args = { flat: true };

export const Ghost = Template.bind({});
Ghost.args = { ghost: true };

export const ButtonWithLink = () => (
  <MemoryRouter>
    <Button>
      <Link to="/">Link Button</Link>
    </Button>
  </MemoryRouter>
);

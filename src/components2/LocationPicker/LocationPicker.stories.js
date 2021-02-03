import React from 'react';
import { Container } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

import { LocationPicker } from '.';

const TEST_STYLE_URL = 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9';
const TEST_BOUNDS = [
  [13.3651, 52.4658],
  [13.4945, 52.5479],
];

export default {
  title: 'Generic / Location Picker',
  decorators: [(fn) => <Container maxWidth="md">{fn()}</Container>],
  component: LocationPicker,
};

export const XHain = () => (
  <LocationPicker
    mapboxStyle={TEST_STYLE_URL}
    bounds={TEST_BOUNDS}
    onSelect={action('selected')}
  />
);

export const Prefilled = () => (
  <LocationPicker
    mapboxStyle={TEST_STYLE_URL}
    bounds={TEST_BOUNDS}
    onSelect={action('selected')}
    initialValue="Weigandufer 3"
  />
);
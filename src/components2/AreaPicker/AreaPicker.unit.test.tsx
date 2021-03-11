import React from 'react';

import { render } from '~/utils/test-utils';

import { AreaPicker } from '.';

const TEST_STYLE_URL = 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9';

describe('<AreaPicker />', () => {
  it('renders', () => {
    const handleSelect = jest.fn();
    render(<AreaPicker onSelect={handleSelect} mapboxStyle={TEST_STYLE_URL} />);
  });
});

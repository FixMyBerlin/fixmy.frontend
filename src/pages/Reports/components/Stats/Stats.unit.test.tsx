import React from 'react';

import { render } from '~/utils/test-utils';

import { StatsCompact, StatsExpanded } from '.';

describe('StatsCounter component', () => {
  it('renders compact variation', () => {
    render(<StatsCompact />);
  });
  it('renders expanded variation', () => {
    render(<StatsExpanded />);
  });
});

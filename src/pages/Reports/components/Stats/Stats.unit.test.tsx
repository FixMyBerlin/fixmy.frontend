import React from 'react';

import { render } from '~/utils/test-utils';

import { StatsCounter, StatsCompact, StatsExpanded } from '.';

describe('StatsCounter component', () => {
  it('renders compact variation', () => {
    render(<StatsCounter component={StatsCompact} />);
  });
  it('renders expanded variation', () => {
    render(<StatsCounter component={StatsExpanded} />);
  });
});

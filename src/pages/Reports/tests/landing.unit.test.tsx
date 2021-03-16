import React from 'react';

import config from '~/pages/Reports/config';
import Landing from '~/pages/Reports/pages/Landing';
import { render } from '~/utils/test-utils';

describe('Landing page', () => {
  beforeAll(() => {
    jest.mock('~/pages/Reports/config');
  });
  it('renders when reports are enabled', () => {
    const { getAllByRole } = render(<Landing />);
    config.reports.enabled = true;
    expect(
      getAllByRole('button', { name: config.reports.landing.CTA })
    ).toHaveLength(2);
  });
  it('renders when reports are disabled', () => {
    const { getAllByRole } = render(<Landing />);
    config.reports.enabled = false;
    expect(
      getAllByRole('button', {
        name: config.reports.landing.CTA,
      })
    ).toHaveLength(2);
  });
});

import React from 'react';
import { render } from '~/utils/test-utils';
import Landing from '~/pages/Reports/pages/Landing';
import config from '~/pages/Reports/config';

describe('Landing page', () => {
  beforeAll(() => {
    jest.mock('~/pages/Reports/config');
  });
  it('renders when reports are enabled', () => {
    const { getAllByRole } = render(<Landing />);
    config.reports.enabled = true;
    expect(
      getAllByRole('button', { name: 'Zur Karte mit allen Meldungen' })
    ).toHaveLength(2);
  });
  it('renders when reports are disabled', () => {
    const { getAllByRole } = render(<Landing />);
    config.reports.enabled = false;
    expect(
      getAllByRole('button', {
        name: 'Sagen Sie uns, wo Fahrradbügel benötigt werden'
      })
    ).toHaveLength(2);
  });
});

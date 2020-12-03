import React from 'react';
import { render } from '@testing-library/react';
import utils from '~/pages/Reports/utils';
import MapLegend from '.';

// Statuses that are not expected in the leged
const UNUSED_STATUSES = [
  'report_new', // only when config.report.enabled is set
  // deprecated
  'new',
  'verification',
  'accepted',
  'rejected',
  'inactive',
  // not used yet
  'invalid',
];

describe('<MapLegend />', () => {
  it('renders in small state', () => {
    const { getByRole, getAllByRole } = render(<MapLegend />);
    expect(getByRole('heading')).toBeInTheDocument();
    expect(getAllByRole('img')).toHaveLength(
      utils.REPORT_STATUSES.length - UNUSED_STATUSES.length
    );
  });
});

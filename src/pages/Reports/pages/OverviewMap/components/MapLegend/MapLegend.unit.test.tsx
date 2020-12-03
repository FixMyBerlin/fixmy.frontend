import React from 'react';
import { render } from '@testing-library/react';
import utils from '~/pages/Reports/utils';
import MapLegend from '.';

// Number of report statuses that are currently not in use and not expected in
// the legend
const NUM_UNUSED = 6;

describe('<MapLegend />', () => {
  it('renders in small state', () => {
    const { getByRole, getAllByRole } = render(<MapLegend />);
    expect(getByRole('heading')).toBeInTheDocument();
    expect(getAllByRole('img')).toHaveLength(
      utils.REPORT_STATUSES.length - NUM_UNUSED
    );
  });
});

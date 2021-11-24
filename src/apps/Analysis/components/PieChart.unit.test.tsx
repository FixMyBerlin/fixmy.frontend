import React from 'react';

import { render } from '~/utils/test-utils';
import projectList from '~/utils/tests/projectList.json';

import PieChart from './PieChart';

describe('<PieChart />', () => {
  it('renders', async () => {
    const { getByRole } = render(
      <PieChart data={projectList} isLoading={false} />
    );
    expect(getByRole('figure', { name: /Planungen/ })).toBeInTheDocument();
  });
});

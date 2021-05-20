import { screen } from '@testing-library/dom';
import React from 'react';

import { render } from '~/utils/test-utils';
import projectList from '~/utils/tests/projectList.json';

import PieChart from './PieChart';

describe('<PieChart />', () => {
  it('renders', () => {
    render(<PieChart data={projectList} isLoading={false} />);
    expect(
      screen.getByRole('figure', { name: /Planungen/ })
    ).toBeInTheDocument();
  });
});

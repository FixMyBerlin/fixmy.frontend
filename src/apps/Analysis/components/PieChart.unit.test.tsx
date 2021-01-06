import { screen } from '@testing-library/dom';
import React from 'react';
import { render } from '~/utils/test-utils';
import PieChart from './PieChart';
import projectList from '~/utils/tests/projectList.json';

describe('<PieChart />', () => {
  it('renders', () => {
    render(<PieChart data={projectList} isLoading={false} />);
    expect(
      screen.getByRole('figure', { name: /Planungen/ })
    ).toBeInTheDocument();
  });
});

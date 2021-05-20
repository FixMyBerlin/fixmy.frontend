import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import Body from './Body';

const reportData = {
  description: 'Description',
  details: {
    fee_acceptable: true,
  },
  origin: [
    {
      id: 1,
      address: 'test',
    },
  ],
  plannings: [
    {
      id: 2,
      address: 'test2',
    },
  ],
};

describe('<Body />', () => {
  it('renders origin reports', () => {
    const history = createMemoryHistory();
    const originData = { ...reportData, plannings: [] };
    render(
      <Router history={history}>
        <Body {...originData} />
      </Router>
    );
    expect(screen.getByRole('link')).toHaveTextContent(
      reportData.origin[0].address
    );
  });
  it("renders reports' linked plannings", () => {
    const history = createMemoryHistory();
    const planningData = { ...reportData, origin: [] };
    render(
      <Router history={history}>
        <Body {...planningData} />
      </Router>
    );
    expect(screen.getByRole('link')).toHaveTextContent(
      reportData.plannings[0].address
    );
  });
});

import React from 'react';
import { screen } from '@testing-library/dom';
import { Route } from 'react-router-dom';
import { render } from '~/utils/test-utils';
import Analysis from '.';

describe('Analysis app', () => {
  it('renders', () => {
    render(<Route component={Analysis} />);
    expect(
      screen.getByRole('heading', { name: 'Analyse' })
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '~/utils/test-utils';
import { BigLoader, DotLoader } from '.';

describe('<BigLoader />', () => {
  it('renders', () => {
    render(<BigLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('<DotLoader />', () => {
  it('renders', () => {
    render(<DotLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

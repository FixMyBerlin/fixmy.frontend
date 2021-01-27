import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '~/utils/test-utils';
import { BigLoader } from '.';

describe('<BigLoader />', () => {
  it('renders', () => {
    render(<BigLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

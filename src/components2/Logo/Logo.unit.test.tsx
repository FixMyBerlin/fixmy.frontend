import { screen } from '@testing-library/dom';
import React from 'react';

import { render } from '~/utils/test-utils';

import { Logo } from '.';

describe('<Logo />', () => {
  it('renders', () => {
    render(<Logo />);
    expect(
      screen.getByRole('img', { name: 'FixMyBerlin logo' })
    ).toBeInTheDocument();
  });
});

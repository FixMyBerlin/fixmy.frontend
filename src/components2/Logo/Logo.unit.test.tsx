import React from 'react';
import { screen } from '@testing-library/dom';

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

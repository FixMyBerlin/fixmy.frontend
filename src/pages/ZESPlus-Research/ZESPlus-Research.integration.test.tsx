import { screen } from '@testing-library/dom';
import React from 'react';

import { render } from '~/utils/test-utils';

import ZESplus from '.';

describe('ZESplus research page', () => {
  it('renders', () => {
    render(<ZESplus />);
    expect(
      screen.getByRole('button', { name: 'Menü öffnen' })
    ).toBeInTheDocument();
  });
});

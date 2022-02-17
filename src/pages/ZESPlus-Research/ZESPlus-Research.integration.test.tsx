import { screen } from '@testing-library/dom';
import React from 'react';
import { render } from '~/utils/test-utils';
import ZESPlusResearch from '.';

describe('ZESplus research page', () => {
  it('renders', () => {
    render(<ZESPlusResearch />);
    expect(
      screen.getByRole('button', { name: 'Menü öffnen' })
    ).toBeInTheDocument();
  });
});

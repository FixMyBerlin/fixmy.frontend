import { screen } from '@testing-library/dom';
import React from 'react';
import { render } from '~/utils/test-utils';
import { ForschungsprojektPage } from './ForschungsprojektPage';

describe('ZESplus research page', () => {
  it('renders', () => {
    render(<ForschungsprojektPage />);
    expect(
      screen.getByRole('button', { name: 'Menü öffnen' })
    ).toBeInTheDocument();
  });
});

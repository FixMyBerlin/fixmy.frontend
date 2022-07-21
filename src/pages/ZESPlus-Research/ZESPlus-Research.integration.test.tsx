import { screen } from '@testing-library/dom';
import React from 'react';
import { render } from '~/utils/test-utils';
import { ZesPlusResearchPage } from './ZesPlusResearchPage';

describe('ZESplus research page', () => {
  it('renders', () => {
    render(<ZesPlusResearchPage />);
    expect(
      screen.getByRole('button', { name: 'Menü öffnen' })
    ).toBeInTheDocument();
  });
});

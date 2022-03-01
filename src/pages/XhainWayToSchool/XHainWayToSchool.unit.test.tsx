import { screen } from '@testing-library/dom';
import React from 'react';
import { Route } from 'react-router-dom';
import '~/utils/polyfills';
import { render } from '~/utils/test-utils';
import XhainWayToSchool from '.';

describe('XhainWayToSchool page', () => {
  it('renders', () => {
    render(<Route component={XhainWayToSchool} />);
    expect(
      screen.getByRole('heading', {
        name: 'Sichere Schulwege für alle Schüler*innen im Bezirk',
      })
    ).toBeInTheDocument();
  });
});

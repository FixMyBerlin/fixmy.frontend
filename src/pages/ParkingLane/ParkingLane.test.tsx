import { screen } from '@testing-library/dom';
import React from 'react';
import { Route } from 'react-router-dom';
import '~/utils/polyfills';
import { render } from '~/utils/test-utils';
import XhainWayToSchool from '.';

describe('ParkingLane page', () => {
  it('renders', () => {
    render(<Route component={XhainWayToSchool} />);
    expect(
      screen.getByRole('heading', {
        name: 'Gemeinsam Daten für die Verkehrswende erheben',
      })
    ).toBeInTheDocument();
  });
});

import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import utils from '~/pages/Reports/utils';
import MapLegend from '.';

// Statuses that are not expected in the legend
const UNUSED_STATUSES = [
  'report_new', // only when config.report.enabled is set / not implemented
  // deprecated
  'new',
  'verification',
  'accepted',
  'rejected',
  'inactive',
  // not used yet
  'invalid',
];

describe('<MapLegend />', () => {
  it('renders', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MapLegend isPopupVisible={false} isDetailOpen={false} />
      </Router>
    );
    expect(
      screen.getByText('Alle Meldungen und Planungen')
    ).toBeInTheDocument();
    expect(
      screen.getAllByAltText(/Pin für einen Eintrag mit dem Status/)
    ).toHaveLength(utils.REPORT_STATUSES.length - UNUSED_STATUSES.length);
  });

  it('expands for small screens', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MapLegend isPopupVisible={false} isDetailOpen={false} />
      </Router>
    );
    screen.getByRole('button', { name: 'Legende anzeigen' }).click();
    expect(
      screen.getByRole('button', { name: 'Legende schließen' })
    ).toBeInTheDocument();
  });
});

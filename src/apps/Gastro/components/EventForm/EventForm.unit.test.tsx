import { screen } from '@testing-library/dom';
import { isFuture, subDays } from 'date-fns';
import React from 'react';

import { render } from '~/utils/test-utils';

import EventForm from './EventForm';
import { getMinDate } from './utils';

describe('EventForm', () => {
  it('renders', async () => {
    render(<EventForm onSuccess={() => {}} />);
    expect(
      screen.getByRole('button', { name: 'Antrag absenden' })
    ).toBeInTheDocument();
  });
});

describe('utils', () => {
  describe('min date', () => {
    it('returns a date, which is more than 20 days in the future', () => {
      const minDate = getMinDate();
      expect(isFuture(subDays(minDate, 20))).toBeTruthy();
    });
  });
});

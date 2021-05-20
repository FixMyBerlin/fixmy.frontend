import { fireEvent, screen } from '@testing-library/dom';
import React from 'react';

import { render } from '~/utils/test-utils';

import { ApiNotice, Notice } from '.';

describe('<Notice />', () => {
  it('renders', () => {
    render(<Notice>Das ist der Hinweis</Notice>);
    expect(screen.getByText('Das ist der Hinweis')).toBeInTheDocument();
  });
});

describe('<ApiNotice />', () => {
  it('renders', () => {
    const handleRetry = jest.fn();
    render(
      <ApiNotice title="Server error" onRetry={handleRetry}>
        Daten konnten nicht geladen werden
      </ApiNotice>
    );

    expect(screen.getByText('Server error')).toBeInTheDocument();
    expect(
      screen.getByText('Daten konnten nicht geladen werden')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Nochmal versuchen' }));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});

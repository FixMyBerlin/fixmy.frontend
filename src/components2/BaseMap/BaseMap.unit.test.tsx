import { screen } from '@testing-library/dom';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { render } from '~/utils/test-utils';
import { BaseMap } from './BaseMap';

describe('<BaseMap />', () => {
  it('renders', () => {
    const mockHandleInit = jest.fn();
    const { container } = render(
      <BaseMap onInit={mockHandleInit} className="testClassName" />
    );
    expect(mapboxgl.Map).toBeCalled();
    expect(screen.getByLabelText('Interaktive Karte')).toBeInTheDocument();
    expect(container.getElementsByClassName('testClassName').length).toBe(1);
  });
});

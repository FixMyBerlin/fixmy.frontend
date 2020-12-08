import React from 'react';
import mapboxgl from 'mapbox-gl';
import { render } from '~/utils/test-utils';
import { screen } from '@testing-library/dom';
import Map from '.';

describe('<Map />', () => {
  it('renders', () => {
    const mockHandleInit = jest.fn();
    const { container } = render(
      <Map onInit={mockHandleInit} className="testClassName" />
    );
    expect(mapboxgl.Map).toBeCalled();
    expect(screen.getByLabelText('Interactive WebGL map')).toBeInTheDocument();
    expect(container.getElementsByClassName('testClassName').length).toBe(1);
  });
});

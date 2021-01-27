import React from 'react';
import mapboxgl from 'mapbox-gl';
import { render } from '~/utils/test-utils';
import { WebglMap } from '.';

describe('<WebglMap />', () => {
  it('renders', () => {
    render(<WebglMap />);
    expect(mapboxgl.Map).toHaveBeenCalled();
  });
});

import React from 'react';
import mapboxgl from 'mapbox-gl';
import { render } from '~/utils/test-utils';
import { WebglMap } from '.';

describe('<WebglMap />', () => {
  it('renders', () => {
    render(<WebglMap calculatePopupPosition={true} />);
    expect(mapboxgl.Map).toHaveBeenCalled();
  });
});

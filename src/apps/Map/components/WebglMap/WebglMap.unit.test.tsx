import mapboxgl from 'mapbox-gl';
import React from 'react';

import { render } from '~/utils/test-utils';

import { WebglMap } from '.';

describe('<WebglMap />', () => {
  it('renders', () => {
    render(<WebglMap calculatePopupPosition />);
    expect(mapboxgl.Map).toHaveBeenCalled();
  });
});

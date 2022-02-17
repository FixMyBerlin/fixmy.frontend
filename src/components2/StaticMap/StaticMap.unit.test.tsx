import { screen } from '@testing-library/dom';
import mapboxgl from 'mapbox-gl';
import React from 'react';

import { render } from '~/utils/test-utils';

import { StaticMap } from '.';

const TEST_STYLE_URL = 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9';
const TEST_LOCATION: mapboxgl.LngLatLike = [13.415669, 52.513219];

describe('<StaticMap />', () => {
  it('renders', () => {
    const { container } = render(
      <StaticMap
        className="testClassName"
        mapboxStyle={TEST_STYLE_URL}
        location={TEST_LOCATION}
      />
    );
    expect(mapboxgl.Map).toBeCalled();
    expect(screen.getByLabelText('Interaktive Karte')).toBeInTheDocument();
    expect(container.getElementsByClassName('testClassName').length).toBe(1);
  });
});

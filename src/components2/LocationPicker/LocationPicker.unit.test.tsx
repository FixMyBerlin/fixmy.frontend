// import { fireEvent, screen } from '@testing-library/dom';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { render } from '~/utils/test-utils';
import { LocationPicker } from '.';

const TEST_STYLE_URL = 'mapbox://styles/hejco/ck85ospzd0cre1ioa8d6gfuv9';
const TEST_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [13.3651, 52.4658],
  [13.4945, 52.5479],
];

describe('<LocationPicker />', () => {
  it('renders', async () => {
    const mockSelect = jest.fn();
    render(
      <LocationPicker
        onSelect={mockSelect}
        mapboxStyle={TEST_STYLE_URL}
        bounds={TEST_BOUNDS}
        initialValue="Weigandufer 3"
      />
    );
    // The following fails because MapboxGL markers fail to initializa in the
    // Jest environment, even when they are working in the browser:
    //
    // `TypeError: mapbox_gl_1.default.Marker is not a constructor`

    // const searchResults = await screen.findAllByRole('button');
    // fireEvent.click(searchResults[0]);
    // expect(mockSelect).toHaveBeenCalled();
  });
});

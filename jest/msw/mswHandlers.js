import { rest } from 'msw';

import mockLocationSuggestions from './mockData/mockLocationSuggestions.json';

// msw route handlers designated to be used in various places,
// see https://kentcdodds.com/blog/stop-mocking-fetch
export default [
  rest.get(
    // eslint-disable-next-line prefer-regex-literals
    new RegExp('^https://api.mapbox.com/geocoding/v5/mapbox.places'),
    (req, res, ctx) => {
      return res(ctx.json(mockLocationSuggestions));
    }
  ),
];

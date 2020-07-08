import { rest } from 'msw';
import mockLocationSuggestions from './mockLocationSuggestions.json'

export default [
  rest.get(
    new RegExp('^https://api.mapbox.com/geocoding/v5/mapbox.places'),
    (req, res, ctx) => {
      return res(
        ctx.json(mockLocationSuggestions)
      );
    }
  )
]

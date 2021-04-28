import debug from 'debug';
import ky from 'ky';

import config from '~/pages/Reports/config';

const log = debug('fmc:mapbox:reverseGeocoding');

export default async ({ lat, lng }) => {
  // form a url following the docs https://docs.mapbox.com/api/search/#reverse-geocoding
  const searchUrl = config.mapbox.reverseGeocoderUrl
    .replace('{long}', lng)
    .replace('{lat}', lat)
    .concat(`?access_token=${config.mapbox.accessToken}&`)
    .concat('language=de&')
    .concat(`types=address`);

  const data = await ky.get(searchUrl).json(); // result is a GeoJSON
  log(`Searching ${lng}, ${lat}: ${data?.features?.length} results`);
  return data.features[0].place_name_de // e.g. "Schnatterinchenstraße 2, 12345 Berlin, Deutschland"
    .split(', Deutschland')[0]; // omit statement of country
};

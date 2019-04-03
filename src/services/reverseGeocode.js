import ky from 'ky';

export default async ({ lat, lng }) => {
  // form a url following the docs https://docs.mapbox.com/api/search/#reverse-geocoding
  const searchUrl = config.reportsLocateMeMap.reverseGeocoderUrl
    .replace('{long}', lng)
    .replace('{lat}', lat)
    .concat(`?access_token=${config.map.accessToken}&`)
    .concat('language=de');

  const data = await ky.get(searchUrl).json(); // result is a GeoJSON
  return data.features[0].place_name_de // e.g. "Schnatterinchenstraße 2, 12345 Berlin, Deutschland"
    .split(', Deutschland')[0]; // omit statement of country
};

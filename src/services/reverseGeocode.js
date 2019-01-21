// import idx from 'idx/lib/idx';
import ky from 'ky';
import { oneLine } from 'common-tags';

// TODO: build as class with different modes (HERE, NOMINATIM etc)
// TODO: make here geocoding work
export default async (
  { lat, lng }
  ) => {
  // const PROXIMITY = 50; // should be configurable
  // const MAX_RESULTS = 1; // should be configurable
  // const { reverseGeocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
  //
  // const searchUrl = oneLine`${reverseGeocoderUrl}?
  //   app_id=${geocoderAppId}&
  //   app_code=${geocoderAppCode}&
  //   prox=${lat},${lng},${PROXIMITY}&
  //   mode=retrieveAddresses&
  //   maxresults=${MAX_RESULTS}`;
  //
  // const data = await ky.get(searchUrl).json();
  // return idx(data, _ => _.Response.View[0].Result[0].Address);

  // use nominatim for now
  const searchUrl = oneLine`https://nominatim.openstreetmap.org/reverse?email=sascha.picard@gmx.de&
  format=json&lat=${lat.toFixed(7)}&lon=${lng.toFixed(7)}&zoom=27&addressdetails=1`
  const data = await ky.get(searchUrl).json();
  return data.display_name;

};

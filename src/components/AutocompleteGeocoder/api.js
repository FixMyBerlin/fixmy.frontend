import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import ky from 'ky';
import idx from 'idx/lib/idx';

let abortController = new window.AbortController();

function compileSearchUrl(searchString) {
  const { suggestionGeocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
  return `${suggestionGeocoderUrl}?&` +
    `app_id=${geocoderAppId}&app_code=${geocoderAppCode}&` +
    `query=${searchString}&` +
    'beginHighlight=<>&endHighlight=<>&' +
    `mapview=${config.map.geocoderBounds}`;
}

/**
 * Uses the [here Autocomple API](https://developer.here.com/documentation/geocoder-autocomplete)
 * to fetch a list of locations using a search string.
 * @param {String} searchString
 * @returns {Promise<Object>}
 */
export async function fetchSuggestions(searchString) {
  abortController.abort(); // Cancel the previous request
  abortController = new AbortController();
  const { signal } = abortController;

  const url = compileSearchUrl(searchString);
  return fetch(url, { signal })
    .then(res => res.json())
    .catch((error) => {
      // if (error.name === 'AbortError') { FIXME: documented way of detecting an abortError won't work
      if (error.message.includes('aborted')) { // workaround
        console.log('cancelled');
        return { suggestions: [] };
      }
    });
}

/**
 * Uses a here-internal locationId to fetch a location
 * via [here Geocoder API](https://developer.here.com/documentation/geocoder)
 * @param {String} locationId
 * @returns {Promise<Object>} The here location entry
 */
async function getLocationById(locationId) {
  const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
  const searchUrl = `${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&locationid=${locationId}&country=DEU&city=Berlin`;
  const data = await ky.get(searchUrl).json();

  return idx(data, _ => _.Response.View[0].Result[0].Location);
}

/**
 * @param {String} locationId
 * @returns {Promise<Object>} Coodinates as object
 */
export async function getCoordinatesByLocationId(locationId) {
  const location = await getLocationById(locationId);
  const { Latitude, Longitude } = location.DisplayPosition;
  return { lng: Longitude, lat: Latitude };
}

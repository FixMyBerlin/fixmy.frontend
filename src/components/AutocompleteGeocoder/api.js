/* eslint-disable no-use-before-define */
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

let abortController = new window.AbortController();

const fetchSuggestions = async (searchString) => {
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
};

function compileSearchUrl(searchString) {
  const { suggestionGeocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
  return `${suggestionGeocoderUrl}?&` +
    `app_id=${geocoderAppId}&app_code=${geocoderAppCode}&` +
    `query=${searchString}&` +
    'beginHighlight=<>&endHighlight=<>&' +
    `mapview=${config.map.geocoderBounds}`;
}

export default {
  fetchSuggestions
};

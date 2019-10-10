let abortController = new window.AbortController();

function compileSearchUrl(searchString) {
  const { accessToken, geocoderBounds } = config.map;
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchString}.json?` +
    `access_token=${accessToken}&autocomplete=true&language=de&` +
    `bbox=${geocoderBounds}&` +
    'limit=3&' +
    'types=address'; // maybe using "poi" would also be a good idea
}

/**
 * The mapbox Geocoder sometimes adds an unplausible address to the list of addresses
 * event thought the address is fully qualified already. This helper function filters them out.
 * If result set contains an item with relevance=1 and accuracy=point, clear the rest.
 */
function filterSuggestions(suggestions) {
  const [firstSuggestion] = suggestions;
  const { accuracy, relevance } = firstSuggestion;
  const firstSuggestionMatches = relevance === 1 && accuracy === 'point';
  return firstSuggestionMatches ? [firstSuggestion] : suggestions;
}

/**
 * Parses coordinates an address from an object returned from the Mapbox Forward Geocoding API.
 * @param {Object} suggestion An element of the features array,
 * see https://docs.mapbox.com/api/search/#geocoding-response-object
 * @return {Object}
 */
export const parseSuggestion = ({
  center,
  place_name_de: address,
  id,
  relevance,
  properties
 }) => ({
  id,
  coords: { lng: center[0], lat: center[1] },
  address: address.split(', Deutschland')[0], // omit statement of country
  relevance,
  accuracy: properties.accuracy
});

/**
 * Uses the [Mapbox Forward Geocoding API](https://docs.mapbox.com/api/search/#forward-geocoding)
 * to fetch a list of locations using a search string.
 * @param {String} searchString
 * @returns {Promise<Object[]>} See https://docs.mapbox.com/api/search/#geocoding-response-object
 */
export async function fetchSuggestions(searchString) {
  abortController.abort(); // Cancel the previous request
  abortController = new AbortController();
  const { signal } = abortController;

  const url = compileSearchUrl(searchString);
  return fetch(url, { signal })
    .then(res => res.json())
    .then(res => res.features)
    .then((fetchedSuggestions) => {
        if (!fetchedSuggestions.length) return [];
        const parsedSuggestions = fetchedSuggestions.map(parseSuggestion);
        const filteredSuggestions = filterSuggestions(parsedSuggestions);
        return filteredSuggestions;
    })
    .catch((error) => {
      // if (error.name === 'AbortError') { FIXME: documented way of detecting an abortError won't work
      if (error.message.includes('aborted')) { // workaround
        console.log('cancelled');
        return [];
      }
      // else re-throw
      throw error;
    });
}

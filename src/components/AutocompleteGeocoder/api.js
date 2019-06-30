import ky from 'ky';

const compileSearchUrl = (searchString) => {
  const { suggestionGeocoderUrl, geocoderAppId, geocoderAppCode } = config.map;
  return `${suggestionGeocoderUrl}?&` +
    `app_id=${geocoderAppId}&app_code=${geocoderAppCode}&` +
    `query=${searchString}&` +
    'beginHighlight=<>&endHighlight=<>&' +
    `mapview=${config.map.geocoderBounds}`;
};

const fetchSuggestions = searchString => ky.get(compileSearchUrl(searchString)).json();

export default {
  fetchSuggestions
};

import { getEndpointURL } from './utils';
import { NewsletterResponse } from '../types';

// Using plain fetch api here because ky makes problems in unit tests,
// see https://github.com/FixMyBerlin/fixmy.platform/issues/116

// TODO: make sure we use a fetch polyfill
async function handleSubmitAnswer({
  json = {},
  token = false
}): Promise<NewsletterResponse> {
  const authHeader = token ? { Authorization: `JWT ${token}` } : {};
  const endpoint = getEndpointURL('newsletter', null, null);
  const fetchResponse = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(json),
    headers: {
      ...authHeader,
      'Content-Type': 'application/json'
    }
  });

  if (!fetchResponse.ok) {
    throw new Error(
      `Newsletter Submit Request failed: ${fetchResponse.statusText}`
    );
  }

  return fetchResponse.json();
}

export default handleSubmitAnswer;

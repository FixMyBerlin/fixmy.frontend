import { PerspectiveResponse } from '../types';
import { getEndpointURL } from './utils';

// Using plain fetch api here because ky makes problems in unit tests,
// see https://github.com/FixMyBerlin/fixmy.platform/issues/116

// TODO: make sure we use a fetch polyfill
async function handleSubmitPerspective({
  json = {},
  token = false,
  sessionID
}): Promise<PerspectiveResponse> {
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  const endpoint = getEndpointURL('perspective', sessionID, null);
  const fetchResponse = await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(json),
    headers
  });

  if (!fetchResponse.ok) {
    throw new Error(`Perspective Request failed: ${fetchResponse.statusText}`);
  }

  return fetchResponse.json();
}

export default handleSubmitPerspective;

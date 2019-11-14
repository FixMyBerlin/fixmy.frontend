import { getEndpointURL } from './utils';

// Using plain fetch api here because ky makes problems in unit tests,
// see https://github.com/FixMyBerlin/fixmy.platform/issues/116

// TODO: make sure we use a fetch polyfill
async function handleSubmitAnswer({
  json = {},
  token = false,
  sessionID,
  sceneID
}): Promise<void> {
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  const endpoint = getEndpointURL('answer', sessionID, sceneID);
  const fetchResponse = await fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(json),
    headers
  });

  if (!fetchResponse.ok) {
    throw new Error(
      `Answer Submit Request failed: ${fetchResponse.statusText}`
    );
  }

  return fetchResponse.json();
}

export default handleSubmitAnswer;

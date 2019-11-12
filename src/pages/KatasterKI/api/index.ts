import { HTTPError } from 'ky';
import { ProfileRequest, ProfileResponse } from '../types';
import { marshallProfile } from './utils';

export const profilesEndpointUrl = 'http://localhost:8080'; // TODO: configure

// Using plain fetch api here because ky makes problems in unit tests, see https://github.com/FixMyBerlin/fixmy.platform/issues/116
// TODO: make sure we use a fetch polyfill
async function handleSubmitProfile({
  json = {},
  token = false
}): Promise<ProfileResponse> {
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  const fetchResponse = await fetch(profilesEndpointUrl, {
    method: 'POST',
    body: JSON.stringify(json),
    headers
  });

  if (!fetchResponse.ok) {
    throw new Error(
      `Profile Submit Request failed: ${fetchResponse.statusText}`
    );
  }

  return fetchResponse.json();
}

async function submitProfile(
  profileRequest: ProfileRequest
): Promise<ProfileResponse> {
  return handleSubmitProfile({ json: profileRequest });
}

export default {
  submitProfile,
  marshallProfile
};

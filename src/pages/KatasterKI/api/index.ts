import { HTTPError } from 'ky';
import {
  ProfileRequest,
  ProfileResponse,
  PerspectiveRequest,
  PerspectiveResponse
} from '../types';
import { marshallProfile, getEndpointURL } from './utils';

export const profilesEndpointUrl = 'http://localhost:8080'; // TODO: configure

// Using plain fetch api here because ky makes problems in unit tests,
// see https://github.com/FixMyBerlin/fixmy.platform/issues/116

// TODO: make sure we use a fetch polyfill
async function handleSubmitProfile({
  json = {},
  token = false,
  sessionID
}): Promise<ProfileResponse> {
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  const endpoint = getEndpointURL('profile', sessionID, null);
  const fetchResponse = await fetch(endpoint, {
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

const sleep = () => new Promise((resolve) => setTimeout(resolve, 200));

async function submitProfile(
  profileRequest: ProfileRequest
): Promise<ProfileResponse> {
  if (config.debug) {
    await sleep();
    return {
      ratings_total: 54,
      scenes: ['01_MS_C_139', '01_MS_C_27']
    };
  } else {
    return handleSubmitProfile({
      json: profileRequest,
      sessionID: profileRequest.sessionID
    });
  }
}

async function submitPerspective(
  perspectiveRequest: PerspectiveRequest
): Promise<PerspectiveResponse> {
  if (config.debug) {
    await sleep();
    return {
      ratings_total: 115,
      scenes: ['01_MS_C_73']
    };
  } else {
    console.error('Not implemented', perspectiveRequest);
  }
}

export default {
  submitProfile,
  marshallProfile,
  submitPerspective,
  getEndpointURL
};

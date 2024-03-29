import { ValidatorResult, Validator } from 'jsonschema';

import config from '~/pages/KatasterKI/config';
import logger from '~/utils/logger';

import introQuestions from '../config/introQuestions';
import { State } from '../state';
import { ProfileResponse, ProfileRequest } from '../types';
import { getEndpointURL, marshallMultiChoice } from './utils';

// JSON import apparently only works in ts when using `require`
const profileRequestSchema = require('../scheme/profile-request.schema.json');

type marshallProfileStateParam = { KatasterKIState: State };

// Using plain fetch api here because ky makes problems in unit tests,
// see https://github.com/FixMyBerlin/fixmy.platform/issues/116

// TODO: make sure we use a fetch polyfill
async function handleSubmitProfile({
  json = {},
  token = false,
  sessionID,
}): Promise<ProfileResponse> {
  const authHeader = token ? { Authorization: `JWT ${token}` } : {};
  const endpoint = getEndpointURL('profile', sessionID, null);
  const fetchResponse = await fetch(endpoint, {
    method: 'PUT',
    mode: 'cors',
    body: JSON.stringify(json),
    headers: {
      ...authHeader,
      'Content-Type': 'application/json',
    },
  });

  if (!fetchResponse.ok) {
    throw new Error(
      `Profile Submit Request failed: ${fetchResponse.statusText}`
    );
  }

  return fetchResponse.json();
}

/**
 * JSON-validates a profileRequest.
 *
 * @param profileRequest
 * @throws will throw an error describing the difference between instance and
 *    schema.
 */
export const validateProfileRequest = (profileRequest: ProfileRequest) => {
  const schemaValidationResult: ValidatorResult = new Validator().validate(
    profileRequest,
    profileRequestSchema
  );
  if (schemaValidationResult.errors.length) {
    let errorMsg =
      'ProfileRequest object is not structured as stated in json schema';
    schemaValidationResult.errors.forEach(({ property, message }) => {
      errorMsg += `
          Property ${property} ${message}`;
    });
    throw new Error(errorMsg);
  }
  return schemaValidationResult.valid;
};

/**
 * Marshall and validate all data required for profile request
 *
 * @param state KatasterKI state object after all data has been collected
 * @throws will throw an error when any required data fields are null
 *    or the TOS are not accepted
 */
export const marshallProfile = (
  state: marshallProfileStateParam
): ProfileRequest => {
  const {
    profile,
    userGroup,
    transportRatings,
    isTosAccepted,
    currentPerspective,
    sessionID,
    introSelection,
  } = state.KatasterKIState;

  if (!isTosAccepted === true)
    throw new Error('Trying to marshall profile without accepted TOS');

  let bikeReasons;
  let bikeReasonsVar;
  let whyBiking;
  let vehiclesOwned;
  try {
    ({ choices: bikeReasons, other: bikeReasonsVar } = marshallMultiChoice(
      profile.bikeReasons
    ));

    ({ choices: whyBiking } = marshallMultiChoice(profile.whyBiking));
    ({ choices: vehiclesOwned } = marshallMultiChoice(profile.vehiclesOwned));
  } catch (e) {
    logger(`Error marshalling profile: ${e.message}`);
    throw e;
  }

  const profileRequest = {
    ageGroup: profile.ageGroup,
    berlinTraffic: profile.berlinTraffic,
    bicycleUse: profile.bicycleUse,
    district: profile.district,
    gender: profile.gender,
    hasChildren: profile.hasChildren,
    motivationalFactors: profile.motivationalFactors,
    offended: profile.offended,
    responsible: profile.responsible,
    zipcode: profile.zipcode,
    perspective: currentPerspective,
    vehiclesOwned,
    whyBiking,
    bikeReasons,
    bikeReasonsVar,
    userGroup,
    isTosAccepted,
    sessionID,
    transportRatings,
    introSelection: [],
  };

  // Insert intro questions
  let introID: string;
  introSelection.forEach((i) => {
    introID = introQuestions[i].name;
    profileRequest.introSelection.push(introID);
    profileRequest[introID] = profile[introID];
  });

  if (
    profileRequest.introSelection.length !== config.katasterKI.numIntroQuestions
  )
    throw new Error('Profile contains a wrong number of intro questions');

  try {
    // TODO: consider adapting eslint-config. keeping the util func below this call is fine IMHO
    // eslint-disable-next-line no-use-before-define
    validateProfileRequest(profileRequest);
  } catch (e) {
    throw new Error(
      `Marshalled profileRequest failed: ${e.message}
        ${JSON.stringify(profileRequest, null, 2)}`
    );
  }

  return profileRequest;
};

export default handleSubmitProfile;

import { Validator, ValidatorResult } from 'jsonschema';

import {
  Perspective,
  ProfileRequest,
  TransportMode,
  TransportRating,
  UserGroup
} from '../types';
import { State, MultiChoice } from '../state';

// JSON import apparently only works in ts when using `require`
const profileRequestSchema = require('../scheme/profile-request.schema.json');

type marshallProfileStateParam = { KatasterKIState: State };

/**
 * Marshall state of a multi_choice component for sending in a request
 *
 * @param values state of multi_choice input component
 */
const marshallMultiChoice = (
  values: MultiChoice
): {
  choices: Array<string>;
  other: string;
} => {
  let other = '';
  const choices = Object.keys(values)
    .map((field) => {
      if (field.endsWith('-input')) {
        other = values[field].toString();
      } else {
        return values[field] ? field : null;
      }
    })
    .filter((val) => val != null);
  return {
    choices,
    other
  };
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
    currentPerspective
  } = state.KatasterKIState;

  // profile.district is optional, everything else is required
  const isComplete = [
    profile.ageGroup,
    profile.berlinTraffic,
    profile.bicycleUse,
    profile.bikeReasons,
    profile.gender,
    profile.hasChildren,
    profile.motivationalFactors,
    profile.zipcode,
    profile.vehiclesOwned,
    profile.whyBiking,
    userGroup,
    transportRatings,
    currentPerspective
  ].every((val) => val != null);

  if (!isComplete) throw new Error('Trying to marshall incomplete profile');
  if (!isTosAccepted === true)
    throw new Error('Trying to marshall profile without accepted TOS');

  const { choices: bikeReasons, other: bikeReasonsVar } = marshallMultiChoice(
    profile.bikeReasons
  );

  const { choices: whyBiking } = marshallMultiChoice(profile.whyBiking);
  const { choices: vehiclesOwned } = marshallMultiChoice(profile.vehiclesOwned);

  const profileRequest = {
    ageGroup: profile.ageGroup,
    berlinTraffic: profile.berlinTraffic,
    bicycleUse: profile.bicycleUse,
    district: profile.district,
    gender: profile.gender,
    hasChildren: profile.hasChildren,
    motivationalFactors: profile.motivationalFactors,
    zipcode: profile.zipcode,
    perspective: currentPerspective,
    vehiclesOwned,
    whyBiking,
    bikeReasons,
    bikeReasonsVar,
    userGroup,
    isTosAccepted,
    transportRatings
  };

  try {
    // TODO: consider adapting eslint-config. keeping the util func below this call is fine IMHO
    // eslint-disable-next-line no-use-before-define
    validateProfileRequest(profileRequest);
  } catch (e) {
    throw new Error(`Marshalled profileRequest failed: ${e.message}`);
  }

  return profileRequest;
};

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
      'ProfileRequest object is not ' + 'structured as stated in json schema';
    schemaValidationResult.errors.forEach(({ property, message }) => {
      errorMsg += `
        Property ${property} ${message}`;
    });
    throw new Error(errorMsg);
  }
  return schemaValidationResult.valid;
};

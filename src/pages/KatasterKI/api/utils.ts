import { Validator, ValidatorResult } from 'jsonschema';

import {
  Perspective,
  ProfileRequest,
  TransportMode,
  TransportRating,
  UserGroup
} from '../types';
import { State } from '../state';

// JSON import apparently only works in ts when using `require`
const profileRequestSchema = require('../scheme/profile-request.schema.json');

/**
 * Marshall and validate all data required for profile request
 *
 * @param state State object after all data has been collected
 * @throws will throw an error when any required data fields are null
 *    or the TOS are not accepted
 */
export const marshallProfile = (state: State): ProfileRequest => {
  const { profile, userGroup, transportRatings, isAgbAccepted } = state;

  // profile.district is optional, everything else is required
  const isComplete = [
    profile.ageGroup,
    profile.berlinTraffic,
    profile.bicycleAccident,
    profile.bicycleUse,
    profile.bikeReasons,
    profile.gender,
    profile.hasChildren,
    profile.zipcode,
    profile.vehiclesOwned,
    userGroup,
    transportRatings
  ].every((val) => val != null);

  if (!isComplete) throw new Error('Trying to marshall incomplete profile');
  if (!isAgbAccepted === true)
    throw new Error('Trying to marshall profile without accepted TOS');

  const profileRequest = {
    ageGroup: profile.ageGroup,
    berlinTraffic: profile.berlinTraffic,
    bicycleAccident: profile.bicycleAccident,
    bicycleUse: profile.bicycleUse,
    bikeReasons: profile.bikeReasons,
    district: profile.district,
    gender: profile.gender,
    hasChildren: profile.hasChildren,
    zipcode: profile.zipcode,
    vehiclesOwned: profile.vehiclesOwned,
    userGroup,
    isAgbAccepted,
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

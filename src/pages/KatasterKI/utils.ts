import {
  TransportRating,
  TransportMode,
  UserGroup,
  Perspective,
  ProfileRequest
} from './types';
import { State } from './state';

interface TransportRatings {
  [mode: string]: TransportRating;
}

/**
 * Determine a usergroup given ratings given for different transport modes by
 * the user
 *
 * @param transportRatings rating values for each TransportMode
 */
export const getUserGroup = (transportRatings: TransportRatings): UserGroup =>
  transportRatings[TransportMode.car] > 2 ? UserGroup.car : UserGroup.bicycle;

const userGroupToPerspective = {
  [UserGroup.bicycle]: Perspective.bicycle,
  [UserGroup.potentialBicycle]: Perspective.bicycle,
  [UserGroup.car]: Perspective.car,
  [UserGroup.pedestrian]: Perspective.pedestrian
};

/**
 * Determine the initial perspetive for users in a given usergroup
 *
 * @param userGroup userGroup as determined by getUserGroup
 */
export const getInitialPerspective = (userGroup: UserGroup): Perspective =>
  userGroupToPerspective[userGroup];

/**
 * Marshall and validate all data required for profile request
 *
 * @param state State object after all data has been collected
 * @throws will throw an error when any required data fields are null
 *    or the TOS are not accepted
 */
export const marshallProfileForUpload = (state: State): ProfileRequest => {
  const profile = state.profile;

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
    state.userGroup,
    state.transportRatings
  ].every((val) => val != null);

  if (!isComplete) throw new Error('Trying to marshall incomplete profile');
  if (!state.isTosAccepted === true)
    throw new Error('Trying to marshall profile without accepted TOS');

  return {
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
    userGroup: state.userGroup,
    isTosAccepted: state.isTosAccepted,
    transportRatings: state.transportRatings
  };
};

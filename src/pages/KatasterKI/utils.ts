import {
  Perspective,
  TransportMode,
  TransportRating,
  UserGroup
} from './types';

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

/** Build an endpoint URL given an endpoint configured in the global config
 *
 * @param endpoint name of the endpoint from config.katasterKI.api
 */
export const getEndpointURL = (endpoint: string): string =>
  `${config.apiUrl}/${config.katasterKI.api[endpoint]}`;

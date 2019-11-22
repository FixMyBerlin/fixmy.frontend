import uuidv4 from 'uuid/v4';

import {
  Perspective,
  TransportMode,
  TransportRating,
  UserGroup
} from './types';

const userGroups: Array<
  UserGroupAssociation
> = require('./config/userGroups.json');

interface TransportRatings {
  [mode: string]: TransportRating;
}

type UserGroupAssociation = TransportRating & {
  userGroup: UserGroup;
};

/**
 * Determine a usergroup given ratings given for different transport modes by
 * the user
 *
 * @param transportRatings rating values for each TransportMode
 */
export const getUserGroup = (transportRatings: TransportRatings): UserGroup => {
  const match = userGroups.find((ug: UserGroupAssociation) =>
    Object.keys(transportRatings).every(
      (mode) => ug[mode] === transportRatings[mode]
    )
  );
  if (match == null) {
    if (config.debug)
      console.warn('No usergroup match for transportRatings', transportRatings);
    return UserGroup.bicycle;
  } else {
    return match.userGroup;
  }
};

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
 * Return a unique user uid that allows identifying a user when interfacing
 * with the server
 */
export const makeSessionID = () => uuidv4();

/**
 * Toggle a warning that is displayed when users try and navigate away
 *
 * @param isEnabled set to true to enable showing a warning
 */
export const toggleNavigationWarning = (isEnabled: boolean) => {
  if (isEnabled) {
    window.onbeforeunload = () =>
      'Die Umfrage wird abgebrochen, wenn Sie die Seite verlassen.';
  } else {
    window.onbeforeunload = null;
  }
};

/**
 * Return the threshold displayed on the feedback screen
 *
 * The first part of the function defines concrete steps, the second part
 * defines a dynamic threshold that always shifts above the current
 * totalRatings number.
 */
export const getFeedbackThreshold = (totalRatings: number): number => {
  if (totalRatings < 100) return 100;
  if (totalRatings < 300) return 300;
  if (totalRatings < 500) return 500;
  if (totalRatings < 1000) return 1000;

  const step = totalRatings < 10000 ? 1000.0 : 5000.0;
  const threshold = Math.ceil((totalRatings + 1) / step) * step;
  return Math.round(threshold);
};

/**
 * Shuffle an array in place using Fisher-Yates-shuffle
 *
 * Taken from https://stackoverflow.com/a/6274381
 *
 * @param array array to be shuffled
 */
export const shuffle = (a: Array<any>): void => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
};

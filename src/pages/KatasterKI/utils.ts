import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import uuidv4 from 'uuid/v4';
import logger from '~/utils/logger';

import { Perspective, TransportRating, UserGroup } from './types';

const userGroups: Array<UserGroupAssociation> = require('./config/userGroups.json');

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
    logger('No usergroup match for transportRatings', transportRatings);
    return UserGroup.bicycle;
  }
  return match.userGroup;
};

const userGroupToPerspective = {
  [UserGroup.bicycle]: Perspective.bicycle,
  [UserGroup.potentialBicycle]: Perspective.bicycle,
  [UserGroup.car]: Perspective.car,
  [UserGroup.pedestrian]: Perspective.pedestrian,
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

  const step = 25000.0;
  const threshold = Math.ceil((totalRatings + 1) / step) * step;
  return Math.round(threshold);
};

/**
 * Send signal to iFrame parent to close the survey
 *
 */
export const handleQuit = () => {
  window.parent.postMessage({ msg: 'done' }, '*');
};

/**
 * Shuffle an array using Fisher-Yates-shuffle
 *
 * Taken from https://stackoverflow.com/a/6274381
 *
 * @param array array to be shuffled
 */
export const shuffle = (x: Array<any>): Array<any> => {
  const a = [...x];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/**
 * Generate a selection of indices
 *
 * Generates an array of all integers up to `max`, shuffles them and
 * returns the first `num` entries.
 */
export const makeIntroSelection = (max: number, num: number) =>
  shuffle(Array.from(Array(max).keys())).slice(0, num);

/**
 * Scroll to top on navigation
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/**
 * Register an e-mail address for the Tagesspiegel Checkpoint newsletter
 */
export const signupTSPNewsletter = async (email: string) => {
  const url = 'https://nl.tagesspiegel.de/form.do';
  const data = {
    agnCI: '875',
    agnFN: 'de_doi_confirm',
    agnMAILINGLIST: '21005',
    agnSUBSCRIBE: '1',
    sonderkampagne: 'lab',
    submit: 'true',
    email,
  };

  const params = new URLSearchParams(data);

  fetch(url, {
    method: 'POST',
    body: params,
    mode: 'cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

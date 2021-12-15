import { Dispatch } from 'redux';

import logger from '~/utils/logger';

import api from './api';
import config from './config';
import introQuestions from './config/introQuestions';
import {
  Answer,
  Perspective,
  Rating,
  RequestState,
  TransportMode,
  TransportRating,
  UserGroup,
  ProfileRequest,
  ProfileResponse,
} from './types';
import {
  getUserGroup,
  makeSessionID,
  toggleNavigationWarning,
  getInitialPerspective,
  makeIntroSelection,
} from './utils';

export const SET_TOS_ACCEPTED = 'KatasterKI/SET_TOS_ACCEPTED';
export const SET_ANSWER = 'KatasterKI/SET_ANSWER';
export const SET_EMBEDDED = 'KatasterKI/SET_EMBEDDED';
export const SET_PROFILE_ANSWER = 'KatasterKI/SET_PROFILE_ANSWER';
export const SET_TRANSPORT_RATING = 'KatasterKI/SET_TRANSPORT_RATING';
export const SET_PERSPECTIVE = 'KatasterKI/SET_PERSPECTIVE';
export const SET_ZIPCODE = 'KatasterKI/SET_ZIPCODE';
export const UPDATE_PROGRESS_BAR = 'KatasterKI/UPDATE_PROGRESS_BAR';
export const RECEIVED_SCENE_GROUP = 'KatasterKI/RECEIVED_SCENE_GROUP';
export const SUBMIT_PROFILE_PENDING = 'KatasterKI/SUBMIT_PROFILE_PENDING';
export const SUBMIT_PROFILE_ERROR = 'KatasterKI/SUBMIT_PROFILE_ERROR';
export const SUBMIT_PROFILE_COMPLETE = 'KatasterKI/SUBMIT_PROFILE_COMPLETE';
export const SUBMIT_PERSPECTIVE_PENDING =
  'KatasterKI/SUBMIT_PERSPECTIVE_PENDING';
export const SUBMIT_PERSPECTIVE_ERROR = 'KatasterKI/SUBMIT_PERSPECTIVE_ERROR';
export const SUBMIT_PERSPECTIVE_COMPLETE =
  'KatasterKI/SUBMIT_PERSPECTIVE_COMPLETE';
export const SUBMIT_ANSWER_ERROR = 'KatasterKI/SUBMIT_ANSWER_ERROR';

export type MultiChoice = {
  [name: string]: boolean | string;
};

export type BooleanMultiChoice = {
  [name: string]: boolean;
};

type RadioGroups = {
  [name: string]: number;
};

type SingleChoice<P> = P;
export interface State {
  currentPerspective?: Perspective;
  districtOptions?: Array<string>;
  isTosAccepted: boolean;
  profile: {
    ageGroup?: SingleChoice<number>;
    berlinTraffic?: BooleanMultiChoice;
    bicycleUse?: SingleChoice<number>;
    bikeReasons?: MultiChoice;
    district?: string;
    gender?: 'm' | 'w' | 'd';
    hasChildren?: boolean;
    motivationalFactors?: RadioGroups;
    offended?: number;
    responsible?: number;
    zipcode: string;
    vehiclesOwned?: MultiChoice;
    whyBiking?: MultiChoice;
  };
  progressBar: {
    current: number;
    total: number;
  };
  scenes: Array<Answer>;
  profileRequest: {
    state: RequestState;
    message?: string;
  };
  perspectiveRequest: {
    state: RequestState;
    message?: string;
  };
  sessionID: string;
  statisticsCounter?: number; // total count of ratings as reported by backend
  ratingsCounter: number; // number of ratings made in this session
  sceneGroupCounter: number; // current round of scenegroups
  isEmbedded: boolean;
  transportRatings: {
    [mode: string]: TransportRating;
  };
  userGroup: UserGroup;
  introSelection: Array<number>;
}

interface Action {
  type: string;
  value?: any;
  profile?: {
    question: string;
    value: number | string | boolean | { [option: string]: boolean };
  };
  transportRating?: {
    type: TransportMode;
    rating: number;
  };
  perspective?: Perspective;
  area?: {
    zipcode: string;
    district: string;
    districtOptions: Array<string>;
  };
  answer?: Answer;
  requestInfo?: {
    type: 'profileRequest' | 'perspectiveRequest';
    state: RequestState;
    message?: string;
  };
  message?: string;
  error?: string; // an error message to display to the user,
  profileResponse?: ProfileResponse;
}

export const productionDefaultState: State = {
  isTosAccepted: true,
  transportRatings: {
    pedestrian: 0,
    bicycle: 0,
    motorbike: 0,
    car: 0,
    public: 0,
  },
  profile: {
    bikeReasons: {},
    motivationalFactors: {},
    vehiclesOwned: {},
    whyBiking: {},
    zipcode: '',
  },
  progressBar: {
    current: 0,
    total: 0,
  },
  profileRequest: {
    state: RequestState.waiting,
  },
  perspectiveRequest: {
    state: RequestState.waiting,
  },
  userGroup: UserGroup.bicycle,
  scenes: [],
  currentPerspective: Perspective.bicycle,
  sceneGroupCounter: 0,
  isEmbedded: false,
  ratingsCounter: 0,
  sessionID: makeSessionID(),
  introSelection: makeIntroSelection(
    introQuestions.length,
    config.katasterKI.numIntroQuestions
  ),
};

// This state is used in the dev environment and for integration tests
// to simulate an already filled form
export const testingDefaultState: State = {
  ...productionDefaultState,
  isTosAccepted: true,
  transportRatings: {
    pedestrian: 0,
    bicycle: 5,
    motorbike: 3,
    car: 0,
    public: 3,
  },
  profile: {
    ageGroup: 1,
    bicycleUse: 0,
    bikeReasons: {},
    district: 'Mitte',
    gender: 'd',
    motivationalFactors: {
      bikeFun: 4,
      faster: 4,
      weather: 4,
      safe: 4,
    },
    hasChildren: true,
    vehiclesOwned: {
      car: true,
    },
    whyBiking: {
      fun: true,
    },
    zipcode: '22000',
  },
  statisticsCounter: 1234,
  userGroup: UserGroup.bicycle,
  currentPerspective: Perspective.bicycle,
};

// Either use a) a test state defined by cypress when this code runs in an e2e test
// or b) use the testing- or productionDefaultState defined above.

// extend the Window Interface to the namespaces declared in e2e tests.
declare global {
  interface Window {
    Cypress: any;
    initialState: {
      KatasterKIState: State;
    };
  }
}
const defaultState =
  (window.Cypress && window.initialState?.KatasterKIState) ||
  (config.debug ? testingDefaultState : productionDefaultState);

export default function reducer(
  state: State = defaultState,
  action: Action = { type: null }
) {
  switch (action.type) {
    case SET_TOS_ACCEPTED:
      return { ...state, isTosAccepted: action.value };

    case SET_ANSWER: {
      const scenes = Array.from(state.scenes);
      const answerPos = scenes.findIndex(
        (sc) => sc.sceneID === action.answer.sceneID
      );
      scenes[answerPos] = action.answer;

      // The ratingsCounter should actually only be incremented if this scene
      // has not been rated before. This is not considered here and might be
      // important if this code is used again in the future.
      // See https://github.com/FixMyBerlin/fixmy.platform/issues/223

      return {
        ...state,
        scenes,
        ratingsCounter: state.ratingsCounter + 1,
        statisticsCounter: state.statisticsCounter + 1,
      };
    }

    case SET_EMBEDDED:
      return { ...state, isEmbedded: action.value };

    case SET_PROFILE_ANSWER: {
      const { question, value } = action.profile;
      return {
        ...state,
        profile: {
          ...state.profile,
          [question]: value,
        },
      };
    }

    case SUBMIT_PERSPECTIVE_PENDING:
      return {
        ...state,
        perspectiveRequest: { state: RequestState.pending },
      };

    case SUBMIT_PERSPECTIVE_ERROR:
      return {
        ...state,
        perspectiveRequest: {
          state: RequestState.error,
          message: action.error,
        },
      };

    case SUBMIT_PERSPECTIVE_COMPLETE:
      return {
        ...state,
        currentPerspective: action.value,
        perspectiveRequest: { state: RequestState.success },
      };

    case SUBMIT_PROFILE_PENDING:
      return {
        ...state,
        profileRequest: { state: RequestState.pending },
      };

    case SUBMIT_PROFILE_ERROR:
      return {
        ...state,
        profileRequest: { state: RequestState.error, message: action.error },
      };
    case SUBMIT_PROFILE_COMPLETE:
      return {
        ...state,
        profileRequest: { state: RequestState.success },
      };

    case RECEIVED_SCENE_GROUP:
      return {
        ...state,
        scenes: action.value.scenes.map(
          (sceneID: string): Answer => ({
            sceneID,
            rating: null,
            duration: null,
          })
        ),
        statisticsCounter: action.value.ratings_total,
        sceneGroupCounter: state.sceneGroupCounter + 1,
      };

    case SET_TRANSPORT_RATING: {
      const transportRatings = {
        ...state.transportRatings,
        [action.transportRating.type]: action.transportRating.rating,
      };
      const userGroup = getUserGroup(transportRatings);
      const currentPerspective = getInitialPerspective(userGroup);

      return { ...state, transportRatings, userGroup, currentPerspective };
    }

    case SET_PERSPECTIVE:
      return { ...state, perspective: action.perspective };

    case SET_ZIPCODE: {
      const { zipcode, district, districtOptions } = action.area;
      return {
        ...state,
        districtOptions,
        profile: {
          ...state.profile,
          zipcode,
          district,
        },
      };
    }

    case UPDATE_PROGRESS_BAR: {
      const { current, total } = action.value;
      const newTotal = total == null ? state.progressBar.total : total;
      return {
        ...state,
        progressBar: {
          current,
          total: newTotal,
        },
      };
    }

    default:
      return state;
  }
}

/**
 * Record when the user accepts the TOS and PP
 *
 * @param value whether the user has accepted the terms of service and
 *    recognized the privacy policy
 */
export function setTOSAccepted(value: boolean): Action {
  toggleNavigationWarning(true);
  return { type: SET_TOS_ACCEPTED, value };
}

export function setAnswer(
  sceneID: string,
  rating: Rating,
  duration: number
): Action {
  return {
    type: SET_ANSWER,
    answer: { sceneID, rating, duration },
  };
}

/**
 * Record answers pertaining to the participants profile such as demographics
 *
 * @param question identifier as spelled in the State and ProfileRequest types
 * @param value value may be a literal or a simple object
 */
export function setProfileAnswer(question: string, value: any): Action {
  return { type: SET_PROFILE_ANSWER, profile: { question, value } };
}

/**
 * Change the perspective from which SceneGroups will be fetched for the user
 *
 * @param perspective the new perspective
 */
export function setPerspective(perspective: Perspective): Action {
  return { type: SET_PERSPECTIVE, perspective };
}

/**
 * Set the user's zipcode and an optional district
 *
 * @param zipcode
 * @param district optional for some zipcodes that are defined in global config
 */
export function setZipcode(zipcode: string, district: string): Action {
  // @ts-ignore
  const districtOptions = config.katasterKI.zipcodeDistricts[zipcode];
  return { type: SET_ZIPCODE, area: { zipcode, district, districtOptions } };
}

export function setEmbedded(isEmbedded: boolean) {
  return { type: SET_EMBEDDED, value: isEmbedded };
}

/**
 * Update the progress bar
 *
 * @param current one-indexed
 * @param total number of panes in the progress bar
 */
export function updateProgressBar(current: number, total?: number) {
  return { type: UPDATE_PROGRESS_BAR, value: { current, total } };
}

export function setTransportRating(
  type: TransportMode,
  rating: number
): Action {
  return { type: SET_TRANSPORT_RATING, transportRating: { type, rating } };
}

export function submitProfilePending(): Action {
  return { type: SUBMIT_PROFILE_PENDING };
}
export function submitProfileError(errorMessage: string): Action {
  return { type: SUBMIT_PROFILE_ERROR, error: errorMessage };
}
export function submitProfileComplete(): Action {
  // Once the profile has been submitted, no information is lost when
  // users navigate away from the page
  toggleNavigationWarning(false);
  return { type: SUBMIT_PROFILE_COMPLETE };
}

export function submitPerspectivePending(): Action {
  return { type: SUBMIT_PERSPECTIVE_PENDING };
}
export function submitPerspectiveError(errorMessage: string): Action {
  return { type: SUBMIT_PERSPECTIVE_ERROR, error: errorMessage };
}
export function submitPerspectiveComplete(perspective: Perspective): Action {
  return {
    type: SUBMIT_PERSPECTIVE_COMPLETE,
    value: perspective,
  };
}

export function submitAnswerError(errorMessage: string): Action {
  // TODO: Should this result in anything?
  return { type: SUBMIT_ANSWER_ERROR, error: errorMessage };
}

export function receivedSceneGroup(
  scenes: Array<string>,
  ratingsTotal: number
) {
  return {
    type: RECEIVED_SCENE_GROUP,
    value: { scenes, ratings_total: ratingsTotal },
  };
}

// thunks

export const submitProfile = () => async (dispatch: Dispatch, getState) => {
  let profileToSubmit: ProfileRequest;

  dispatch(submitProfilePending());

  try {
    profileToSubmit = api.marshallProfile(getState());
    const { scenes, ratings_total: ratingsTotal } = await api.submitProfile(
      profileToSubmit
    );
    dispatch(receivedSceneGroup(scenes, ratingsTotal));
    dispatch(submitProfileComplete());
  } catch (e) {
    dispatch(
      submitProfileError('Das Nutzerprofil konnte nicht übertragen werden.')
    );
    logger(`Failed to submit profile: ${e.message}`);
    throw e;
  }
};

export const submitPerspective =
  (perspective: Perspective) => async (dispatch: Dispatch, getState) => {
    dispatch(submitPerspectivePending());
    const {
      KatasterKIState: { sessionID },
    } = getState();
    try {
      const { scenes, ratings_total: ratingsTotal } =
        await api.submitPerspective({
          perspective,
          sessionID,
        });
      dispatch(receivedSceneGroup(scenes, ratingsTotal));
      dispatch(submitPerspectiveComplete(perspective));
    } catch (e) {
      dispatch(
        submitProfileError(
          'Die nächste Szenengruppe konnte nicht angefragt werden.'
        )
      );
      if (process.env.NODE_ENV !== 'test') throw e;
    }
  };

export const submitAnswer =
  (
    sceneID: Answer['sceneID'],
    rating: Answer['rating'],
    duration: Answer['duration']
  ) =>
  async (dispatch: Dispatch, getState) => {
    dispatch(setAnswer(sceneID, rating, duration));

    const {
      KatasterKIState: { sessionID },
    } = getState();
    try {
      await api.submitAnswer({
        sceneID,
        rating,
        duration,
        sessionID,
      });
    } catch (e) {
      dispatch(
        submitAnswerError(
          'Beim Übermitteln der Bewertung ist etwas schiefgelaufen'
        )
      );
      if (process.env.NODE_ENV !== 'test') throw e;
    }
  };

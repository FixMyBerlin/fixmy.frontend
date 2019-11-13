import { Dispatch } from 'redux';
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
  PerspectiveResponse
} from './types';
import { getUserGroup } from './utils';
import api from './api';

const SET_TOS_ACCEPTED = 'KatasterKI/SET_TOS_ACCEPTED';
const SET_ANSWER = 'KatasterKI/SET_ANSWER';
const SET_PROFILE_ANSWER = 'KatasterKI/SET_PROFILE_ANSWER';
const SET_TRANSPORT_RATING = 'KatasterKI/SET_TRANSPORT_RATING';
const SET_PERSPECTIVE = 'KatasterKI/SET_PERSPECTIVE';
const SET_ZIPCODE = 'KatasterKI/SET_ZIPCODE';
const UPDATE_PROGRESS_BAR = 'KatasterKI/UPDATE_PROGRESS_BAR';
export const RECEIVED_SCENE_GROUP = 'KatasterKI/RECEIVED_SCENE_GROUP';
export const SUBMIT_PROFILE_PENDING = 'KatasterKI/SUBMIT_PROFILE_PENDING';
export const SUBMIT_PROFILE_ERROR = 'KatasterKI/SUBMIT_PROFILE_ERROR';
export const SUBMIT_PROFILE_COMPLETE = 'KatasterKI/SUBMIT_PROFILE_COMPLETE';
export const SUBMIT_PERSPECTIVE_PENDING =
  'KatasterKI/SUBMIT_PERSPECTIVE_PENDING';
export const SUBMIT_PERSPECTIVE_ERROR = 'KatasterKI/SUBMIT_PERSPECTIVE_ERROR';
export const SUBMIT_PERSPECTIVE_COMPLETE =
  'KatasterKI/SUBMIT_PERSPECTIVE_COMPLETE';

export type MultiChoice = {
  [name: string]: boolean | string;
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
    berlinTraffic?: SingleChoice<number>;
    bicycleUse?: SingleChoice<number>;
    bikeReasons?: MultiChoice;
    district?: string;
    gender?: 'm' | 'w' | 'd';
    hasChildren?: boolean;
    motivationalFactors?: RadioGroups;
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
  statisticsCounter?: number; // total count of ratings as reported by backend
  transportRatings: {
    [mode: string]: TransportRating;
  };
  userGroup: UserGroup;
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

const productionDefaultState: State = {
  isTosAccepted: false,
  transportRatings: {},
  profile: {
    zipcode: ''
  },
  progressBar: {
    current: 0,
    total: 0
  },
  profileRequest: {
    state: RequestState.waiting
  },
  perspectiveRequest: {
    state: RequestState.waiting
  },
  userGroup: UserGroup.bicycle,
  scenes: [],
  currentPerspective: Perspective.bicycle
};

// This state is used in the dev environment and for integration tests
// to simulate an already filled form
export const testingDefaultState: State = {
  ...productionDefaultState,
  isTosAccepted: true,
  transportRatings: {
    pedelec: 0,
    bicycle: 5,
    motorbike: 3,
    car: 0,
    public: 3
  },
  profile: {
    ageGroup: 1,
    berlinTraffic: 3,
    bicycleUse: 0,
    bikeReasons: {},
    district: 'Mitte',
    gender: 'd',
    motivationalFactors: {
      bikeFun: 4,
      faster: 4,
      weather: 4,
      safe: 4
    },
    hasChildren: true,
    vehiclesOwned: {
      car: true
    },
    whyBiking: {
      fun: true
    },
    zipcode: '22000'
  },
  userGroup: UserGroup.bicycle,
  currentPerspective: Perspective.bicycle
};

const defaultState = config.debug
  ? testingDefaultState
  : productionDefaultState;

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_TOS_ACCEPTED:
      return { ...state, isTosAccepted: action.value };

    case SET_ANSWER:
      const scenes = Array.from(state.scenes);
      const answerPos = scenes.findIndex(
        (sc) => sc.sceneID === action.answer.sceneID
      );
      scenes[answerPos] = action.answer;
      return { ...state, scenes };

    case SET_PROFILE_ANSWER:
      const { question, value } = action.profile;
      return {
        ...state,
        profile: {
          ...state.profile,
          [question]: value
        }
      };

    case SUBMIT_PERSPECTIVE_PENDING:
      return {
        ...state,
        perspectiveRequest: { state: RequestState.pending }
      };

    case SUBMIT_PERSPECTIVE_ERROR:
      return {
        ...state,
        perspectiveRequest: {
          state: RequestState.error,
          message: action.error
        }
      };

    case SUBMIT_PERSPECTIVE_COMPLETE:
      return {
        ...state,
        currentPerspective: action.value,
        perspectiveRequest: { state: RequestState.success }
      };

    case SUBMIT_PROFILE_PENDING:
      return {
        ...state,
        profileRequest: { state: RequestState.pending }
      };

    case SUBMIT_PROFILE_ERROR:
      return {
        ...state,
        profileRequest: { state: RequestState.error, message: action.error }
      };
    case SUBMIT_PROFILE_COMPLETE:
      return {
        ...state,
        profileRequest: { state: RequestState.success }
      };

    case RECEIVED_SCENE_GROUP:
      return {
        ...state,
        scenes: action.value.scenes.map(
          (sceneID: string): Answer => ({
            sceneID,
            rating: null,
            duration: null
          })
        ),
        statisticsCounter: action.value.ratings_total
      };

    case SET_TRANSPORT_RATING:
      const transportRatings = {
        ...state.transportRatings,
        [action.transportRating.type]: action.transportRating.rating
      };
      const userGroup = getUserGroup(transportRatings);

      return { ...state, transportRatings, userGroup };

    case SET_PERSPECTIVE:
      return { ...state, perspective: action.perspective };

    case SET_ZIPCODE:
      const { zipcode, district, districtOptions } = action.area;
      return {
        ...state,
        districtOptions,
        profile: {
          ...state.profile,
          zipcode,
          district
        }
      };

    case UPDATE_PROGRESS_BAR:
      const { current, total } = action.value;
      const newTotal = total == null ? state.progressBar.total : total;
      return {
        ...state,
        progressBar: {
          current,
          total: newTotal
        }
      };

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
  return { type: SET_TOS_ACCEPTED, value };
}

export function setAnswer(
  sceneID: string,
  rating: Rating,
  duration: number
): Action {
  return {
    type: SET_ANSWER,
    answer: { sceneID, rating, duration }
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
export function setZipcode(zipcode: string, district?: string): Action {
  // @ts-ignore
  const districtOptions = config.katasterKI.zipcodeDistricts[zipcode];
  return { type: SET_ZIPCODE, area: { zipcode, district, districtOptions } };
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
    value: perspective
  };
}

export function receivedSceneGroup(
  scenes: Array<string>,
  ratings_total: number
) {
  return { type: RECEIVED_SCENE_GROUP, value: { scenes, ratings_total } };
}

// thunks

export const submitProfile = () => async (dispatch: Dispatch, getState) => {
  let profileToSubmit: ProfileRequest;

  dispatch(submitProfilePending());

  try {
    profileToSubmit = api.marshallProfile(getState());
    const { scenes, ratings_total } = await api.submitProfile(profileToSubmit);
    dispatch(receivedSceneGroup(scenes, ratings_total));
    dispatch(submitProfileComplete());
  } catch (e) {
    dispatch(
      submitProfileError(
        'Beim Übermitteln des Profils ist etwas schiefgelaufen'
      )
    );
    // log an error to inspect in dev tools.
    // Throwing an error would break unit tests.
    // If this is a test run, don't log the error. TODO: factor out to util method
    const cachedConsoleErrorFunc = console.error;
    if (process.env.NODE_ENV === 'test') {
      console.error = () => {};
    }
    console.error(`Failed to submit profile: ${e.message}`);
    if (process.env.NODE_ENV === 'test') {
      console.error = cachedConsoleErrorFunc;
    }
    if (process.env.NODE_ENV != 'test') throw e;
  }
};

export const submitPerspective = (perspective: Perspective) => async (
  dispatch: Dispatch,
  getState
) => {
  dispatch(submitPerspectivePending());
  try {
    const { scenes, ratings_total } = await api.submitPerspective({
      perspective
    });
    dispatch(receivedSceneGroup(scenes, ratings_total));
    dispatch(submitPerspectiveComplete(perspective));
  } catch (e) {
    dispatch(
      submitProfileError(
        'Beim Übermitteln des Perspektivwechsels ist etwas schiefgelaufen'
      )
    );
    if (process.env.NODE_ENV != 'test') throw e;
  }
};

import {
  Answer,
  Experiment,
  Perspective,
  Rating,
  SubmissionState,
  SurveySubmission,
  TransportMode,
  TransportRating,
  VehicleKind,
  UserGroup
} from './types';
import { getUserGroup } from './utils';

const SET_AGB_ACCEPTED = 'KatasterKI/SET_AGB_ACCEPTED';
const SET_ANSWER = 'KatasterKI/SET_ANSWER';
const SET_PROFILE_ANSWER = 'KatasterKI/SET_PROFILE_ANSWER';
const SET_TRANSPORT_RATING = 'KatasterKI/SET_TRANSPORT_RATING';
const SET_PERSPECTIVE = 'KatasterKI/SET_PERSPECTIVE';
const SET_POSTCODE = 'KatasterKI/SET_POSTCODE';
const SET_DISTRICT_OPTIONS = 'KatasterKI/SET_DISTRICT_OPTIONS';
const SET_SUBMISSION_STATE = 'KatasterKI/SET_SUBMISSION_STATE';
const SUBMIT_SURVEY = 'KatasterKI/SUBMIT_SURVEY';
const UPDATE_PROGRESS_BAR = 'KatasterKI/UPDATE_PROGRESS_BAR';

interface State {
  scenes: Array<Answer>;
  profile: {
    postcode: string;
    district?: string;
    ageGroup?: 0 | 1 | 2 | 3;
    hasChildren?: boolean;
    bicycleAccident?: 0 | 1 | 2 | 3;
    gender?: 'm' | 'w' | 'd';
    bicycleUse?: 0 | 1 | 2 | 3;
    vehiclesOwned?: Array<VehicleKind>;
  };
  isAgbAccepted: boolean;
  intro: {
    bikeReasons?: Array<string>;
    berlinTraffic?: string;
  };
  transportRatings: {
    [mode: string]: TransportRating;
  };
  userGroup: UserGroup;
  districtOptions?: Array<string>;
  currentPerspective?: Perspective;
  progressBar: {
    current: number;
    total: number;
  };
  submission: {
    state: SubmissionState;
    message?: string;
  };
}

interface Action {
  type: string;
  value?: any;
  profile?: {
    question: string;
    value: number | string;
  };
  transportRating?: {
    type: TransportMode;
    rating: number;
  };
  perspective?: Perspective;
  area?: {
    postcode: string;
    district: string;
    districtOptions: Array<string>;
  };
  answer?: Answer;
  submissionState?: SubmissionState;
  message?: string;
}

const defaultState: State = {
  isAgbAccepted: false,
  intro: {},
  transportRatings: {},
  profile: {
    postcode: ''
  },
  progressBar: {
    current: 0,
    total: 0
  },
  submission: {
    state: SubmissionState.waiting
  },
  userGroup: UserGroup.bicycle,
  scenes: []
};

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_AGB_ACCEPTED:
      return { isAgbAccepted: action.value };

    case SET_ANSWER:
      const scenes = state.scenes.concat(action.answer);
      return { scenes };

    case SET_PROFILE_ANSWER:
      return {
        profile: {
          ...state.profile,
          ...action.profile
        }
      };

    case SET_TRANSPORT_RATING:
      const transportRatings = {
        ...state.transportRatings,
        [action.transportRating.type]: action.transportRating.rating
      };
      const userGroup = getUserGroup(transportRatings);

      return { transportRatings, userGroup };

    case SET_PERSPECTIVE:
      return { perspective: action.perspective };

    case SET_POSTCODE:
      const { postcode, district, districtOptions } = action.area;
      return {
        districtOptions,
        profile: {
          ...state.profile,
          postcode,
          district
        }
      };

    case SET_SUBMISSION_STATE:
      return {
        submission: {
          ...state.submission,
          state: action.submissionState,
          message: action.message
        }
      };

    case SUBMIT_SURVEY:
      console.error('not implemented');

    case UPDATE_PROGRESS_BAR:
      const { current, total } = action.value;
      const newTotal = total == null ? state.progressBar.total : total;
      return {
        progressBar: {
          current,
          total: newTotal
        }
      };

    default:
      return state;
  }
}

export function setAGBAccepted(value: boolean): Action {
  return { type: SET_AGB_ACCEPTED, value };
}

export function setAnswer(
  sceneID: string,
  rating: Rating,
  duration: number
): Action {
  return { type: SET_ANSWER, answer: { sceneID, rating, duration } };
}

export function setProfileAnswer(question: string, value: any): Action {
  return { type: SET_PROFILE_ANSWER, profile: { question, value } };
}

export function setPerspective(perspective: Perspective): Action {
  return { type: SET_PERSPECTIVE, perspective };
}

export function setPostcode(postcode: string, district?: string): Action {
  // @ts-ignore
  const districtOptions = config.postcodeDistricts[postcode];
  return { type: SET_POSTCODE, area: { postcode, district, districtOptions } };
}

export function updateProgressBar(current: number, total?: number) {
  return { type: UPDATE_PROGRESS_BAR, value: { current, total } };
}

export function setSubmissionState(
  state: SubmissionState,
  message?: string
): Action {
  return { type: SET_SUBMISSION_STATE, submissionState: state, message };
}

export function setTransportRating(
  type: TransportMode,
  rating: number
): Action {
  return { type: SET_TRANSPORT_RATING, transportRating: { type, rating } };
}

export function submitSurvey(): Action {
  return { type: SUBMIT_SURVEY };
}

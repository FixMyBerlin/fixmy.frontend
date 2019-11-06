import {
  Answer,
  AnswerRequest,
  Experiment,
  Perspective,
  Rating,
  RequestState,
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
const SET_ZIPCODE = 'KatasterKI/SET_ZIPCODE';
const SET_DISTRICT_OPTIONS = 'KatasterKI/SET_DISTRICT_OPTIONS';
const SET_REQUEST_STATE = 'KatasterKI/SET_REQUEST_STATE';
const SUBMIT_SURVEY = 'KatasterKI/SUBMIT_SURVEY';
const UPDATE_PROGRESS_BAR = 'KatasterKI/UPDATE_PROGRESS_BAR';

interface State {
  currentPerspective?: Perspective;
  districtOptions?: Array<string>;
  isAgbAccepted: boolean;
  profile: {
    ageGroup?: 0 | 1 | 2 | 3;
    berlinTraffic?: string;
    bicycleAccident?: 0 | 1 | 2 | 3;
    bicycleUse?: 0 | 1 | 2 | 3;
    bikeReasons?: Array<string>;
    district?: string;
    gender?: 'm' | 'w' | 'd';
    hasChildren?: boolean;
    zipcode: string;
    vehiclesOwned?: Array<VehicleKind>;
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
  perspectiveChangeRequest: {
    state: RequestState;
    message?: string;
  };
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
    type: 'profileRequest' | 'perspectiveChangeRequest';
    state: RequestState;
    message?: string;
  };
  message?: string;
}

const defaultState: State = {
  isAgbAccepted: false,
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
  perspectiveChangeRequest: {
    state: RequestState.waiting
  },
  userGroup: UserGroup.bicycle,
  scenes: [
    { sceneID: '01_SE_A_5312', duration: null, rating: null },
    { sceneID: '01_CP_C_5', duration: null, rating: null }
  ],
  currentPerspective: Perspective.bicycle
};

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_AGB_ACCEPTED:
      return { ...state, isAgbAccepted: action.value };

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

    case SET_REQUEST_STATE:
      const { type, state: requestState, message } = action.requestInfo;
      return {
        ...state,
        [type]: { state: requestState, message }
      };

    case SUBMIT_SURVEY:
      console.error('not implemented');

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

export function setZipcode(zipcode: string, district?: string): Action {
  // @ts-ignore
  const districtOptions = config.katasterKI.zipcodeDistricts[zipcode];
  return { type: SET_ZIPCODE, area: { zipcode, district, districtOptions } };
}

export function updateProgressBar(current: number, total?: number) {
  return { type: UPDATE_PROGRESS_BAR, value: { current, total } };
}

export function setRequestState(props): Action {
  return { type: SET_REQUEST_STATE, requestInfo: props };
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

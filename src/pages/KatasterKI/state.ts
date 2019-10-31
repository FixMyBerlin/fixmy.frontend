const SET_AGB_ACCEPTED = 'KatasterKI/SET_AGB_ACCEPTED';
const SET_ANSWER = 'KatasterKI/SET_ANSWER';
const SET_DEMOGRAPHICS_ANSWER = 'KatasterKI/SET_DEMOGRAPHICS_ANSWER';
const SET_INTRO_ANSWER = 'KatasterKI/SET_INTRO_ANSWER';
const SET_TRANSPORT_RATING = 'KatasterKI/SET_TRANSPORT_RATING';
const SET_PERSPECTIVE = 'KatasterKI/SET_PERSPECTIVE';
const SET_POSTCODE = 'KatasterKI/SET_POSTCODE';
const SET_DISTRICT_OPTIONS = 'KatasterKI/SET_DISTRICT_OPTIONS';
const SET_SUBMISSION_STATE = 'KatasterKI/SET_SUBMISSION_STATE';
const SUBMIT_SURVEY = 'KatasterKI/SUBMIT_SURVEY';

interface Submission {
  answers: {
    [sceneID: string]: {
      rating: Rating;
      duration: number;
    };
  };
  demographics: {
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
    bikeReasons?: Array<boolean>;
    berlinTraffic?: number;
  };
  transportRatings: {
    [mode: string]: TransportRating;
  };
}

interface State extends Submission {
  districtOptions?: Array<string>;
  currentPerspective?: Perspective;
  submission: {
    state: SubmissionState;
    message?: string;
  };
}

interface Answer {
  question: string;
  rating: Rating;
  duration: number;
}

interface Action {
  type: string;
  value?: any;
  demographics?: {
    question: string;
    value: number;
  };
  introAnswer?: {
    question: string;
    value: number;
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
  answer?: {
    sceneID: string;
    rating: Rating;
    duration: number;
  };
  submissionState?: SubmissionState;
  message?: string;
}

const enum Experiment {
  MainStreet = 'MS',
  CyclePath = 'CP',
  SideStreet = 'SS'
}

const enum TransportMode {
  pedestrian = 'pedestrian',
  bicycle = 'bicycle',
  motorbike = 'motorbike',
  public = 'public',
  car = 'car'
}

const enum VehicleKind {
  pedelec = 'pedelec',
  car = 'car',
  public = 'public',
  motorbike = 'motorbike',
  bicycle = 'bicycle'
}

const enum TransportRating {
  never,
  monthly,
  monthlyPlus,
  weekly,
  weeklyPlus,
  daily
}

const enum Perspective {
  bicycle = 'C',
  car = 'A',
  pedestrian = 'P'
}

const enum Rating {
  unsafe = 'unsafe',
  mostlyUnsafe = 'mostlyUnsafe',
  mostlySafe = 'mostlySafe',
  safe = 'safe'
}

const enum SubmissionState {
  waiting = 'waiting',
  pending = 'pending',
  delayed = 'delayed',
  success = 'success',
  error = 'error'
}

const defaultState: State = {
  isAgbAccepted: false,
  intro: {},
  transportRatings: {},
  demographics: {
    postcode: ''
  },
  submission: {
    state: SubmissionState.waiting
  },
  answers: {}
};

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_AGB_ACCEPTED:
      return {
        ...state,
        isAgbAccepted: action.value
      };

    case SET_ANSWER:
      const { sceneID, rating, duration } = action.answer;
      return {
        ...state,
        answers: {
          ...state.answers,
          [sceneID]: {
            rating,
            duration
          }
        }
      };

    case SET_DEMOGRAPHICS_ANSWER:
      return {
        ...state,
        demographics: {
          ...state.demographics,
          ...action.demographics
        }
      };

    case SET_INTRO_ANSWER:
      const intro = {
        ...state.intro,
        [action.introAnswer.question]: action.introAnswer.value
      };
      return { ...state, ...intro };

    case SET_TRANSPORT_RATING:
      const transportRatings = {
        ...state.transportRatings,
        [action.transportRating.type]: action.transportRating.rating
      };
      return { ...state, ...transportRatings };

    case SET_PERSPECTIVE:
      return { ...state, perspective: action.perspective };

    case SET_POSTCODE:
      const { postcode, district, districtOptions } = action.area;
      return {
        ...state,
        districtOptions,
        demographics: {
          ...state.demographics,
          postcode,
          district
        }
      };

    case SET_SUBMISSION_STATE:
      return {
        ...state,
        submission: {
          ...state.submission,
          state: action.submissionState,
          message: action.message
        }
      };

    case SUBMIT_SURVEY:
      console.error('not implemented');

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

export function setDemographicsAnswer(question: string, value: any): Action {
  return { type: SET_DEMOGRAPHICS_ANSWER, demographics: { question, value } };
}

export function setIntroAnswer(question: string, value: any): Action {
  return { type: SET_INTRO_ANSWER, introAnswer: { question, value } };
}

export function setPerspective(perspective: Perspective): Action {
  return { type: SET_PERSPECTIVE, perspective };
}

export function setPostcode(postcode: string, district?: string): Action {
  // @ts-ignore
  const districtOptions = config.postcodeDistricts[postcode];
  return { type: SET_POSTCODE, area: { postcode, district, districtOptions } };
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

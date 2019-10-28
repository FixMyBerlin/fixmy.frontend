const SET_AGB_ACCEPTED = 'KatasterKI/SET_AGB_ACCEPTED';
const SET_INTRO_ANSWER = 'KatasterKI/SET_INTRO_ANSWER';
const SET_PERSPECTIVE_ANSWER = 'KatasterKI/SET_PERSPECTIVE_ANSWER';
const SET_PERSPECTIVE_DIRECT = 'KatasterKI/SET_PERSPECTIVE_DIRECT';
const SET_DEMOGRAPHICS_ANSWER = 'KatasterKI/SET_DEMOGRAPHICS_ANSWER';
const SET_POSTCODE = 'KatasterKI/SET_POSTCODE';
const SET_POSTCODE_OPTIONS = 'KatasterKI/SET_POSTCODE_OPTIONS';

interface State {}

interface Action {
  type: string;
  value?: any;
  payload?: object;
}

const enum TransportMode {
  pedestrian,
  bicycle,
  motorbike,
  public,
  car
}

const enum Perspective {
  bicycle,
  car,
  pedestrian
}

const defaultState = {
  isAgbAccepted: false
};

export default function reducer(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_AGB_ACCEPTED:
      return {
        ...state,
        isAgbAccepted: action.value
      };
    default:
      return state;
  }
}

/**
 * Record whether the user accepted the TOS
 *
 * @param value whether the user has intentionally accepted the TOS
 */
export function setAGBAccepted(value: boolean): Action {
  return { type: SET_AGB_ACCEPTED, value };
}

export function setIntroAnswer(question: number, value: any): Action {
  return { type: SET_INTRO_ANSWER, payload: { question, value } };
}

export function setPerspectiveAnswer(
  type: TransportMode,
  rating: number
): Action {
  return { type: SET_PERSPECTIVE_ANSWER, payload: { type, rating } };
}

export function setPerspectiveDirect(perspective: Perspective): Action {
  return { type: SET_PERSPECTIVE_DIRECT, value: perspective };
}

export function setDemographicsAnswer(question: number, value: any): Action {
  return { type: SET_DEMOGRAPHICS_ANSWER, payload: { question, value } };
}

export function setPostcode(value: number): Action {
  return { type: SET_POSTCODE, value };
}

export function setPostcodeOptions(value: number): Action {
  return { type: SET_POSTCODE, value };
}

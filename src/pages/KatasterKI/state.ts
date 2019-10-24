const SET_AGB_ACCEPTED = 'KatasterKI/SET_AGB_ACCEPTED';

interface State {}

interface Action {
  type: string;
  value?: any;
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

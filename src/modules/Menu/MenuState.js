const OPEN_MENU = 'Menu/MenuState/OPEN_MENU';
const CLOSE_MENU = 'Menu/MenuState/CLOSE_MENU';

const initialState = {
  isOpen: false
};

export function open() {
  return { type: OPEN_MENU };
}

export function close() {
  return { type: CLOSE_MENU };
}

export function toggle() {
  return (dispatch, getState) => {
    const { isOpen } = getState().MenuState;

    if (isOpen) {
      return dispatch(close());
    }

    return dispatch(open());
  };
}

export default function AppReducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_MENU:
      return Object.assign({}, state, { isOpen: true });
    case CLOSE_MENU:
      return Object.assign({}, state, { isOpen: false });

    default:
      return Object.assign({}, state);
  }
}

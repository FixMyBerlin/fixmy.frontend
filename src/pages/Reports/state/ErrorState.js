const actions = {};
const types = {};

// action types

types.ADD_ERROR = 'Reports/ReportsDialogState/ADD_ERROR'; // generic error
types.REMOVE_ERROR = 'Reports/ReportsDialogState/REMOVE_ERROR';

// action creators

actions.addError = ({
  message = 'Ein Fehler ist aufgetreten',
  proceedButtonText = null,
  proceedButtonCallback = null
} = {}) => ({
  type: types.ADD_ERROR,
  error: true,
  payload: { message, proceedButtonText, proceedButtonCallback }
});

actions.removeError = () => ({
  type: types.REMOVE_ERROR
});

// reducer

const initialState = {
  message: null,
  proceedButtonText: null,
  proceedButtonCallback: null
};

function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.ADD_ERROR:
      return {
        ...state,
        message: payload.message,
        proceedButtonText: payload.proceedButtonText,
        proceedButtonCallback: payload.proceedButtonCallback
      };
    case types.REMOVE_ERROR:
      return {
        ...initialState
      };
    default:
      return { ...state };
  }
}

export {
  actions,
  types
};

export default reducer;

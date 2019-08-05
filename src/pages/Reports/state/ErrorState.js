// action types

export const ADD_ERROR = 'Reports/ReportsDialogState/ADD_ERROR'; // generic error
export const REMOVE_ERROR = 'Reports/ReportsDialogState/REMOVE_ERROR';

// action creators

export const addError = ({
  message = 'Ein Fehler ist aufgetreten',
  proceedButtonText = null,
  proceedButtonCallback = null
} = {}) => ({
  type: ADD_ERROR,
  error: true,
  payload: { message, proceedButtonText, proceedButtonCallback }
});

export const removeError = () => ({
  type: REMOVE_ERROR
})

// reducer

const initialState = {
  message: null,
  proceedButtonText: null,
  proceedButtonCallback: null
}

export default function ReportsReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case ADD_ERROR:
      return {
        ...state,
        message: payload.message,
        proceedButtonText: payload.proceedButtonText,
        proceedButtonCallback: payload.proceedButtonCallback
      };
    case REMOVE_ERROR:
      return {
        ...initialState
      };
    default:
      return { ...state };
  }
}

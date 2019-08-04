import { combineReducers } from 'redux';

/**
 * Manages page-wide state (e.g. for errors that occur anywhere within the
 * Reports feature) and combines reducers for subpages (SubmitReoprt, OverviewMap).
 */

// TODO: add unit tests for reducer
// TODO: keep and submit address elements (street, number, ..) in seperate attributes
// TODO: heavily reduce boiler plate https://redux.js.org/recipes/reducing-boilerplate
// TODO: use immutability helpers like https://github.com/mweststrate/immer


// action constants

const ADD_ERROR = 'Reports/ReportsDialogState/ADD_ERROR'; // generic error
const REMOVE_ERROR = 'Reports/ReportsDialogState/REMOVE_ERROR';

// action creators

export function addError(error){
  type: ADD_ERROR,
  error
};

// reducer

const initialState = {
  error: { // TODO: use extra reducer that has this object as initialstate and uses its props as default values if none is provided, e.g. if the buttonText is not specified
    message: null,
    proceedButton: {
      buttonText: 'Weiter',
      callback: dispatch(removeError)
    }
  },
}

function ReportsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUBMIT_REPORT_ERROR:
      return {
        ...state,
        submitting: false,
        error: {
          message: action.error
        }
      };
      case ADD_ERROR:
        return {
          ...state,
          error: {
            message: action.error
          }
        };
      case REMOVE_ERROR:
        return {
          ...state,
          error: {
            message: null
          }
        };
    default:
      return { ...state };
  }
}

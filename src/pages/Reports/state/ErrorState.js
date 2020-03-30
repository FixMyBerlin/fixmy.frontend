import initialState from './initialState';

const actions = {};
const types = {};

// action types

types.ADD_ERROR = 'Reports/ReportsDialogState/ErrorState/ADD_ERROR';
types.REMOVE_ERROR = 'Reports/ReportsDialogState/ErrorState/REMOVE_ERROR';

// action creators

actions.addError = ({
  message = 'Ein Fehler ist aufgetreten',
  proceedMessage = null,
  proceedFunc = null
} = {}) => ({
  type: types.ADD_ERROR,
  error: true,
  payload: { message, proceedMessage, proceedFunc }
});

actions.removeError = () => ({
  type: types.REMOVE_ERROR
});

// reducer

function reducer(state = initialState.ErrorState, { type, payload } = {}) {
  switch (type) {
    case types.ADD_ERROR:
      return {
        ...state,
        message: payload.message,
        proceedMessage: payload.proceedMessage,
        proceedFunc: payload.proceedFunc
      };
    case types.REMOVE_ERROR:
      return {
        ...initialState.ErrorState
      };
    default:
      return initialState
  }
}

export { actions, types };

export default reducer;

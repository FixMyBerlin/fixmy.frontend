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

const initialState = {
  message: null,
  proceedMessage: null,
  proceedFunc: null
};

function reducer(state = initialState, { type, payload } = {}) {
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
        ...initialState
      };
    default:
      return { ...state };
  }
}

export { actions, types };

export default reducer;

import uuidv4 from 'uuid/v4';

const UPDATE_HBI = 'User/UserState/UPDATE_HBI';
const SIGNUP = 'User/UserState/SIGNUP';
const SIGNUP_SUCCESS = 'User/UserState/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'User/UserState/SIGNUP_FAIL';
const LOGIN = 'User/UserState/LOGIN';
const LOGIN_SUCCESS = 'User/UserState/LOGIN_SUCCESS';
const LOGIN_FAIL = 'User/UserState/LOGIN_FAIL';
const LOGOUT = 'User/UserState/LOGOUT';
const LOGOUT_SUCCESS = 'User/UserState/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'User/UserState/LOGOUT_FAIL';
const RESET_PASSWORD = 'User/UserState/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'User/UserState/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = 'User/UserState/RESET_PASSWORD_FAIL';

const initialState = {
  userid: uuidv4(),
  hbi_values: config.hbi.map(d => d.value),
  isLoggedIn: false
};

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export function signup(values, { setSubmitting, setErrors }) {
  return (dispatch) => {
    dispatch({ type: SIGNUP });

    console.log('user signup', values);

    // ... signup api call
    dispatch({ type: SIGNUP_SUCCESS, payload: { isLoggedIn: true } });
  };
}

export function login(values, { setSubmitting, setErrors }) {
  return (dispatch) => {
    dispatch({ type: LOGIN });

    console.log('user login', values);

    // ... login api call
    dispatch({ type: LOGIN_SUCCESS, payload: { isLoggedIn: true } });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });

    // ... logout api call
    dispatch({ type: LOGOUT_SUCCESS, payload: { isLoggedIn: false } });
  };
}

export function resetPassword(values, { setSubmitting, setErrors }) {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD });

    console.log('user password reset', values);

    // ... login api call
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: { isLoggedIn: true } });
  };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_HBI: {
      const hbiValues = state.hbi_values.map((d, i) => {
        if (i === action.payload.index) {
          return action.payload.value;
        }
        return d;
      });

      return Object.assign({}, state, { hbi_values: hbiValues });
    }
    case SIGNUP:
    case SIGNUP_SUCCESS:
    case SIGNUP_FAIL:
    case LOGIN:
    case LOGIN_SUCCESS:
    case LOGIN_FAIL:
    case LOGOUT:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
    case RESET_PASSWORD:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAIL:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

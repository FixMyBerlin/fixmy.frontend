import uuidv4 from 'uuid/v4';

import { set, remove, get } from '~/services/storage';
import { apiSignup, apiLogin, apiUpdate } from '~/pages/User/apiservice';
import history from '~/history';

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
const UPDATE = 'User/UserState/UPDATE';
const UPDATE_SUCCESS = 'User/UserState/UPDATE_SUCCESS';
const UPDATE_FAIL = 'User/UserState/UPDATE_FAIL';

console.log(get('token'))

const initialState = {
  userid: uuidv4(),
  hbi_values: config.hbi.map(d => d.value),
  token: get('token')
};

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export function signup(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });

    const data = await apiSignup(values, formFunctions);

    if (data.error) {
      return dispatch({ type: SIGNUP_FAIL });
    }

    history.push('/anmelden');

    dispatch({ type: SIGNUP_SUCCESS });
  };
}

export function login(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    const data = await apiLogin(values, formFunctions);

    if (data.error) {
      return dispatch({ type: LOGIN_FAIL });
    }

    set('token', data.token);
    history.push('/');

    dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token } });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });

    remove('token');
    history.push('/');

    // ... logout api call
    dispatch({ type: LOGOUT_SUCCESS, payload: { token: false } });
  };
}

export function update(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: UPDATE });

    const data = await apiUpdate(values, formFunctions);

    if (data.error) {
      return dispatch({ type: UPDATE_FAIL });
    }

    dispatch({ type: UPDATE_SUCCESS });
  }
}

export function resetPassword(values, formFunctions) {
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

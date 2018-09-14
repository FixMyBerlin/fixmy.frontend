import uuidv4 from 'uuid/v4';

import { set, remove, get } from '~/services/storage';
import { apiSignup, apiLogin, apiUpdate, apiUser, apiVerify, apiPasswordReset } from '~/pages/User/apiservice';
import history from '~/history';

const UPDATE_HBI = 'User/UserState/UPDATE_HBI';
const SIGNUP = 'User/UserState/SIGNUP';
const SIGNUP_SUCCESS = 'User/UserState/SIGNUP_SUCCESS';
const LOGIN = 'User/UserState/LOGIN';
const LOGIN_SUCCESS = 'User/UserState/LOGIN_SUCCESS';
const LOGOUT = 'User/UserState/LOGOUT';
const LOGOUT_SUCCESS = 'User/UserState/LOGOUT_SUCCESS';
const RESET_PASSWORD = 'User/UserState/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'User/UserState/RESET_PASSWORD_SUCCESS';
const UPDATE = 'User/UserState/UPDATE';
const UPDATE_SUCCESS = 'User/UserState/UPDATE_SUCCESS';
const VERIFY = 'User/UserState/VERIFY';
const VERIFY_SUCCESS = 'User/UserState/VERIFY_SUCCESS';
const PROFILE = 'User/UserState/PROFILE';
const PROFILE_SUCCESS = 'User/UserState/PROFILE_SUCCESS';

const initialState = {
  userid: uuidv4(),
  hbi_values: config.hbi.map(d => d.value),
  token: get('token'),
  userData: false
};

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export function signup(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });

    const data = await apiSignup(values, formFunctions);

    if (!data.error) {
      history.push('/anmelden');
      dispatch({ type: SIGNUP_SUCCESS });
    }
  };
}

export function login(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    const data = await apiLogin(values, formFunctions);

    if (!data.error) {
      set('token', data.token);
      history.push('/');

      dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token } });
    }
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });

    remove('token');
    history.push('/');

    // ... logout api call?
    dispatch({ type: LOGOUT_SUCCESS, payload: { token: false } });
  };
}

export function profile() {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE });

    const { token } = getState().UserState;
    const userData = await apiUser(token);

    if (!userData.error) {
      dispatch({ type: PROFILE_SUCCESS, payload: { userData } });
    }
  };
}

export function update(values, formFunctions) {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE });

    const { token } = getState().UserState;
    const userData = await apiUpdate(values, token, formFunctions);

    console.log(userData);

    if (!userData.error) {
      dispatch(profile());
    }
  };
}

// when token is not valid anymore we reset the token
export function verify() {
  return async (dispatch, getState) => {
    dispatch({ type: VERIFY });

    const { token } = getState().UserState;
    if (!token) {
      return false;
    }

    const data = await apiVerify(token);

    if (data.error) {
      remove('token');
      dispatch({ type: VERIFY_SUCCESS, payload: { token: false } });
    }
  };
}

export function resetPassword(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: RESET_PASSWORD });

    const data = await apiPasswordReset(values, formFunctions);

    if (!data.error) {
      history.push('/');
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    }
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
    case LOGIN:
    case LOGIN_SUCCESS:
    case LOGOUT:
    case LOGOUT_SUCCESS:
    case RESET_PASSWORD:
    case RESET_PASSWORD_SUCCESS:
    case VERIFY:
    case VERIFY_SUCCESS:
    case PROFILE:
    case PROFILE_SUCCESS:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

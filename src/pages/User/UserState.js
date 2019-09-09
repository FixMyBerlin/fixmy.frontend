import uuidv4 from 'uuid/v4';

import { set, remove, get } from '~/services/storage';
import { apiSignup, apiLogin, apiUpdate, apiUser, apiVerify, apiPasswordReset, apiPasswordForgot, apiLikes } from '~/pages/User/apiservice';
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
const FORGOT_PASSWORD = 'User/UserState/FORGOT_PASSWORD';
const FORGOT_PASSWORD_SUCCESS = 'User/UserState/FORGOT_PASSWORD_SUCCESS';
const UPDATE = 'User/UserState/UPDATE';
const VERIFY = 'User/UserState/VERIFY';
const VERIFY_SUCCESS = 'User/UserState/VERIFY_SUCCESS';
const PROFILE = 'User/UserState/PROFILE';
const PROFILE_SUCCESS = 'User/UserState/PROFILE_SUCCESS';
const UPDATE_USERNAME_SUCCESS = 'User/UserState/UPDATE_USERNAME_SUCCESS';
const UPDATE_PASSWORD_SUCCESS = 'User/UserState/UPDATE_PASSWORD_SUCCESS';
const LOAD_LIKES = 'User/UserState/LOAD_LIKES';
const LOAD_LIKES_SUCCESS = 'User/UserState/LOAD_LIKES_SUCCESS';
const LOAD_LIKES_FAIL = 'User/UserState/LOAD_LIKES_FAIL';

const initialState = {
  userid: uuidv4(),
  hbi_values: config.hbi.map(d => d.value),
  token: get('token'),
  userData: false,
  userLikes: false
};

// updates custome hbi config values
export function updateHBI(index, value) {
  return { type: UPDATE_HBI, payload: { index, value } };
}

export function signup(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });

    const data = await apiSignup(values, formFunctions);

    // we automatically login the user after signup
    if (!data.error) {
      formFunctions.setStatus('signupsuccess');

      const loginData = await apiLogin(values, formFunctions);
      if (!loginData.error) {
        set('token', loginData.token);
        setTimeout(() => history.push(config.routes.plannings), 3000);
        dispatch({ type: SIGNUP_SUCCESS, payload: { token: loginData.token } });
      }
    }
  };
}

export function login(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });

    const data = await apiLogin(values, formFunctions);

    if (!data.error) {
      set('token', data.token);
      formFunctions.setStatus('loginsuccess');
      dispatch({ type: LOGIN_SUCCESS, payload: { token: data.token } });
    }
  };
}

export function logout(setLogoutStatus) {
  return (dispatch) => {
    dispatch({ type: LOGOUT });

    remove('token');
    setLogoutStatus(true);

    // ... logout api call?
    setTimeout(() => {
      history.push('/');
      dispatch({ type: LOGOUT_SUCCESS, payload: { token: false } });
    }, 3000);
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

    const { token, userData } = getState().UserState;
    const response = await apiUpdate(values, token, formFunctions);

    if (!response.error) {
      if (values.new_username) {
        remove('token');
        formFunctions.setStatus('usernamesuccess');
        dispatch({ type: UPDATE_USERNAME_SUCCESS, payload: { userData: { ...userData, username: values.new_username } } });
      } else if (values.new_password) {
        formFunctions.setStatus('passwordsuccess');
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: { userData: { ...userData, password: '' } } });
      }
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
      formFunctions.setStatus('resetsuccess');
    } else {
      formFunctions.setStatus('reseterror');
    }
  };
}

export function forgotPassword(values, formFunctions) {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD });

    const data = await apiPasswordForgot(values, formFunctions);

    if (!data.error) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      formFunctions.setStatus('forgotsuccess');
    } else {
      formFunctions.setStatus('forgoterror');
    }
  };
}

export function loadLikes(itemType) {
  return async (dispatch, getState) => {
    dispatch({ type: LOAD_LIKES, payload: { isLoading: true, userLikes: [] } });

    const { token } = getState().UserState;
    const items = await apiLikes(token, itemType);

    if (!items.error) {
      // @TODO: why is the API different for reports and plannings?
      const result = itemType === 'plannings' ? items.results : items;
      const userLikes = result.filter(d => d.liked_by_user);

      dispatch({ type: LOAD_LIKES_SUCCESS, payload: { isLoading: false, userLikes } });
    } else {
      dispatch({ type: LOAD_LIKES_FAIL, payload: { isLoading: false } });
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
    case FORGOT_PASSWORD:
    case FORGOT_PASSWORD_SUCCESS:
    case VERIFY:
    case VERIFY_SUCCESS:
    case PROFILE:
    case PROFILE_SUCCESS:
    case UPDATE_USERNAME_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case LOAD_LIKES:
    case LOAD_LIKES_SUCCESS:
    case LOAD_LIKES_FAIL:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

import ky from 'ky';

// helper function that handles form errors and loading state
async function handleRequest(route, { method = 'POST', json = {}, token = false }, { setSubmitting, setErrors }, respType = 'json') {
  let response = {};
  setSubmitting(true);

  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    if (respType) {
      response = await ky(`${config.apiUrl}/${route}`, { method, json, headers })[respType]();
    } else {
      await ky(`${config.apiUrl}/${route}`, { method, json, headers });
    }
  } catch (e) {
    const error = await e.response.json();
    setErrors(error);
    response.error = error;
  }

  setSubmitting(false);
  return response;
}

export async function apiSignup(json, formFunctions) {
  return handleRequest('users/', { json }, formFunctions);
}

export async function apiLogin(json, formFunctions) {
  return handleRequest('jwt/create/', { json }, formFunctions);
}

export async function apiUpdate(json, token, formFunctions) {
  if (json.new_username) {
    return handleRequest('users/change_username/', { json, token }, formFunctions, 'text');
  }

  if (json.new_password) {
    return handleRequest('password/', { json, token }, formFunctions, 'text');
  }

  // here we can handle standard field updates like name, last name etc.
}

export async function apiVerify(token) {
  let response = {};

  try {
    response = await ky.post(`${config.apiUrl}/jwt/verify/`, { json: { token } }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export async function apiUser(token) {
  let response = {};

  try {
    const headers = { Authorization: `JWT ${token}` };
    response = await ky.get(`${config.apiUrl}/users/me/`, { headers }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export async function apiPasswordReset(json, formFunctions) {
  return handleRequest('password/reset/confirm', { method: 'POST', json }, formFunctions, false);
}

export async function apiPasswordForgot(json, formFunctions) {
  return handleRequest('password/reset', { method: 'POST', json }, formFunctions, false);
}

export async function apiLikes(token) {
  const headers = token ? { Authorization: `JWT ${token}` } : {};
  let response = {};

  try {
    response = await ky(`${config.apiUrl}/plannings?page_size=200`, { method: 'GET', headers, timeout: 20000 }).json();
  } catch (e) {
    const error = await e.response.json();
    response.error = error;
  }

  return response;
}

export default {
  apiSignup,
  apiLogin,
  apiUpdate,
  apiUser,
  apiVerify,
  apiPasswordReset,
  apiLikes
};

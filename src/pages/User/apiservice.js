import ky from 'ky';

// helper function that handles form errors and loading state
async function handleRequest(route, { method = 'POST', json = {} }, { setSubmitting, setErrors }) {
  let response = {};
  setSubmitting(true);

  try {
    response = await ky(`${config.apiUrl}/${route}`, { method, json }).json();
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

export async function apiUpdate(json, formFunctions) {
  return handleRequest('users/create/', { method: 'PUT', json }, formFunctions);
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

export default {
  apiSignup,
  apiLogin,
  apiUpdate,
  apiUser
};

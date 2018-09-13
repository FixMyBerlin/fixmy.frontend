import ky from 'ky';

// helper function that handles form errors and loading state
async function handleRequest(route, { method, json }, { setSubmitting, setErrors }) {
  let response = {};
  setSubmitting(true);

  try {
    response = await ky(route, { method, json }).json();
  } catch (e) {
    console.log(e, route, { method, json })
    const error = await e.response.json();
    setErrors(error);
    response.error = error;
  }

  setSubmitting(false);
  return response;
}

export async function apiSignup(json, formFunctions) {
  return handleRequest(
    `${config.apiUrl}/users/`,
    { method: 'POST', json },
    formFunctions
  );
}

export async function apiLogin(json, formFunctions) {
  return handleRequest(
    `${config.apiUrl}/jwt/create/`,
    { method: 'POST', json },
    formFunctions
  );
}

export async function apiUpdate(json, formFunctions) {
  return handleRequest(
    `${config.apiUrl}/users/create/`,
    { method: 'PUT', json },
    formFunctions
  );
}

export default {
  apiSignup,
  apiLogin
};

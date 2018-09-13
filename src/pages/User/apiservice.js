import ky from 'ky';

export async function apiSignup(values, { setSubmitting, setErrors }) {
  let response = null;
  setSubmitting(true);

  try {
    response = await ky.post(`${config.apiUrl}/users/`, { json: values }).json();
  } catch (e) {
    response = await e.response.json();
    setErrors(response);
  }

  setSubmitting(false);
  return response;
}

export async function apiLogin(values, { setSubmitting, setErrors }) {
  let response = null;
  setSubmitting(true);

  try {
    response = await ky.post(`${config.apiUrl}/jwt/create/`, { json: values }).json();
  } catch (e) {
    response = await e.response.json();
    setErrors(response);
  }

  setSubmitting(false);
  return response;
}

export async function apiUpdate(values, { setSubmitting, setErrors }) {
  let response = null;
  setSubmitting(true);

  try {
    response = await ky.put(`${config.apiUrl}/users/create/`, { json: values }).json();
  } catch (e) {
    response = await e.response.json();
    setErrors(response);
  }

  setSubmitting(false);
  return response;
}

export default {
  apiSignup,
  apiLogin
};

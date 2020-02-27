import ky from 'ky';
import { isFunction } from '~/utils/utils';

/**
 *
 * @param {String} route An absolute path.
 * @param {String} [method=get] The http method to be used.
 * One of get, post, put, patch, head and delete.
 * @param {Object} [json] An optional JSON payload
 * @param {String} [token] An optional JWT token to authenticate the user.
 * @param {hooks} Callbacks functions.
 * @param {Function} [hooks.setSubmitting] If passed, this function will be called
 * with true before the request and with false after the request.
 * @param {Function} [hooks.setErrors} If passed, after a request has failed
 * this function will be called with a meaningful error provided by our API
 * @param [respType=json] The response type
 * @returns {Promise<void>}
 * @throws Will throw with either a qualified error provided under e.response.json
 */
async function request(
  route,
  method = 'get',
  json,
  token,
  { setSubmitting, setErrors },
  respType = 'json'
) {
  const [useSetSubmitting, useSetErrors] = [setSubmitting, setErrors].map(
    isFunction
  );

  let response;
  if (useSetSubmitting) {
    setSubmitting(true);
  }

  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    response = await ky(route, { method, json, headers });
    if (respType) {
      response = await response[respType]();
    }
  } catch (e) {
    if (e.response.json == null) throw e;
    const error = await e.response.json();
    if (useSetErrors) {
      setErrors(error);
    }
    throw error;
  }

  if (useSetSubmitting) {
    setSubmitting(false);
  }
  return response;
}

export async function get(route, method, ...args) {
  return request(route, 'get', ...args);
}

export async function post(route, method, ...args) {
  return request(route, 'post', ...args);
}

export async function patch(route, method, ...args) {
  return request(route, 'patch', ...args);
}

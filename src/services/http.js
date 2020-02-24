import ky from 'ky';
import config from '~/config';
import { isFunction } from '~/utils/utils';

/**
 *
 * @param {String} route A relative path within our REST-API.
 * @param {String} [method=get] The http method to be used.
 * One of get, post, put, patch, head and delete.
 * @param {Object} [json] An optional JSON payload
 * @param {String} [token] An optional JWT token to authenticate the user.
 * @param {Function} [setSubmitting] If passed, this function will be called
 * with true before the request and with false after the request.
 * @param {Function} [setErrors} If passed, after a request has failed
 * this function will be called with a meaningful error provided by our API
 * @param [respType=json] The response type
 * @returns {Promise<void>}
 */
async function request(
  route,
  { method = 'POST', json = {}, token = false },
  { setSubmitting, setErrors },
  respType = 'json'
) {
  const [useSetSubmitting, useSetErrors] = [setSubmitting, setErrors].map(isFunction);

  let response = {};
  if (useSetSubmitting) {
    setSubmitting(true);
  }

  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    if (respType) {
      response = await ky(`${config.apiUrl}/${route}`, {
        method,
        json,
        headers
      })[respType]();
    } else {
      await ky(`${config.apiUrl}/${route}`, { method, json, headers });
    }
  } catch (e) {
    if (e.response.json == null) throw e;
    const error = await e.response.json();
    if (useSetErrors) {
      setErrors(error);
    }
    response.error = error;
  }

  if (useSetSubmitting) {
    setSubmitting(false);
  }
  return response;
}

export async function get(route, payloadOptions, ...args) {
  const mergedOptions = { ...payloadOptions, method: 'get' };
  return request(route, mergedOptions, ...args);
}

export async function post(...args) {
  return request(...args);
}

export async function patch(route, payloadOptions, ...args) {
  const mergedOptions = { ...payloadOptions, method: 'patch' };
  return request(mergedOptions)
}

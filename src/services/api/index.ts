/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - offering to provide functions to hooking before/after the request or on error
 * - enriching request data
 */
import httpRequest from './httpRequest';
import store from '~/store';
import config from '~/config';
import { ExtendedRequestConfig, JSONValue } from './types';

// TODO: write tests

const compileAbsoluteRoute = (relativeRoute) => {
  const url = new window.URL(relativeRoute, config.apiUrl);
  return url.href;
};
const getToken = () => store.getState().UserState.token;

async function requestPlatform(params: ExtendedRequestConfig) {
  const absoluteRoute = compileAbsoluteRoute(params.route);
  const token = getToken();
  const setSubmitting = params.setSubmitting || (() => {});
  const setErrors = params.setErrors || (() => {});

  setSubmitting(true);
  try {
    const response = httpRequest({
      ...params,
      route: absoluteRoute,
      token
    });
    setSubmitting(false);
    return response;
  } catch (e) {
    setErrors(e);
    setSubmitting(false);
    throw e;
  }
}

export function get(route: string) {
  return requestPlatform({ method: 'get', route });
}

export function post(route: string, payload: JSONValue) {
  return requestPlatform({ method: 'post', route, json: payload });
}

export function patch(route: string, payload: JSONValue) {
  return requestPlatform({ method: 'patch', route, json: payload });
}

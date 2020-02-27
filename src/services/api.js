import httpRequest from './httpRequest';
import store from '~/store';
import { apiUrl } from '~/config';
import { isFunction } from '~/utils/utils';

const compileAbsoluteRoute = (relativeRoute) => new window.Url(relativeRoute, apiUrl);
const getToken = () => store.getState().UserState.token;

// TODO: use TypeScript interface that extends the interface used to describe the arguments to http.request()
// TODO: write tests

async function requestPlatform(
  route,
  method = 'get',
  json,
  { setSubmitting, setErrors },
  respType = 'json'
){
  const absoluteRoute = compileAbsoluteRoute(route);
  const token = getToken();
  const [useSetSubmitting, useSetErrors] = [setSubmitting, setErrors].map(
    isFunction
  );
  const toggleSetSubmitting = (status) => useSetSubmitting ?
    setSubmitting(status) : () => {};

  toggleSetSubmitting(true);
  try {
    const response = httpRequest(absoluteRoute, method, json, token, respType);
    toggleSetSubmitting(false);
    return response;
  } catch (e) {
    if (useSetErrors) {
      setErrors(e);
    }
    toggleSetSubmitting(false);
    throw e;
  }
}

export function get(route, ...args) {
  return httpRequest(route, 'get', ...args)
}

export function post(route, ...args) {
  return httpRequest(route, 'post', ...args)
}

export function patch(route, ...args) {
  return httpRequest(route, 'patch', ...args)
}

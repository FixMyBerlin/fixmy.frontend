/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurss
 * - centralized error handling
 */
import ky from 'ky';
import store from '~/store';
import config from '~/config';
import { JSONValue, RequestConfig } from './types';
import {
  ApiError,
  NetworkError,
  QualifiedError,
  TimeoutError
} from './httpErrors';

const api = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
      (req) => {
        const stateRoot = store.getState();
        const { token } = stateRoot.UserState;
        if (token) {
          req.headers.set('Authorization', `JWT ${token}`);
        }
      }
    ]
  }
});

async function request(
  route: string,
  requestConfig: RequestConfig
): Promise<Response> {
  let response;

  const defaultOptions = {
    setSubmitting: (...args) => {},
    setErrors: (...args) => {},
    method: 'get',
    timeout: 30 * 1000
  };
  const options = { ...requestConfig, ...defaultOptions };
  const { setSubmitting, setErrors, method } = options; // TODO: make sure setSubmitting and setErrors do not get passed to ky. factor out Preparation of options

  setSubmitting(true);
  try {
    const responseBody = await api(route, options);
    response = await responseBody.json(); // TODO: do we have to mind other [body methods](https://developer.mozilla.org/en-US/docs/Web/API/Body#Methods) like form data?
    setSubmitting(false);
  } catch (e) {
    setErrors(e);
    setSubmitting(false);
    handleError(e);
  }
  return response;
}

function handleError(e) {
  switch (e.constructor) {
    case ky.HTTPError:
      // a non 2xx error code was found
      if (e.response.json) {
        // API answered with a JSON elaborating the error
        throw new QualifiedError(e);
      } else {
        throw new ApiError(e);
      }
    case ky.TimeoutError:
      throw new TimeoutError(e);
    default:
      throw new NetworkError(e);
  }
}

export function get(route: string, options?: RequestConfig): Promise<Response> {
  return request(route, { ...options, method: 'get' });
}

export function post(
  route: string,
  payload: JSONValue,
  options?: RequestConfig
): Promise<Response> {
  return request(route, { ...options, method: 'post', json: payload });
}

export function patch(
  route: string,
  payload: JSONValue,
  options?: RequestConfig
): Promise<Response> {
  return request(route, { ...options, method: 'patch', json: payload });
}

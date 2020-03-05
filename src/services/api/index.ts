/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurss
 * - centralized error handling
 */
import ky, { Options as KyOptions } from 'ky';
import store from '~/store';
import config from '~/config';
import { Callbacks, JSONValue } from './types';
import {
  ApiError,
  NetworkError,
  QualifiedError,
  TimeoutError
} from './httpErrors';

const configuredKy = ky.create({
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
  requestConfig: KyOptions,
  callbacks?: Callbacks
): Promise<Response> {
  let response;

  const defaultRequestOptions = {
    method: 'get',
    timeout: 30 * 1000
  };
  const options = { ...defaultRequestOptions, ...requestConfig };

  // prepare callback functions: if not defined, assign empty functions to facilitate invocation
  let setSubmitting = (...args) => {};
  let setErrors = (...args) => {};
  if (callbacks) {
    ({ setSubmitting, setErrors } = callbacks);
  }

  setSubmitting(true);
  try {
    const responseBody = await configuredKy(route, options);
    // TODO: clarify if we have to mind other [body methods](https://developer.mozilla.org/en-US/docs/Web/API/Body#Methods) like form data?
    response = await responseBody.json();
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
    // case ky.TimeoutError:

    default:
      throw new NetworkError(e);
  }
}

export function get(route: string, options?: KyOptions): Promise<Response> {
  return request(route, { ...options, method: 'get' });
}

export function post(
  route: string,
  payload: JSONValue,
  options?: KyOptions
): Promise<Response> {
  return request(route, { ...options, method: 'post', json: payload });
}

export function patch(
  route: string,
  payload: JSONValue,
  options?: KyOptions
): Promise<Response> {
  return request(route, { ...options, method: 'patch', json: payload });
}

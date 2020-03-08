/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurss
 * - centralized error handling
 */
import ky, { Options as KyOptions } from 'ky';
import config from '~/config';
import store from '~/store';
import { BodyType, Callbacks, JSONValue } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { ApiError, NetworkError, QualifiedError, TimeoutError } from './httpErrors';

const configuredKy = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
      // load token directly from localStorage instead from store
      (req: Request) => {
        const stateRoot = store.getState();
        const token = UserStateSelectors.getToken(stateRoot);
        if (token) {
          req.headers.set('Authorization', `JWT ${token}`);
        }
      }
    ]
  }
});

export async function request(
  route: string,
  requestConfig?: KyOptions,
  callbacks?: Callbacks,
  bodyType?: BodyType // defaults to json
): Promise<Response> {
  let response;

  // prepare request options
  const defaultRequestOptions = {
    method: 'get',
    timeout: 30 * 1000
  };
  const options = { ...defaultRequestOptions, ...(requestConfig || {}) };

  // prepare callback functions: if not defined, assign empty functions to facilitate invocation
  let setSubmitting = (...args) => {
  };
  let setErrors = (...args) => {
  };
  if (callbacks) {
    ({ setSubmitting, setErrors } = callbacks);
  }

  const bodyParseMethod = bodyType || 'json';

  setSubmitting(true);
  try {
    const responseBody = await configuredKy(route, options);
    response = await responseBody[bodyParseMethod]();
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
    // The whole Idea here is to translate errors reported by ky to a set of custom exceptions
    // (https://dev.to/damxipo/custom-exceptions-with-js-3aoc) that we can use to make decisions
    // on how to handle specific errors

    case ky.HTTPError:
      // a non 2xx error code was found
      if (e.response.json) {
        // API answered with a JSON elaborating the error
        const errorResponse = e.response.json();
        throw new QualifiedError(errorResponse);
      } else {
        throw new ApiError(e);
      }
    case ky.TimeoutError:
      throw new TimeoutError(e.message);
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

/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky, { Options as KyOptions, ResponsePromise } from 'ky';
import config from '~/config';
import store from '~/store';
import { BodyType, Callbacks, JSONValue } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { ApiError, NetworkError, QualifiedError, TimeoutError } from './httpErrors';

const configuredKy = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
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

// generic request handler

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
  const { options, setSubmitting, setErrors, bodyParseMethod } = prepareOptions(
    defaultRequestOptions,
    requestConfig,
    callbacks,
    bodyType
  );

  setSubmitting(true);
  try {
    const responseBody = await (configuredKy(
      route,
      options
    ) as ResponsePromise);
    response = await responseBody[bodyParseMethod]();
  } catch (e) {
    setErrors(e);
    throw await translateError(e);
  }
  setSubmitting(false);
  return response;
}

// shorthand methods

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

// factored out helpers

function prepareOptions(
  defaultRequestOptions: Object,
  requestConfig: KyOptions,
  callbacks: Callbacks,
  bodyType: BodyType
) {
  const options = { ...defaultRequestOptions, ...(requestConfig || {}) };

  // prepare callback functions: if not defined, in order to not bloat consuming function with conditionals
  let setSubmitting = (...args) => {};
  let setErrors = (...args) => {};
  if (callbacks) {
    ({ setSubmitting, setErrors } = callbacks);
  }

  const bodyParseMethod = bodyType || 'json';
  return { options, setSubmitting, setErrors, bodyParseMethod };
}

/**
 * The whole Idea here is to translate errors reported by ky/fetch to a set of custom exceptions
 * which we can use to make decisions on how to handle specific errors.
 *
 * We could handle this here by interacting with the store or
 * delegate error handling in terms of store updates to the api service modules of our individual pages (reports, user, ..)
 * Resources:
 * https://github.com/sindresorhus/ky/issues/107
 * https://dev.to/damxipo/custom-exceptions-with-js-3aoc
 * // TODO: move explanations from code docs to PR
 */
async function translateError(e): Promise<Error> {
  let customError;
  switch (e.constructor) {
    case ky.HTTPError: // a non 2xx error code was found
      if (e.response.json != null) {
        // the API responded a JSON
        const parsedErrorResponse = await e.response.json();
        customError = new QualifiedError(parsedErrorResponse);
      } else {
        customError = new ApiError(e); // re-throw as generic error
      }
      break;
    case ky.TimeoutError:
      customError = new TimeoutError(e.message);
      break;
    default:
      customError = new NetworkError(e);
  }
  return customError;
}

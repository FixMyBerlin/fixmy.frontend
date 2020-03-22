/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky, { Options as KyOptions } from 'ky';
import { FetchError } from 'node-fetch';
import config from '~/config';
import store from '~/store';
import { JSONValue, RequestOptions } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { ApiError, NetworkError, TimeoutError } from './httpErrors';
import { emptyFunc } from '~/services/api/utils';

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

const defaultRequestOptions: RequestOptions = {
  kyOptions: {},
  callbacks: {
    setSubmitting: emptyFunc
  },
  responseBodyType: 'json'
};

/**
 * Generic Request Handler
 */
export async function request(
  route: string,
  {
    callbacks = {},
    kyOptions = {},
    responseBodyType = 'json'
  }: RequestOptions = defaultRequestOptions
): Promise<Response> {
  let response;

  const mergedKyOptions = prepareKyOptions(kyOptions);
  const { setErrors, setSubmitting = emptyFunc } = callbacks;

  setSubmitting(true);
  try {
    response = await configuredKy(route, mergedKyOptions)[
      responseBodyType // this usage sets the appropriate accept header
    ]();
  } catch (e) {
    const translatedError = await mapError(e);

    // invoke error hook with json answer
    if (setErrors) {
      const isErrorJson =
        translatedError instanceof ApiError && e.response.json;
      if (isErrorJson) {
        const errorJson = await e.response.json();
        setErrors(errorJson);
      }
    }

    throw translatedError;
  }
  setSubmitting(false);
  return response;
}

function prepareKyOptions(requestConfig: KyOptions = {}) {
  const defaultKyOptions = {
    method: 'get',
    timeout: 30 * 1000
  };
  return {
    ...defaultKyOptions,
    ...requestConfig
  };
}

// shorthand methods

export function get(
  route: string,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = { ...kyOptions, method: 'get' };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}

export function post(
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = {
    ...kyOptions,
    method: 'post',
    json: payload
  };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}

export function patch(
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> {
  const kyOptions = requestOptions.kyOptions || {};
  const mergedKyOptions: KyOptions = {
    ...kyOptions,
    method: 'patch',
    json: payload
  };
  return request(route, { ...requestOptions, kyOptions: mergedKyOptions });
}

/**
 * Translate errors reported by ky/fetch to a set of custom exceptions
 * which we can use to make decisions on how to handle specific errors.
 *
 * We could handle this here by interacting with the store or
 * delegate error handling in terms of store updates to the api service modules of our individual pages (reports, user, ..)
 * Resources:
 * https://github.com/sindresorhus/ky/issues/107
 * https://dev.to/damxipo/custom-exceptions-with-js-3aoc
 * // TODO: get api documentation
 * // TODO: clarify what kind of errors we want to differentiate in the client. Do we want to handle 401s, 404s etc. specifically?
 * // TODO: move explanations from code docs to PR
 */
async function mapError(e): Promise<Error> {
  let customError;
  switch (e.constructor) {
    case ky.HTTPError: // a non 2xx error code was found
      if (e.response.json != null) {
        // the API responded with a JSON
        const errorJson = await e.response.json();
        // assume that the error message is found under the key detail
        customError = new ApiError(
          errorJson.detail
        );
      } else {
        const textError = await e.response.text();
        customError = new ApiError(textError); // TODO: pass status code to error object
      }
      break;
    case ky.TimeoutError:
      customError = new TimeoutError(e.message);
      break;
    case FetchError:
      customError = new NetworkError(e);
      break;
    default:
      customError = new Error(e);
  }
  return customError;
}

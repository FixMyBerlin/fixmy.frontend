/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky, { Options as KyOptions } from 'ky';
import config from '~/config';
import store from '~/store';
import { JSONValue, RequestOptions, ResponseBodyType } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { ApiError, NetworkError, TimeoutError } from './httpErrors';
import { emptyFunc } from '~/services/api/utils';

// setup ky

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

// Generic Request Handler

const defaultRequestOptions: RequestOptions = {
  kyOptions: {},
  callbacks: {
    setSubmitting: emptyFunc
  },
  responseBodyType: 'json'
};

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
    await handleError(e, responseBodyType, setErrors);
  } finally {
    setSubmitting(false);
  }
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

/*
    _____  _                   _    _                        _
  /  ___|| |                 | |  | |                      | |
  \ `--. | |__    ___   _ __ | |_ | |__    __ _  _ __    __| | ___
   `--. \| '_ \  / _ \ | '__|| __|| '_ \  / _` || '_ \  / _` |/ __|
  /\__/ /| | | || (_) || |   | |_ | | | || (_| || | | || (_| |\__ \
  \____/ |_| |_| \___/ |_|    \__||_| |_| \__,_||_| |_| \__,_||___/
 */

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

/*
    _____                            _   _                    _  _  _
  |  ___|                          | | | |                  | || |(_)
  | |__   _ __  _ __   ___   _ __  | |_| |  __ _  _ __    __| || | _  _ __    __ _
  |  __| | '__|| '__| / _ \ | '__| |  _  | / _` || '_ \  / _` || || || '_ \  / _` |
  | |___ | |   | |   | (_) || |    | | | || (_| || | | || (_| || || || | | || (_| |
  \____/ |_|   |_|    \___/ |_|    \_| |_/ \__,_||_| |_| \__,_||_||_||_| |_| \__, |
                                                                              __/ |
                                                                             |___/
 */

async function handleError(e, responseBodyType, setErrors) {
  const translatedError = await mapError(e, responseBodyType);

  // invoke error hook with json answer (if any)
  if (setErrors) {
    const isErrorJson =
      translatedError instanceof ApiError && responseBodyType === 'json';
    if (isErrorJson) {
      const errorJson = await e.response.json();
      setErrors(errorJson);
    }
  }

  throw translatedError;
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
async function mapError(e, responseBodyType: ResponseBodyType): Promise<Error> {
  let customError;
  let errorMessage;
  let statusCode;
  switch (e.constructor) {
    case ky.HTTPError: // a non 2xx error code was found
      errorMessage = await parseErrorResponse(e.response, responseBodyType);
      statusCode = e.response.status;
      customError = new ApiError(errorMessage, statusCode);
      break;
    case ky.TimeoutError:
      customError = new TimeoutError(e.message);
      break;
    case TypeError:
      customError = e; // throw as is
      break;
    default:
      customError = new NetworkError(e);
      break;
  }
  return customError;
}

async function parseErrorResponse(
  errorResponse: Response,
  responseBodyType: ResponseBodyType
): Promise<string> {
  // early exit: throw if we cannot handle // TODO: write unit test for this
  const isHandledErrorBodyType = ['json', 'text'].includes(responseBodyType);
  if (!isHandledErrorBodyType) {
    throw new TypeError(
      'Handling of errors stated in other body types other than json or text is not implemented'
    );
  }

  const errorBody = await errorResponse[responseBodyType]();

  return responseBodyType === 'json'
    ? errorBody.detail // assume that body is structured following a convention made in the backend
    : errorBody;
}

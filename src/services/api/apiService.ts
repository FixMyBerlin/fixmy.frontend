/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky, { Options as KyOptions } from 'ky';
import config from '~/config';
import store from '~/store';
import { JSONValue, RequestOptions } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { ApiError, NetworkError, TimeoutError } from './httpErrors';

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
    setSubmitting: () => {}},
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
  const { setErrors, setSubmitting = () => {}} = callbacks;

  setSubmitting(true);
  try {
    response = await configuredKy(route, mergedKyOptions)[
      responseBodyType // this usage sets the appropriate accept header
    ]();
  } catch (e) {
    await handleError(e, setErrors);
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

async function handleError(e, setErrors) {
  const { translatedError, errorMessage } = await mapError(e);

  // invoke error hook with json answer (if any)
  if (setErrors && errorMessage) {
    setErrors(errorMessage);
  }

  throw translatedError;
}

/**
 * Translate errors reported by ky/fetch to a set of custom exceptions
 * which we can later on use to make decisions on how to handle specific errors.
 */
async function mapError(
  e
): Promise<{
  errorMessage: string;
  translatedError: any; // TODO: type Error
}> {
  let translatedError;
  let errorMessage;
  let statusCode;
  switch (e.constructor) {
    case ky.HTTPError: // a non 2xx error code was found
      errorMessage = await parseErrorResponse(e.response);
      statusCode = e.response.status;
      translatedError = new ApiError(errorMessage, statusCode);
      break;
    case ky.TimeoutError:
      translatedError = new TimeoutError(e.message);
      break;
    case TypeError:
      translatedError = e; // throw as is
      break;
    default:
      translatedError = new NetworkError(e); // pain point: every unexpected Error instance (that is not a TypeError) will be handled as NetworkError
      break;
  }
  return { translatedError, errorMessage }; // return body content to not parse body multiple times, see https://github.com/node-fetch/node-fetch/issues/533
}

async function parseErrorResponse(errorResponse: Response): Promise<string> {
  let errorJson;
  let errorText;

  // try parse error as text and then as JSON to not rely on content-type definitions response headers
  try {
    errorText = await errorResponse.text();
  } catch (e) {
    throw new TypeError(
      'Handling of error responses stated in other body types other than json or text is not implemented'
    );
  }

  try {
    errorJson = JSON.parse(errorText);
  } catch (e) {
    // don't panic, its just text content
  }

  return errorJson
    ? errorJson.detail // assume that body is structured following a convention made in the backend
    : errorText;
}

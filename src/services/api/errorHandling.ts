import ky from 'ky-universal';
import {
  ApiError,
  NetworkError,
  TimeoutError
} from '~/services/api/httpErrors';
import { FMCError } from './types';

export default async function handleError(
  e: Error,
  setErrors: (arg0: string) => any
) {
  const { translatedError, errorMessage } = await mapError(e);

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
  translatedError: FMCError;
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

  if (errorJson) {
    return typeof errorJson?.detail === 'string'
      ? errorJson.detail
      : JSON.stringify(errorJson, null, '2');
  }
  return errorText;
}

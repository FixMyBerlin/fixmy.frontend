import ky from 'ky-universal';
import debug from 'debug';
import {
  ApiError,
  NetworkError,
  TimeoutError
} from '~/services/api/httpErrors';
import { FMCError, JSONValue, JSONObject } from './types';

const log = debug('fmc:api:errorHandling');

/**
 * Translate errors reported by ky/fetch to a set of custom exceptions
 * which we can later on use to make decisions on how to handle specific errors.
 */
export default async function makeFMCError(e: FMCError): Promise<FMCError> {
  let translatedError: FMCError;
  let errorMessage: string;
  let statusCode: number;
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
      translatedError = e;
      break;
    default:
      // pain point: every unexpected Error instance (that is not a TypeError)
      // will be handled as NetworkError
      translatedError = new NetworkError(e);
      break;
  }

  return translatedError;
}

/**
 * Try parsing an error response as JSON or fallback to returning as text
 *
 * If a JSON error response contains a field `detail` of string type, its
 * content is returned as raw text
 *
 * @param errorResponse API return value
 */
async function parseErrorResponse(errorResponse: Response): Promise<string> {
  let errorJson: JSONValue;
  let errorText: string;

  // try parse error as text and then as JSON to not rely on content-type
  // definitions response headers
  try {
    errorText = await errorResponse.text();
  } catch (e) {
    throw new TypeError('Only JSON and text error responses can be handled');
  }

  try {
    errorJson = JSON.parse(errorText);
  } catch (e) {
    log('found error response encoded as raw text');
    return errorText;
  }

  if (typeof (errorJson as JSONObject)?.detail === 'string') {
    log('found `detail` field in json response');
    return (errorJson as JSONObject)?.detail.toString();
  }
  log('found json-encoded error response');
  return JSON.stringify(errorJson, null, 2);
}

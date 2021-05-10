import debug from 'debug';
import ky from 'ky-universal';

import { ApiError, NetworkError, TimeoutError } from './errors';
import { FMCError, JSONValue, JSONObject } from './types';

const log = debug('fmc:api:mapError');

/**
 * Translate errors reported by ky/fetch to a set of custom exceptions
 * which we can later on use to make decisions on how to handle specific errors.
 */
export default async function mapError(e: FMCError): Promise<FMCError> {
  let errorMessage: string;
  let statusCode: number;

  // handle network errors (misspelled URL, flaky or no network or CORS problems)
  if (e.message === 'Failed to fetch') {
    return new NetworkError(e.message);
  }

  // handle all other errors
  switch (e.constructor) {
    case ky.HTTPError: // a non 2xx error code was found
      errorMessage = await parseErrorResponse(e.response);
      statusCode = e.response.status;
      return new ApiError(errorMessage, statusCode);
    case ky.TimeoutError:
      return new TimeoutError(e.message);
    default:
      // any other error, just forward it
      return e;
  }
}

/**
 * Try parsing an error response as JSON or fallback to returning as text
 *
 * If a JSON error response contains a field `detail` of string type, its
 * content is returned as raw text
 *
 * @param errorResponse API return value
 */
async function parseErrorResponse(
  errorResponse: Response
): Promise<string | null> {
  let errorJson: JSONValue;
  let errorText: string;

  // try parse error as text and then as JSON to not rely on content-type
  // definitions response headers
  try {
    errorText = await errorResponse.text();
  } catch (e) {
    log(e);
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
  log('found json-encoded error response', errorJson);
  return null;
}

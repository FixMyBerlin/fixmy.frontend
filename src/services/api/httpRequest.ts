/**
 * Encapsulates the creation of http requests.
 * Un-aware of any app specifics,
 * designed to be used indirectly via the helper methods
 * in the index file of this module.
 */
import ky from 'ky';
import { RequestConfig } from './types';
import {
  ApiError,
  NetworkError,
  QualifiedError,
  TimeoutError
} from './httpErrors';

// TODO: add ts types
export default async function request({
  json,
  method,
  respType = 'json',
  route,
  token,
  timeout = 30 * 1000
}: RequestConfig) {
  let response;
  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    const options = { method, json, headers, timeout };
    response = await ky(route, options);
    if (respType) {
      response = await response[respType](); // TODO: clarify if we have actually have to mind other return types
    }
  } catch (e) {
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

  return response;
}

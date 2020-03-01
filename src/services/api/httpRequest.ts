/**
 * Encapsulates the creation of http requests.
 * Un-aware of any app specifics,
 * designed to be used indirectly via the helper methods
 * in the index file of this module.
 */
import ky from 'ky';
import { RequestConfig } from './types';

export default async function request({
  json,
  method,
  respType = 'json',
  route,
  token
}: RequestConfig) {
  let response;
  const headers = token ? { Authorization: `JWT ${token}` } : {};

  try {
    response = await ky(route, { method, json, headers });
    if (respType) {
      response = await response[respType](); // TODO: clarify if we have actually have to mind other return types?
    }
  } catch (e) {
    // if the api provides a meaningful, handled error, throw that error.
    // in all other cases just re-throw
    const statesMeaningFullError = e.response && e.response.json;
    if (!statesMeaningFullError) throw e; // TODO: update ts, use optional chaining
    throw await e.response.json();
  }

  return response;
}

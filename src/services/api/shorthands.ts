import { JSONValue, RequestOptions } from './types';
import request from './request';

/**
 * Make a GET request
 *
 * @example
 * try {
 *  const resp = await api.get(url)
 * } catch (err) {
 *  if (err instanceof api.ApiError) console.log(err.code, err.message)
 *  throw(error)
 * }
 * @param route URL to request
 * @param requestOptions as documented on api.request
 */
export const get = (
  route: string,
  requestOptions: RequestOptions = {}
): Promise<Response> => request(route, { ...requestOptions, method: 'get' });

/**
 * Make a POST request
 *
 * @example
 * try {
 *  const resp = await api.post(url, { value: 500 })
 * } catch (err) {
 *  if (err instanceof api.ApiError) console.log(err.code, err.message)
 *  throw(error)
 * }
 * @param route URL to request
 * @param payload JSON-encodable value to send as payload
 * @param requestOptions as documented on api.request
 */
export const post = (
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> =>
  request(route, {
    ...requestOptions,
    method: 'post',
    json: payload
  });

/**
 * Make a PATCH request
 *
 * @example
 * try {
 *  const resp = await api.patch(url, { value: 500 })
 * } catch (err) {
 *  if (err instanceof api.ApiError) console.log(err.code, err.message)
 *  throw(error)
 * }
 * @param route URL to request
 * @param payload JSON-encodable value to send as payload
 * @param requestOptions as documented on api.request
 */
export const patch = (
  route: string,
  payload: JSONValue,
  requestOptions: RequestOptions = {}
): Promise<Response> =>
  request(route, {
    ...requestOptions,
    method: 'patch',
    json: payload
  });

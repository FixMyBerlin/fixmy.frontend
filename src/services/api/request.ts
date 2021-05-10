/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import debug from 'debug';
import ky from 'ky-universal';

import config from '~/config';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import store from '~/store';

import mapError from './mapError';
import { RequestOptions } from './types';

const log = debug('fmc:api:request()');

// setup ky

const configuredKy = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
      // Set authorization headers
      (req: Request) => {
        const stateRoot = store.getState();
        const token = UserStateSelectors.getToken(stateRoot);
        if (token) {
          req.headers.set('Authorization', `JWT ${token}`);
        }
      },
    ],
  },
});

// Generic Request Handler

const defaultOptions: RequestOptions = {
  accept: 'json',
  method: 'get',
  timeout: 30 * 1000,
  slowResponseTimeout: 5 * 1000,
};

/**
 * Send requests with convenience callbacks, FMC auth header, raising fmcErrors
 *
 * @example
 * // Handle server error responses
 * try {
 *  const response = await api.request('https://fixmyberlin.de/api/v1/')
 * } catch (err) {
 *  if(err instanceof api.ApiError) {
 *    console.log(err.code)
 *    // 500
 *    console.log(err.message)
 *    // parsed from json or text response body
 *   }
 *   throw(error)
 * }
 *
 * @example
 * // Use callbacks
 * await api.request(url, {
 *   onSubmit: () => dispatch(setLoading(true)),
 *   onFinish: () => dispatch(setLoading(false)),
 *   onSlowRequest: () => dispatch(setSlowRequestNotice(true))
 * })
 *
 * @param route URL to request
 * @param options object with options, extending ky's options
 * @param options.accept expected response body type, either `string` or `json`
 * @param options.onSubmit function to call before making request
 * @param options.onFinish function to call after request finishes (successful or not)
 * @param options.onSlowResponse function to call when request is slow
 * @param options.slowResponseTimeout value in milliseconds to wait before
 *  calling onSlowResponse, defaults to 5000
 */
export default async function request(
  route: string,
  options: RequestOptions = defaultOptions
): Promise<Response> {
  let response;

  const {
    accept = defaultOptions.accept,
    slowResponseTimeout = defaultOptions.slowResponseTimeout,
    onSubmit,
    onFinish,
    onSlowResponse,
    ...kyOptions
  } = options;

  const timeout = setTimeout(() => {
    if (onSlowResponse) {
      log('calling slow request handler');
      onSlowResponse(slowResponseTimeout);
    }
  }, slowResponseTimeout);

  if (onSubmit) onSubmit();
  try {
    log('sending request', { route, options, accept });
    response = await configuredKy(route, kyOptions)[accept]();
  } catch (e) {
    log('mapping error type', { error: e });
    throw await mapError(e);
  } finally {
    log('finished request');
    if (onFinish) onFinish();
    clearTimeout(timeout);
  }
  return response;
}

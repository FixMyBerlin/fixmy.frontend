/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky from 'ky-universal';
import { Options as KyOptions } from 'ky';
import debug from 'debug';
import config from '~/config';
import store from '~/store';
import { RequestOptions } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import fmcError from './fmcError';

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
      }
    ]
  }
});

// Generic Request Handler

const defaultOptions: RequestOptions = {
  accept: 'json',
  method: 'get',
  timeout: 30 * 1000,
  slowResponseTimeout: 5 * 1000
};

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

  if (onSubmit) onSubmit();
  const timeout = setTimeout(() => {
    if (onSlowResponse) {
      log('calling slow request handler');
      onSlowResponse(slowResponseTimeout);
    }
  }, slowResponseTimeout);

  try {
    log('sending request', { route, options, accept });
    response = await configuredKy(route, kyOptions)[accept]();
  } catch (e) {
    log('calling error handler', { error: e });
    throw await fmcError(e);
  } finally {
    log('finished request');
    if (onFinish) onFinish();
    clearTimeout(timeout);
  }
  return response;
}

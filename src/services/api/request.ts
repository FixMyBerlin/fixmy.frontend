/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky from 'ky-universal';
import { Options as KyOptions } from 'ky';
import config from '~/config';
import store from '~/store';
import { RequestOptions } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import handleError from './errorHandling';

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

const defaultOptions: RequestOptions = {
  kyOptions: {},
  callbacks: {
    setSubmitting: () => {}
  },
  accept: 'json'
};

export default async function request(
  route: string,
  {
    callbacks = defaultOptions.callbacks,
    kyOptions = defaultOptions.kyOptions,
    accept = defaultOptions.accept
  }: RequestOptions = defaultOptions
): Promise<Response> {
  let response;

  const mergedKyOptions = mergeKyOptions(kyOptions);
  const { setErrors, setSubmitting } = callbacks;

  if (setSubmitting) setSubmitting(true);
  try {
    response = await configuredKy(route, mergedKyOptions)[accept]();
  } catch (e) {
    await handleError(e, setErrors);
  } finally {
    if (setSubmitting) setSubmitting(false);
  }
  return response;
}

function mergeKyOptions(requestConfig: KyOptions = {}) {
  const defaultKyOptions = {
    method: 'get',
    timeout: 30 * 1000
  };
  return {
    ...defaultKyOptions,
    ...requestConfig
  };
}

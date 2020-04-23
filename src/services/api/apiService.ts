/**
 * Facilitates http request creation by
 * - offering helper methods with simplified interfaces
 * - allowing to hook into before/after a request is made or if an error occurs
 * - doing  preparatory work for network error request handling
 */
import ky, { Options as KyOptions } from 'ky';
import config from '~/config';
import store from '~/store';
import { RequestOptions } from './types';
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { handleError } from '~/services/api/errorHandling';

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
    setSubmitting: () => {}
  },
  responseBodyType: 'json'
};

export default async function request(
  route: string,
  {
    callbacks = {},
    kyOptions = {},
    responseBodyType = 'json'
  }: RequestOptions = defaultRequestOptions
): Promise<Response> {
  let response;

  const mergedKyOptions = prepareKyOptions(kyOptions);
  const { setErrors, setSubmitting = () => {} } = callbacks;

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

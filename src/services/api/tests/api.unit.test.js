import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import * as api from '../apiService';
import config from '~/config'; // TODO: consider mocking this
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import { NetworkError, QualifiedError, TimeoutError } from '~/services/api/httpErrors';
import { combineURLs } from '~/services/api/utils';

const globals = {
  testRoute: 'fakeEndpoint',
  compileAbsoluteRoute: (relativeRoute) =>
    combineURLs(config.apiUrl, relativeRoute)
};

describe('api module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('generic requests handler', () => {
    it('prefixes urls with the api base url defined in the app config', async () => {
      fetchMock.mock(`end:${globals.testRoute}`, {});
      await api.request(globals.testRoute);
      const [url] = fetchMock.lastCall();
      expect(url).toEqual(globals.compileAbsoluteRoute(globals.testRoute));
    });

    it('reads the token from the store in an interceptor', async () => {
      const spy = jest.spyOn(UserStateSelectors, 'getToken');
      fetchMock.mock(`end:${globals.testRoute}`, {});
      await api.request(globals.testRoute);
      expect(spy).toHaveBeenCalled();
      // TODO: test request headers when the store contains a token
    });

    describe('translation of errors into custom classes', () => {
      it('translates an API error answer JSON, translates at re-throws it as custom QualifiedError instance', async () => {
        const testResponseBody = { detail: 'Nicht gefunden.' };
        const testResponseOptions = { status: 404, statusText: 'Not found' };
        const errResponse = new Response(
          JSON.stringify(testResponseBody),
          testResponseOptions
        );
        fetchMock.mock(`end:${globals.testRoute}`, errResponse);

        await expect(api.request(globals.testRoute)).rejects.toThrow(
          QualifiedError
        );
      });

      it('throws a custom TimeoutError on request time out', async () => {
        // this also proves that the request timeout can be specified at all
        const delayResponse = (response, after = 500) => () =>
          new Promise((resolve) => setTimeout(resolve, after)).then(
            () => response
          );

        // mock request timeout
        fetchMock.mock(`end:${globals.testRoute}`, delayResponse(408, 2)); // send '200' response after 2 millis

        await expect(
          api.request(globals.testRoute, { timeout: 1 })
        ).rejects.toThrow(TimeoutError);
      });

      it('throws a custom NetworkError if the server does not answer', async () => {
        fetchMock.mock(`end:${globals.testRoute}`, () => {
          throw new Error('Connection error')
        });

        await expect(api.request(globals.testRoute)).rejects.toThrow(NetworkError);
      })
    });
  });

  describe('GET requests', () => {
    it('can GET json data', async () => {
      const mockedJsonResponse = { hello: 'world' };
      fetchMock.get(`end:${globals.testRoute}`, mockedJsonResponse);
      const result = await api.get(globals.testRoute);
      expect(result.hello).toEqual(mockedJsonResponse.hello);
    });

    describe('POST requests', () => {
      it('can POST json data', async () => {
        const mockedPayload = { hello: 'world' };
        const mockedResponse = mockedPayload;

        fetchMock.post(`end:${globals.testRoute}`, mockedResponse);

        const response = await api.post(globals.testRoute, mockedPayload);
        const fetchOptions = fetchMock.lastOptions();

        expect(fetchOptions.headers['content-type']).toContain(
          'application/json'
        );
        expect(fetchOptions.method).toEqual('POST');

        expect(fetchOptions.body).toMatchObject(mockedPayload); // FIXME: this fails, seeked help https://github.com/wheresrhys/fetch-mock/issues/374
        expect(response).toEqual(mockedResponse);
      });

      describe('error handling', () => {});
    });
  });
});

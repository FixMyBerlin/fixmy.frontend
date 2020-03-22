import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import * as api from '../apiService';
import config from '~/config'; // TODO: consider mocking this
import { selectors as UserStateSelectors } from '~/pages/User/UserState';
import {
  NetworkError,
  ApiError,
  TimeoutError,
  GENERIC_ERROR_MESSAGE
} from '~/services/api/httpErrors';
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

  describe('generic request handler', () => {
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
    });

    it('can request text content', async () => {
      const testResponse = 'Hello world';
      fetchMock.mock(`end:${globals.testRoute}`, testResponse);
      const response = await api.request(globals.testRoute, null, null, 'text');
      expect(response).toEqual(testResponse);
    });

    test.todo('test that hooks have been called')

    describe('error handling – translation of http client errors into custom Error classes', () => {
      it('rethrows an Error JSON as ApiError stating its detail', async () => {
        const testResponseBody = { detail: 'Nicht gefunden.' };
        const testResponseOptions = { status: 404, statusText: 'Not found' };
        const errResponse = new Response(
          JSON.stringify(testResponseBody),
          testResponseOptions
        );
        fetchMock.mock(`end:${globals.testRoute}`, errResponse);

        await expect(api.request(globals.testRoute)).rejects.toThrowError(
          new ApiError(testResponseBody.detail)
        );
      });

      it('rethrows an Error JSON as ApiError not stating a detail with a generic error message', async () => {
        // the key describing the error intentionally breaches our conventions for error answers
        const testResponseBody = { customError: 'wholey moly' };
        const testResponseOptions = { status: 500 };
        const errResponse = new Response(
          JSON.stringify(testResponseBody),
          testResponseOptions
        );
        fetchMock.mock(`end:${globals.testRoute}`, errResponse);

        await expect(api.request(globals.testRoute)).rejects.toThrowError(
          new ApiError(GENERIC_ERROR_MESSAGE)
        );
      });

      it('rethrows a non-JSON error as ApiError stating its detail', async () => {
        const testResponse = 'something went south';
        const testResponseOptions = { status: 404, statusText: 'Not found' };
        const errResponse = new Response(testResponse, testResponseOptions);
        fetchMock.mock(`end:${globals.testRoute}`, errResponse);

        await expect(
          api.request(globals.testRoute, null, null, 'text')
        ).rejects.toThrowError(new ApiError(testResponse));
      });

      it('throws a TimeoutError on request time out', async () => {
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
          throw new Error('Connection error');
        });

        await expect(api.request(globals.testRoute)).rejects.toThrow(
          NetworkError
        );
      });
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
        expect(response).toEqual(mockedResponse);

        const body = await fetchOptions.body;
        expect(body).toMatch(JSON.stringify(mockedPayload));
      });

      describe('error handling', () => {});
    });
  });
});

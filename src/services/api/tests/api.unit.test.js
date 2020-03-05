import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import * as api from '../index';
import config from '~/config'; // TODO: consider mocking this
import QualifiedError from '~/services/api/httpErrors';

import { combineURLs } from '~/services/api/utils';

const globals = {
  testRoute: 'fakeEndpoint',
  compileAbsoluteRoute: (relativeRoute) => combineURLs(config.apiUrl, relativeRoute)
};

describe('api module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('successful GET requests', () => {
    it('prefixes urls with the api base url defined in the app config', async () => {
      const mockedJsonResponse = { hello: 'world' };
      fetchMock.get(`end:${globals.testRoute}`, mockedJsonResponse);
      // eslint-disable-next-line no-unused-vars
      const result = await api.get(globals.testRoute);
      const [url] = fetchMock.lastCall();
      expect(url).toEqual(globals.compileAbsoluteRoute(globals.testRoute));
    });


    it('can GET json data', async () => {
      const mockedJsonResponse = { hello: 'world' };
      fetchMock.get(`end:${globals.testRoute}`, mockedJsonResponse);
      const result = await api.get(globals.testRoute);
      expect(result.hello).toEqual(mockedJsonResponse.hello);
    });
  });

  describe('failing GET requests', () => {
    it('re-throws a meaningful error provided by the API', async () => {
      const testResponseBody = { detail: 'Nicht gefunden.' };
      const testResponseOptions = { status: 404, statusText: 'Not found' };
      const errResponse = new Response(testResponseBody, testResponseOptions);
      fetchMock.get(`end:${globals.testRoute}`, errResponse);

      await expect(api.get(globals.testRoute)).rejects.toThrow(QualifiedError);
    });

    describe('successful POST requests', () => {
      it('can POST json data', async () => {
        const mockedPayload = { hello: 'world' };
        const mockedResponse = mockedPayload;

        fetchMock.post(`end:${globals.testRoute}`, mockedResponse);

        const response = await api.post(globals.testRoute, mockedPayload);
        const fetchOptions = fetchMock.lastOptions();

        expect(fetchOptions.headers['content-type']).toContain('application/json');
        expect(fetchOptions.method).toEqual('POST');

        expect(fetchOptions.body).toMatchObject(mockedPayload); // FIXME
        expect(response).toEqual(mockedResponse);
      });

      // TODO: test token handling
    });
  });
});

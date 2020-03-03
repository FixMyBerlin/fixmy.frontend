import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import * as api from '../index';
import QualifiedError, { TimeoutError } from '~/services/api/httpErrors';

describe('api module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('successful GET requests', () => {
    it('can GET json data', async () => {
      const testUrl = 'http://fake.com/';
      const mockedJsonResponse = { hello: 'world' };
      fetchMock.get(testUrl, mockedJsonResponse);

      const result = await api.get(testUrl);
      const [url] = fetchMock.lastCall();

      expect(url).toEqual(testUrl);
      expect(result.hello).toEqual(mockedJsonResponse.hello);
    });
  });

  describe('failing GET requests', () => {
    it('re-throws a meaningful error provided by the API', async () => {
      const testUrl = 'http://fake.com/';
      const testResponseBody = { detail: 'Nicht gefunden.' };
      const testResponseOptions = { status: 404, statusText: 'Not found' };
      const errResponse = new Response(testResponseBody, testResponseOptions);
      fetchMock.get(testUrl, errResponse);

      await expect(api.get(testUrl)).rejects.toThrow(QualifiedError);
    });

    it('throws a Timeout Error if the timeout is exceeded', async () => {
      // this also proves that the timout can be configured by consumers of the api module TODO
      const testUrl = 'http://fake.com/';
      fetchMock.get(testUrl, new Promise(res => setTimeout(() => res(200), 35000)));

      await expect(api.get(testUrl)).rejects.toThrow(TimeoutError);
    }, 35000); // FIXME: once the request timeout is configurable, use way smaller timeout
  });

  describe('successful POST requests', () => {
    it('can POST json data', async () => {
      const testUrl = 'http://fakepostbody.com/';
      const mockedPayload = { hello: 'world' };
      const mockedResponse = mockedPayload;

      fetchMock.post(testUrl, mockedResponse);

      const response = await api.post(testUrl, mockedPayload);
      const [url, fetchOptions] = fetchMock.lastCall();

      expect(url).toEqual(testUrl);
      expect(fetchOptions.headers['content-type']).toContain('application/json');
      expect(fetchOptions.method).toEqual('POST');

      expect(fetchOptions.body).toMatchObject(mockedPayload); // FIXME
      expect(response).toEqual(mockedResponse);
    });

    // TODO: test token handling
  });


});

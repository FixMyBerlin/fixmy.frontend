import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import request from '../request';
import store from '~/store';

import { ApiError, NetworkError, TimeoutError } from '../errors';
import { get, patch, post } from '../shorthands';
import {
  compileAbsoluteRoute,
  delayResponse
} from '~/services/api/tests/apiTestUtils';

const SAMPLE_ROUTE = 'fakeEndpoint';
const SAMPLE_JSON_VALUE = { hello: 'world' };

describe('API module', () => {
  afterEach(() => {
    fetchMock.restore();
    jest.restoreAllMocks();
  });

  describe('Generic request handler', () => {
    it('prefixes urls with the api base url defined in the app config', async () => {
      // match all requests ending with the stated relative route since the api
      //  will prepend it with a base url
      fetchMock.mock(`end:${SAMPLE_ROUTE}`, {});
      await request(SAMPLE_ROUTE);
      const [url] = fetchMock.lastCall();
      expect(url).toEqual(compileAbsoluteRoute(SAMPLE_ROUTE));
    });

    it('adds user auth token from redux store to request header', async () => {
      const testToken = 'abc123';
      const mockState = {
        UserState: {
          token: testToken
        }
      };
      jest.mock('~/store');
      store.getState = () => mockState;
      fetchMock.mock(`end:${SAMPLE_ROUTE}`, {});

      await request(SAMPLE_ROUTE);

      const fetchOptions = fetchMock.lastOptions();
      // headers are wrapped in an array
      // see https://github.com/node-fetch/node-fetch/issues/219#issuecomment-270946419
      expect(fetchOptions.headers.Authorization).toContain(`JWT ${testToken}`);
    });

    it('can request text content', async () => {
      const testResponse = 'Hello world';
      fetchMock.mock(`end:${SAMPLE_ROUTE}`, testResponse);
      const response = await request(SAMPLE_ROUTE, {
        accept: 'text'
      });
      expect(response).toEqual(testResponse);
    });

    test.todo('it can post form data'); // see https://github.com/sindresorhus/ky#tips

    it('calls the onSubmit and onFinish callback', async () => {
      const onSubmitSpy = jest.fn();
      const onFinishSpy = jest.fn();

      fetchMock.mock(`end:${SAMPLE_ROUTE}`, SAMPLE_JSON_VALUE);
      await request(SAMPLE_ROUTE, {
        onSubmit: onSubmitSpy,
        onFinish: onFinishSpy
      });

      expect(onSubmitSpy).toBeCalled();
      expect(onFinishSpy).toBeCalled();
    });

    it('calls the onSlowResponse callback on for slow requests', async () => {
      const onSlowResponseSpy = jest.fn();

      fetchMock.mock(`end:${SAMPLE_ROUTE}`, SAMPLE_JSON_VALUE);
      await request(SAMPLE_ROUTE, {
        onSlowResponse: onSlowResponseSpy
      });

      expect(onSlowResponseSpy).toHaveBeenCalledTimes(0);

      fetchMock.mock(`end:slowRoute`, delayResponse(SAMPLE_JSON_VALUE, 2));

      await request('slowRoute', {
        onSlowResponse: onSlowResponseSpy,
        slowResponseTimeout: 1
      });

      expect(onSlowResponseSpy).toHaveBeenCalledTimes(1);
    });

    describe('Error handling', () => {
      describe('translation of http client errors into custom Error classes', () => {
        it(
          'identifies an error JSON response ' +
            'and rethrows it as ApiError stating its error message and error code',
          async () => {
            const testResponseBody = { detail: 'Nicht gefunden.' };
            const testResponseOptions = {
              status: 404,
              statusText: 'Not found'
            };
            const errResponse = new Response(
              JSON.stringify(testResponseBody),
              testResponseOptions
            );
            fetchMock.mock(`end:${SAMPLE_ROUTE}`, errResponse);

            let thrownError;
            try {
              await request(SAMPLE_ROUTE);
            } catch (e) {
              thrownError = e;
            }
            expect(thrownError).toBeInstanceOf(ApiError);
            expect(thrownError.message).toBe(testResponseBody.detail);
            expect(thrownError.code).toBe(testResponseOptions.status);
          }
        );

        it(
          'rethrows an error JSON as ApiError not containing a detail key ' +
            'without the response body',
          async () => {
            // the key describing the error intentionally breaches our conventions for error answers
            const testResponseBody = { customError: 'wholey moly' };
            const testResponseOptions = {
              status: 500
            };
            const errResponse = new Response(
              JSON.stringify(testResponseBody),
              testResponseOptions
            );
            fetchMock.mock(`end:${SAMPLE_ROUTE}`, errResponse);

            await expect(request(SAMPLE_ROUTE)).rejects.toThrowError(
              new ApiError(null)
            );
          }
        );

        it('rethrows a text error as ApiError stating its detail', async () => {
          const testResponse = 'something went south';
          const testResponseOptions = { status: 404, statusText: 'Not found' };
          const errResponse = new Response(testResponse, testResponseOptions);
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, errResponse);

          await expect(
            request(SAMPLE_ROUTE, {
              accept: 'text'
            })
          ).rejects.toThrowError(new ApiError(testResponse));
        });

        it('throws a TimeoutError on read request time out', async () => {
          // this also proves that the request timeout can be specified at all

          // mock request timeout
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, delayResponse(408, 2)); // send '200' response after 2 millis

          await expect(request(SAMPLE_ROUTE, { timeout: 1 })).rejects.toThrow(
            TimeoutError
          );
        });

        it('throws a TimeoutError on connection request time out', async () => {
          // use a non-routable IP, do not intercept the request, see https://stackoverflow.com/a/904609/5418403
          const nonRoutableIp = '192.168.255.255';

          await expect(
            request(`https://${{ nonRoutableIp }}`, { timeout: 1 })
          ).rejects.toThrow(TimeoutError);
        });

        // FIXME: this test is horrible. What if fetch changes its way of stating a network error?
        //  We should rather find a way to simulate an offline device, e.g. using cypress
        //  (see https://github.com/cypress-io/cypress/issues/235)
        it('throws a custom NetworkError if the server does not answer', async () => {
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, () => {
            throw new Error('Failed to fetch');
          });

          await expect(request(SAMPLE_ROUTE)).rejects.toThrow(NetworkError);
        });

        test.todo(
          'throws a typeError if the error response is not a text or a json'
          // not sure if we really need this except to have test coverage
        );
      });

      describe('invocation of request hooks', () => {
        it('invokes `onSubmit` and `onFinish` even if the request fails', async () => {
          const onSubmitSpy = jest.fn();
          const onFinishSpy = jest.fn();

          fetchMock.mock(`end:${SAMPLE_ROUTE}`, () => {
            throw new Error('Connection error');
          });

          try {
            await request(SAMPLE_ROUTE, {
              onSubmit: onSubmitSpy,
              onFinish: onFinishSpy
            });
          } catch (e) {
            // swallow the error, does not concern us here
          }
          expect(onSubmitSpy).toBeCalled();
          expect(onFinishSpy).toBeCalled();
        });
      });
    });
  });

  describe('Shorthand methods', () => {
    it('provides a shorthand to GET json data', async () => {
      const mockedJsonResponse = SAMPLE_JSON_VALUE;
      fetchMock.get(`end:${SAMPLE_ROUTE}`, mockedJsonResponse);
      const result = await get(SAMPLE_ROUTE);
      expect(result.hello).toEqual(mockedJsonResponse.hello);
    });

    it('provides a shorthand to POST json data', async () => {
      const mockedPayload = SAMPLE_JSON_VALUE;
      const mockedResponse = mockedPayload;

      fetchMock.post(`end:${SAMPLE_ROUTE}`, mockedResponse);

      const response = await post(SAMPLE_ROUTE, mockedPayload);
      const fetchOptions = fetchMock.lastOptions();

      expect(fetchOptions.headers['content-type']).toContain(
        'application/json'
      );
      expect(fetchOptions.headers.accept).toContain('application/json');
      expect(fetchOptions.method).toEqual('POST');
      expect(response).toEqual(mockedResponse);

      const body = await fetchOptions.body;
      expect(body).toMatch(JSON.stringify(mockedPayload));
    });

    it('provides a shorthand to PATCH json data', async () => {
      const mockedJsonResponse = { a: 1, b: 2 };
      const mockedRequestBody = { b: 2 };

      fetchMock.patch(`end:${SAMPLE_ROUTE}`, mockedJsonResponse);
      const response = await patch(SAMPLE_ROUTE, mockedRequestBody);

      const fetchOptions = fetchMock.lastOptions();
      expect(fetchOptions.headers['content-type']).toContain(
        'application/json'
      );
      expect(fetchOptions.headers.accept).toContain('application/json');
      expect(fetchOptions.method).toEqual('PATCH');
      expect(response).toEqual(mockedJsonResponse);

      const body = await fetchOptions.body;
      expect(body).toMatch(JSON.stringify(mockedRequestBody));
    });
  });
});

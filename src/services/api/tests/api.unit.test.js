import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import request from '../request';
import config from '~/config'; // TODO: consider mocking this
import {
  ApiError,
  NetworkError,
  TimeoutError
} from '~/services/api/httpErrors';
import store from '~/store';
import { get, patch, post } from '~/services/api/shorthands';

const SAMPLE_ROUTE = 'fakeEndpoint';
const SAMPLE_JSON_VALUE = { hello: 'world' };

const compileAbsoluteRoute = (relativeURL) =>
  relativeURL
    ? `${config.apiUrl.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`
    : config.apiUrl;

const printError = (value) => JSON.stringify(value, null, 2);

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

    it('toggles an isSubmitting flag using the provided request hook `setSubmitting`', async () => {
      const setSubmittingSpy = jest.fn();

      fetchMock.mock(`end:${SAMPLE_ROUTE}`, SAMPLE_JSON_VALUE);
      await request(SAMPLE_ROUTE, {
        callbacks: {
          setSubmitting: setSubmittingSpy
        }
      });

      expect(setSubmittingSpy.mock.calls).toEqual([[true], [false]]);
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
            'with the response body',
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
              new ApiError(printError(testResponseBody))
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

        it('throws a TimeoutError on request time out', async () => {
          // this also proves that the request timeout can be specified at all
          const delayResponse = (response, after = 500) => () =>
            new Promise((resolve) => setTimeout(resolve, after)).then(
              () => response
            );

          // mock request timeout
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, delayResponse(408, 2)); // send '200' response after 2 millis

          await expect(
            request(SAMPLE_ROUTE, { kyOptions: { timeout: 1 } })
          ).rejects.toThrow(TimeoutError);
        });

        it('throws a custom NetworkError if the server does not answer', async () => {
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, () => {
            throw new Error('Connection error');
          });

          await expect(request(SAMPLE_ROUTE)).rejects.toThrow(NetworkError);
        });

        test.todo(
          'throws a typeError if the error response is not a text or a json'
          // not sure if we really need this except to have test coverage
        );
      });

      describe('invocation of request hooks', () => {
        it('still invokes `setSubmitting` twice even if the request fails', async () => {
          const setSubmittingSpy = jest.fn();

          fetchMock.mock(`end:${SAMPLE_ROUTE}`, () => {
            throw new Error('Connection error');
          });

          let catchedError;
          try {
            await request(SAMPLE_ROUTE, {
              callbacks: {
                setSubmitting: setSubmittingSpy
              }
            });
          } catch (e) {
            catchedError = e;
          }
          expect(catchedError).toBeInstanceOf(NetworkError);
          expect(setSubmittingSpy.mock.calls).toEqual([[true], [false]]);
        });

        it('calls the provided request hook `setError` with the error message JSON returned by the API', async () => {
          const setErrorSpy = jest.fn();

          const errorMessage = 'nuclear core melt accident';
          const errResponse = new Response(errorMessage, {
            status: 500
          });
          fetchMock.mock(`end:${SAMPLE_ROUTE}`, errResponse);
          try {
            await request(SAMPLE_ROUTE, {
              callbacks: {
                setErrors: setErrorSpy
              }
            });
          } catch (e) {
            expect(setErrorSpy).toHaveBeenCalledWith(errorMessage);
          }
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

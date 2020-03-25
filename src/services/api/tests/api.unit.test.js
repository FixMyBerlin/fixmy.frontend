import fetchMock from 'fetch-mock';
import { Response } from 'node-fetch';
import * as api from '../apiService';
import config from '~/config'; // TODO: consider mocking this
import {
  ApiError,
  GENERIC_ERROR_MESSAGE,
  NetworkError,
  TimeoutError
} from '~/services/api/httpErrors';
import store from '~/store';
import { combineURLs } from '~/services/api/utils';

// dedupe values used in multiple places within the test file
const globals = {
  randomRoute: 'fakeEndpoint',
  randomJson: { hello: 'world' },
  compileAbsoluteRoute: (relativeRoute) =>
    combineURLs(config.apiUrl, relativeRoute)
};

describe('API module', () => {
  afterEach(() => {
    fetchMock.restore();
    jest.restoreAllMocks();
  });

  describe('Generic request handler', () => {
    it('prefixes urls with the api base url defined in the app config', async () => {
      fetchMock.mock(`end:${globals.randomRoute}`, {});
      await api.request(globals.randomRoute);
      const [url] = fetchMock.lastCall();
      expect(url).toEqual(globals.compileAbsoluteRoute(globals.randomRoute));
    });

    it('reads the token from the store before the request and adds it to the request header', async () => {
      const testToken = 'abc123';
      const mockState = {
        UserState: {
          token: testToken
        }
      };
      jest.mock('~/store');
      store.getState = () => mockState;
      fetchMock.mock(`end:${globals.randomRoute}`, {});

      await api.request(globals.randomRoute);

      const fetchOptions = fetchMock.lastOptions();
      expect(fetchOptions.headers.Authorization).toContain(`JWT ${testToken}`); // headers are wrapped in array, see https://github.com/node-fetch/node-fetch/issues/219#issuecomment-270946419
    });

    it('can request text content', async () => {
      const testResponse = 'Hello world';
      fetchMock.mock(`end:${globals.randomRoute}`, testResponse);
      const response = await api.request(globals.randomRoute, {
        responseBodyType: 'text'
      });
      expect(response).toEqual(testResponse);
    });

    test.todo('it can post form data'); // see https://github.com/sindresorhus/ky#tips

    it('toggles an isSubmitting flag using the provided request hook `setSubmitting`', async () => {
      const setSubmittingSpy = jest.fn();

      fetchMock.mock(`end:${globals.randomRoute}`, globals.randomJson);
      await api.request(globals.randomRoute, {
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
            fetchMock.mock(`end:${globals.randomRoute}`, errResponse);

            let thrownError;
            try {
              await api.request(globals.randomRoute);
            } catch (e) {
              thrownError = e;
            }
            expect(thrownError).toBeInstanceOf(ApiError);
            expect(thrownError.message).toBe(testResponseBody.detail);
            expect(thrownError.code).toBe(testResponseOptions.status);
          }
        );

        it('rethrows an error JSON as ApiError not stating a detail with a generic error message', async () => {
          // the key describing the error intentionally breaches our conventions for error answers
          const testResponseBody = { customError: 'wholey moly' };
          const testResponseOptions = {
            status: 500
          };
          const errResponse = new Response(
            JSON.stringify(testResponseBody),
            testResponseOptions
          );
          fetchMock.mock(`end:${globals.randomRoute}`, errResponse);

          await expect(api.request(globals.randomRoute)).rejects.toThrowError(
            new ApiError(GENERIC_ERROR_MESSAGE)
          );
        });

        it('rethrows a non-JSON error as ApiError stating its detail', async () => {
          const testResponse = 'something went south';
          const testResponseOptions = { status: 404, statusText: 'Not found' };
          const errResponse = new Response(testResponse, testResponseOptions);
          fetchMock.mock(`end:${globals.randomRoute}`, errResponse);

          await expect(
            api.request(globals.randomRoute, {
              responseBodyType: 'text'
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
          fetchMock.mock(`end:${globals.randomRoute}`, delayResponse(408, 2)); // send '200' response after 2 millis

          await expect(
            api.request(globals.randomRoute, { kyOptions: { timeout: 1 } })
          ).rejects.toThrow(TimeoutError);
        });

        it('throws a custom NetworkError if the server does not answer', async () => {
          fetchMock.mock(`end:${globals.randomRoute}`, () => {
            throw new Error('Connection error');
          });

          await expect(api.request(globals.randomRoute)).rejects.toThrow(
            NetworkError
          );
        });
      });

      describe('invocation of request hooks', () => {
        it('still invokes `setSubmitting` twice even if the request fails', async () => {
          const setSubmittingSpy = jest.fn();

          fetchMock.mock(`end:${globals.randomRoute}`, () => {
            throw new Error('Connection error');
          });

          let catchedError;
          try {
            await api.request(globals.randomRoute, {
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
          fetchMock.mock(`end:${globals.randomRoute}`, errResponse);
          try {
            await api.request(globals.randomRoute, {
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
      const mockedJsonResponse = globals.randomJson;
      fetchMock.get(`end:${globals.randomRoute}`, mockedJsonResponse);
      const result = await api.get(globals.randomRoute);
      expect(result.hello).toEqual(mockedJsonResponse.hello);
    });

    it('provides a shorthand to POST json data', async () => {
      const mockedPayload = globals.randomJson;
      const mockedResponse = mockedPayload;

      fetchMock.post(`end:${globals.randomRoute}`, mockedResponse);

      const response = await api.post(globals.randomRoute, mockedPayload);
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

      fetchMock.patch(`end:${globals.randomRoute}`, mockedJsonResponse);
      const response = await api.patch(globals.randomRoute, mockedRequestBody);

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

  test.todo('patch request');
});

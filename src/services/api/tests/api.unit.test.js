import { rest } from 'msw';

import { compileAbsoluteRoute } from '~/services/api/tests/apiTestUtils';
import store from '~/store';

import { ApiError, TimeoutError } from '../errors';
import request from '../request';
import { get, patch, post } from '../shorthands';

import { mswServer } from '~/../jest/msw/mswServer';

const SAMPLE_ROUTE = 'fakeEndpoint';
const DUMMY_JSON = { doesnt: 'matter' };

describe('API module', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Generic request handler', () => {
    it('prefixes urls with the api base url defined in the app config', async () => {
      // match all requests ending with the stated relative route since the api
      //  will prepend it with a base url
      const pathToMatch = `*/${SAMPLE_ROUTE}`;
      // set up request interception, do assertions in response resolver
      mswServer.use(
        rest.get(pathToMatch, (req, res, ctx) => {
          // run assertions against the outgoing request
          expect(req.url.toString()).toEqual(
            compileAbsoluteRoute(SAMPLE_ROUTE)
          );
          return res(ctx.json(DUMMY_JSON));
        })
      );
      // trigger request
      await request(SAMPLE_ROUTE);
    });

    it('adds user auth token from redux store to request header', async () => {
      const testToken = 'abc123';
      const mockState = {
        UserState: {
          token: testToken,
        },
      };
      jest.mock('~/store');
      store.getState = () => mockState;
      mswServer.use(
        rest.get(`*/${SAMPLE_ROUTE}`, (req, res, ctx) => {
          expect(req.headers.get('authorization')).toEqual(`JWT ${testToken}`);
          return res(ctx.json(DUMMY_JSON));
        })
      );
      await request(SAMPLE_ROUTE);
    });

    it('can request text content', async () => {
      const testResponse = 'Hello world';
      mswServer.use(
        rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
          res(ctx.text(testResponse))
        )
      );
      const response = await request(SAMPLE_ROUTE, {
        accept: 'text',
      });
      expect(response).toEqual(testResponse);
    });

    test.todo('it can post form data'); // see https://github.com/sindresorhus/ky#tips

    it('calls the onSubmit and onFinish callback', async () => {
      const onSubmitSpy = jest.fn();
      const onFinishSpy = jest.fn();

      mswServer.use(
        rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) => {
          return res(ctx.json(DUMMY_JSON));
        })
      );

      await request(SAMPLE_ROUTE, {
        onSubmit: onSubmitSpy,
        onFinish: onFinishSpy,
      });

      expect(onSubmitSpy).toBeCalled();
      expect(onFinishSpy).toBeCalled();
    });

    it('calls the onSlowResponse callback on for slow requests', async () => {
      const onSlowResponseSpy = jest.fn();

      mswServer.use(
        rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
          res(ctx.json(DUMMY_JSON))
        )
      );
      await request(SAMPLE_ROUTE, {
        onSlowResponse: onSlowResponseSpy,
      });

      mswServer.use(
        rest.get(`*/slowRoute`, (_, res, ctx) =>
          res(ctx.delay(2), ctx.json(DUMMY_JSON))
        )
      );

      await request('slowRoute', {
        onSlowResponse: onSlowResponseSpy,
        slowResponseTimeout: 1,
      });

      expect(onSlowResponseSpy).toHaveBeenCalledTimes(1);
    });

    describe('Error handling', () => {
      describe('translation of http client errors into custom Error classes', () => {
        it(
          'identifies an error JSON response ' +
            'and rethrows it as ApiError stating its error message and error code',
          async () => {
            mswServer.use(
              rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
                res(ctx.status(404), ctx.json({ detail: 'Nicht gefunden.' }))
              )
            );

            let thrownError;
            try {
              await request(SAMPLE_ROUTE);
            } catch (e) {
              thrownError = e;
            }

            expect(thrownError).toBeInstanceOf(ApiError);
            expect(thrownError.message).toBe('Nicht gefunden.');
            expect(thrownError.code).toBe(404);
          }
        );

        it(
          'rethrows an error JSON as ApiError not containing a detail key ' +
            'without the response body',
          async () => {
            mswServer.use(
              rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
                res(
                  ctx.status(500),
                  // the response body intentionally breaks our conventions for API error answers
                  ctx.json({ customError: 'wholey moly' })
                )
              )
            );
            await expect(request(SAMPLE_ROUTE)).rejects.toThrowError(
              new ApiError(null) // sets a default message
            );
          }
        );

        it('rethrows a text error as ApiError stating its detail', async () => {
          const textResponse = 'something went south';
          mswServer.use(
            rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
              res(
                ctx.status(500),
                // the response body intentionally breaks our conventions for API error answers
                ctx.text(textResponse)
              )
            )
          );

          await expect(
            request(SAMPLE_ROUTE, {
              accept: 'text',
            })
          ).rejects.toThrowError(new ApiError(textResponse));
        });

        it('throws a TimeoutError on read request time out', async () => {
          // this also proves that the request timeout can be specified at all

          // mock request timeout
          mswServer.use(
            rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
              res(
                ctx.delay(2),
                // the response body intentionally breaks our conventions for API error answers
                ctx.json(DUMMY_JSON)
              )
            )
          );

          await expect(request(SAMPLE_ROUTE, { timeout: 1 })).rejects.toThrow(
            TimeoutError
          );
        });

        it('throws a TimeoutError on connect time out', async () => {
          // use a non-routable IP, do not intercept the request, see https://stackoverflow.com/a/904609/5418403
          const nonRoutableIp = '192.168.255.255';

          // request is intentionally not intercepted

          await expect(
            request(`https://${{ nonRoutableIp }}`, { timeout: 1 })
          ).rejects.toThrow(TimeoutError);
        });

        // TODO: Since it does not make much sense to run tests against an apiClient
        //  that uses node-fetch during tests either run tests headlessly or use cypress
        //  (see https://github.com/cypress-io/cypress/issues/235)
        test.todo('throws a custom NetworkError if the server does not answer');

        test.todo(
          'throws a typeError if the error response is not a text or a json'
          // not sure if we really need this except to have test coverage
        );
      });

      describe('invocation of request hooks', () => {
        it('invokes `onSubmit` and `onFinish` even if the request fails', async () => {
          const onSubmitSpy = jest.fn();
          const onFinishSpy = jest.fn();

          mswServer.use(
            rest.get(`*/${SAMPLE_ROUTE}`, (_, res) =>
              res.networkError('shit hit the fan')
            )
          );

          try {
            await request(SAMPLE_ROUTE, {
              onSubmit: onSubmitSpy,
              onFinish: onFinishSpy,
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
      mswServer.use(
        rest.get(`*/${SAMPLE_ROUTE}`, (_, res, ctx) =>
          res(ctx.json({ hello: 'world' }))
        )
      );
      const result = await get(SAMPLE_ROUTE);

      expect(result.hello).toEqual('world');
    });

    it('provides a shorthand to POST json data', async () => {
      const mockedPayload = DUMMY_JSON;
      const mockedResponse = mockedPayload; // request body equals parsed response

      mswServer.use(
        rest.post(`*/${SAMPLE_ROUTE}`, (req, res, ctx) => {
          // ensure correct request configuration
          expect(req.headers.get('content-type')).toBe('application/json');
          expect(req.headers.get('accept')).toBe('application/json');
          expect(req.method.toLowerCase()).toBe('post');
          expect(req.body).toEqual(mockedPayload);
          // resolve request with mock data
          return res(ctx.json(mockedResponse));
        })
      );

      // ensure that the shorthand resolved with the parsed response
      const response = await post(SAMPLE_ROUTE, mockedPayload);
      expect(response).toEqual(mockedResponse);
    });

    it('provides a shorthand to PATCH json data', async () => {
      const mockedJsonResponse = { a: 1, b: 2 };
      const mockedRequestBody = { b: 2 };

      mswServer.use(
        rest.patch(`*/${SAMPLE_ROUTE}`, (req, res, ctx) => {
          // ensure correct request configuration
          expect(req.headers.get('content-type')).toBe('application/json');
          expect(req.headers.get('accept')).toBe('application/json');
          expect(req.method.toLowerCase()).toBe('patch');
          expect(req.body).toEqual(mockedRequestBody);
          // resolve request with mock data
          return res(ctx.json(mockedJsonResponse));
        })
      );

      // ensure that the shorthand resolved with the parsed response
      const response = await patch(SAMPLE_ROUTE, mockedRequestBody);
      expect(response).toEqual(mockedJsonResponse);
    });
  });
});

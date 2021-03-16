import { rest } from 'msw';
import { AnyAction } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { getEndpointURL } from '../api/utils';
import {
  State,
  SUBMIT_PROFILE_COMPLETE,
  SUBMIT_PROFILE_PENDING,
  RECEIVED_SCENE_GROUP,
  submitProfile,
  submitProfileError,
  SUBMIT_PERSPECTIVE_PENDING,
  SUBMIT_PERSPECTIVE_COMPLETE,
  submitPerspective,
  testingDefaultState,
} from '../state';
import { ProfileResponse, Perspective, PerspectiveResponse } from '../types';

import { mswServer } from '~/../jest/msw/mswServer';

const nodeFetch = require('node-fetch');

const perspectiveResponseSample: PerspectiveResponse = require('../scheme/sample-instances/perspective-response-sample-instance.json');
const profileResponseSample: ProfileResponse = require('../scheme/sample-instances/profile-response-sample-instance.json');

type mockState = {
  KatasterKIState: State;
};
const middlewares = [thunk];
type DispatchExts = ThunkDispatch<mockState, void, AnyAction>;
const mockStore = configureMockStore<mockState, DispatchExts>(middlewares);

// the tested thunk uses fetch, so we replace its imlementation with node-fetch

// @ts-expect-error Typescript doesn't understand that lib dom defines global.fetch
const unmockedFetch = global.fetch;

describe('Survey submits', () => {
  beforeAll(() => {
    // @ts-expect-error Typescript doesn't understand that lib dom defines global.fetch
    global.fetch = nodeFetch;
  });

  afterAll(() => {
    // @ts-expect-error Typescript doesn't understand that lib dom defines global.fetch
    global.fetch = unmockedFetch;
  });

  describe('submitProfile', () => {
    it(
      'dispatches SUBMIT_PROFILE_PENDING, RECEIVED_SCENE_GROUP' +
        'and SUBMIT_PROFILE_COMPLETE',
      async () => {
        // mock api request
        mswServer.use(
          rest.put(
            getEndpointURL('profile', testingDefaultState.sessionID, null),
            (_, res, ctx) => res(ctx.json(profileResponseSample))
          )
        );

        // mock store
        const stateBefore = {
          KatasterKIState: {
            ...testingDefaultState,
          },
        };
        const store = mockStore(stateBefore);

        await store.dispatch(submitProfile());
        const dispatchedActionTypes = store
          .getActions()
          .map((dispatchedActions) => dispatchedActions.type);

        const expectedActions = [
          SUBMIT_PROFILE_PENDING,
          RECEIVED_SCENE_GROUP,
          SUBMIT_PROFILE_COMPLETE,
        ];
        expect(dispatchedActionTypes).toEqual(expectedActions);
      }
    );

    it(
      'dispatches SUBMIT_PROFILE_PENDING and SUBMIT_PROFILE_ERROR ' +
        'for invalid inputs',
      async () => {
        // mock failing api request
        mswServer.use(
          rest.put(
            getEndpointURL('profile', testingDefaultState.sessionID, null),
            (_, res, ctx) => res(ctx.json({}))
          )
        ); // kept here for safety, request should not get fired

        // mock store
        const invalidProfile = {
          ageGroup: 'BBB',
          isTosAccepted: {},
          transportRatings: {
            '': 1,
          },
          userGroup: [1, 2, 3],
          vehiclesOwned: ['car'],
          zipcode: 345,
        };
        const stateBefore = {
          KatasterKIState: {
            ...testingDefaultState,
            profile: invalidProfile,
          },
        };

        // This is supposed to be a type mismatch
        // @ts-ignore
        const store = mockStore(stateBefore);

        const dispatch = jest.fn();
        await expect(
          submitProfile()(dispatch, store.getState)
        ).rejects.toThrow();
        expect(dispatch).toHaveBeenLastCalledWith(
          submitProfileError('Das Nutzerprofil konnte nicht übertragen werden.')
        );
      }
    );
  });
  describe('submitPerspective', () => {
    it('dispatches SUBMIT_PERSPECTIVE_PENDING, RECEIVED_SCENE_GROUP and SUBMIT_PERSPECTIVE_COMPLETE', async () => {
      // mock api request
      mswServer.use(
        rest.post(
          getEndpointURL('perspective', testingDefaultState.sessionID, null),
          (_, res, ctx) => res(ctx.json(perspectiveResponseSample))
        )
      );

      const stateBefore = {
        KatasterKIState: {
          ...testingDefaultState,
        },
      };
      const store = mockStore(stateBefore);
      await store.dispatch(submitPerspective(Perspective.bicycle));
      const dispatchedActionTypes = store
        .getActions()
        .map((dispatchedActions) => dispatchedActions.type);

      const expectedActions = [
        SUBMIT_PERSPECTIVE_PENDING,
        RECEIVED_SCENE_GROUP,
        SUBMIT_PERSPECTIVE_COMPLETE,
      ];
      expect(dispatchedActionTypes).toEqual(expectedActions);
    });
  });
});

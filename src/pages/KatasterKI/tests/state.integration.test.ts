import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import {
  ProfileRequest,
  ProfileResponse,
  Perspective,
  PerspectiveRequest,
  PerspectiveResponse
} from '../types';
import { getEndpointURL } from '../api/utils';

import reducer, {
  State,
  SUBMIT_PROFILE_COMPLETE,
  SUBMIT_PROFILE_PENDING,
  RECEIVED_SCENE_GROUP,
  submitProfile,
  submitProfileError,
  SUBMIT_PERSPECTIVE_PENDING,
  SUBMIT_PERSPECTIVE_COMPLETE,
  submitPerspective,
  testingDefaultState
} from '../state';

const profileRequestSample: ProfileRequest = require('../scheme/sample-instances/profile-request-sample-instance.json');
const profileResponseSample: ProfileResponse = require('../scheme/sample-instances/profile-response-sample-instance.json');
const perspetiveRequestSample: PerspectiveRequest = require('../scheme/sample-instances/perspective-request-sample-instance.json');
const perspectiveResponseSample: PerspectiveResponse = require('../scheme/sample-instances/perspective-response-sample-instance.json');

type mockState = {
  KatasterKIState: State;
};
const middlewares = [thunk];
type DispatchExts = ThunkDispatch<mockState, void, AnyAction>;
const mockStore = configureMockStore<mockState, DispatchExts>(middlewares);

describe('submitProfile', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it(
    'dispatches SUBMIT_PROFILE_PENDING, RECEIVED_SCENE_GROUP' +
      'and SUBMIT_PROFILE_COMPLETE',
    async () => {
      // mock api request
      fetchMock.putOnce(
        getEndpointURL('profile', testingDefaultState.sessionID, null),
        profileResponseSample
      );

      // mock store
      const stateBefore = {
        KatasterKIState: {
          ...testingDefaultState
        }
      };
      const store = mockStore(stateBefore);

      await store.dispatch(submitProfile());
      const dispatchedActionTypes = store
        .getActions()
        .map((dispatchedActions) => dispatchedActions.type);

      const expectedActions = [
        SUBMIT_PROFILE_PENDING,
        RECEIVED_SCENE_GROUP,
        SUBMIT_PROFILE_COMPLETE
      ];
      expect(dispatchedActionTypes).toEqual(expectedActions);
    }
  );

  it(
    'dispatches SUBMIT_PROFILE_PENDING and SUBMIT_PROFILE_ERROR ' +
      'for invalid inputs',
    async () => {
      // mock failing api request
      fetchMock.putOnce(
        getEndpointURL('profile', testingDefaultState.sessionID, null),
        {}
      ); // kept here for savety, request should not get fired

      // mock store
      const invalidProfile = {
        ageGroup: 'BBB',
        isTosAccepted: {},
        transportRatings: {
          '': 1
        },
        userGroup: [1, 2, 3],
        vehiclesOwned: ['car'],
        zipcode: 345
      };
      const stateBefore = {
        KatasterKIState: {
          ...testingDefaultState,
          profile: invalidProfile
        }
      };

      // This is supposed to be a type mismatch
      // @ts-ignore
      const store = mockStore(stateBefore);

      const dispatch = jest.fn();
      await submitProfile()(dispatch, store.getState);
      expect(dispatch).toHaveBeenLastCalledWith(
        submitProfileError('Das Nutzerprofil konnte nicht übertragen werden.')
      );
    }
  );
});
describe('submitPerspective', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches SUBMIT_PERSPECTIVE_PENDING, RECEIVED_SCENE_GROUP and SUBMIT_PERSPECTIVE_COMPLETE', async () => {
    // mock api request
    fetchMock.postOnce(
      getEndpointURL('perspective', testingDefaultState.sessionID, null),
      perspectiveResponseSample
    );

    const stateBefore = {
      KatasterKIState: {
        ...testingDefaultState
      }
    };
    const store = mockStore(stateBefore);
    await store.dispatch(submitPerspective(Perspective.bicycle));
    const dispatchedActionTypes = store
      .getActions()
      .map((dispatchedActions) => dispatchedActions.type);

    const expectedActions = [
      SUBMIT_PERSPECTIVE_PENDING,
      RECEIVED_SCENE_GROUP,
      SUBMIT_PERSPECTIVE_COMPLETE
    ];
    expect(dispatchedActionTypes).toEqual(expectedActions);
  });
});

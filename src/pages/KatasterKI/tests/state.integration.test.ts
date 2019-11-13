import { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import {
  ProfileRequest,
  ProfileResponse,
  TransportRating,
  UserGroup,
  Perspective,
  PerspectiveRequest,
  PerspectiveResponse
} from '../types';
import { getEndpointURL } from '../utils';

import {
  State,
  SUBMIT_PROFILE_COMPLETE,
  SUBMIT_PROFILE_ERROR,
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
    () => {
      // mock api request
      fetchMock.postOnce(getEndpointURL('profile'), profileResponseSample);

      // mock store
      const stateBefore = {
        KatasterKIState: {
          ...testingDefaultState
        }
      };
      const store = mockStore(stateBefore);
      const expectedActions = [
        SUBMIT_PROFILE_PENDING,
        RECEIVED_SCENE_GROUP,
        SUBMIT_PROFILE_COMPLETE
      ];

      return store.dispatch(submitProfile()).then(() => {
        // test action sequence
        expect(
          store.getActions().map((dispatchedActions) => dispatchedActions.type)
        ).toEqual(expectedActions);

        // test reducer TODO
      });
    }
  );

  it(
    'dispatches SUBMIT_PROFILE_PENDING and SUBMIT_PROFILE_ERROR ' +
      'for invalid inputs',
    async () => {
      // mock failing api request
      fetchMock.postOnce(getEndpointURL('profile'), {}); // kept here for savety, request should not get fired

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

      // This is supposed to be a mismatch
      // @ts-ignore
      const store = mockStore(stateBefore);

      const dispatch = jest.fn();
      await submitProfile()(dispatch, store.getState);
      expect(dispatch).toHaveBeenLastCalledWith(
        submitProfileError(
          'Beim Übermitteln des Profils ist etwas schiefgelaufen'
        )
      );
    }
  );
});
describe('submitPerspective', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches SUBMIT_PERSPECTIVE_PENDING, RECEIVED_SCENE_GROUP and SUBMIT_PERSPECTIVE_COMPLETE', () => {
    // mock api request
    fetchMock.postOnce(
      getEndpointURL('perspective'),
      perspectiveResponseSample
    );

    // mock store
    const stateBefore = {
      KatasterKIState: {
        ...testingDefaultState
      }
    };
    const store = mockStore(stateBefore);
    const expectedActions = [
      SUBMIT_PERSPECTIVE_PENDING,
      RECEIVED_SCENE_GROUP,
      SUBMIT_PERSPECTIVE_COMPLETE
    ];

    return store.dispatch(submitPerspective(Perspective.bicycle)).then(() => {
      // test action sequence
      expect(
        store.getActions().map((dispatchedActions) => dispatchedActions.type)
      ).toEqual(expectedActions);

      // test reducer TODO
    });
  });
});

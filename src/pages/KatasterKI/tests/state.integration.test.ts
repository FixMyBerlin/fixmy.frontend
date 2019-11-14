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
  PerspectiveResponse,
  TransportMode
} from '../types';
import { getEndpointURL } from '../api/utils';

import reducer, {
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
  testingDefaultState,
  productionDefaultState,
  setTOSAccepted,
  setProfileAnswer,
  setTransportRating,
  setZipcode,
  SET_TOS_ACCEPTED,
  SET_PROFILE_ANSWER,
  SET_TRANSPORT_RATING,
  SET_ZIPCODE,
  updateProgressBar,
  UPDATE_PROGRESS_BAR
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
      const sessionId = 'session-id';
      fetchMock.postOnce(
        getEndpointURL('profile', sessionId, null),
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
      const sessionId = 'session-id';
      fetchMock.postOnce(getEndpointURL('profile', sessionId, null), {}); // kept here for savety, request should not get fired

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

  it('dispatches SUBMIT_PERSPECTIVE_PENDING, RECEIVED_SCENE_GROUP and SUBMIT_PERSPECTIVE_COMPLETE', async () => {
    // mock api request
    const sessionId = 'session-id';
    fetchMock.postOnce(
      getEndpointURL('perspective', sessionId, null),
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
describe('Profile section', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Submits a profile to the backend after completing all questions', async () => {
    // mock api request
    const sessionId = 'session-id';
    fetchMock.postOnce(
      getEndpointURL('profile', sessionId, null),
      profileResponseSample
    );

    // mock store
    const stateBefore = {
      KatasterKIState: {
        ...productionDefaultState
      }
    };
    const store = mockStore(stateBefore);
    const expectedActions = [
      SET_TOS_ACCEPTED,
      UPDATE_PROGRESS_BAR,
      SET_PROFILE_ANSWER,
      SET_TRANSPORT_RATING,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_PROFILE_ANSWER,
      SET_ZIPCODE,
      SET_ZIPCODE,
      SET_ZIPCODE,
      SET_ZIPCODE,
      SET_ZIPCODE,
      SET_PROFILE_ANSWER,
      SUBMIT_PROFILE_PENDING,
      RECEIVED_SCENE_GROUP,
      SUBMIT_PROFILE_COMPLETE
    ];

    // Update progress bar omitted
    store.dispatch(setTOSAccepted(true));
    store.dispatch(updateProgressBar(12, 13));
    store.dispatch(setProfileAnswer('berlinTraffic', 3));
    store.dispatch(setTransportRating(TransportMode.car, 5));
    store.dispatch(setProfileAnswer('ageGroup', 7));
    store.dispatch(setProfileAnswer('hasChildren', false));
    store.dispatch(setProfileAnswer('gender', 'd'));
    store.dispatch(setProfileAnswer('vehiclesOwned', { car: true }));
    store.dispatch(setProfileAnswer('bicycleUse', 5));
    store.dispatch(setProfileAnswer('motivationalFactors', { bikefun: 1 }));
    store.dispatch(setProfileAnswer('bikeReasons', { 8: true }));
    store.dispatch(
      setProfileAnswer('bikeReasons', { 8: true, '8-input': 'test' })
    );
    store.dispatch(setZipcode('1', ''));
    store.dispatch(setZipcode('10', ''));
    store.dispatch(setZipcode('105', ''));
    store.dispatch(setZipcode('1055', ''));
    store.dispatch(setZipcode('10553', ''));
    store.dispatch(setProfileAnswer('whyBiking', { safety: true }));
    await store.dispatch(submitProfile());

    const dispatchedActions = store.getActions();
    expect(dispatchedActions.map((action) => action.type)).toEqual(
      expectedActions
    );
  });
});

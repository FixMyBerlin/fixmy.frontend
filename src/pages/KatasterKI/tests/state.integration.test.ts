import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { ProfileRequest, ProfileResponse, TransportRating, UserGroup } from '../types';

import { profilesEndpointUrl } from '../apiService';
import { SUBMIT_PROFILE_COMPLETE, SUBMIT_PROFILE_ERROR, SUBMIT_PROFILE_PENDING, submitProfile, submitProfileError } from '../state';

const profileRequestSample: ProfileRequest = require('../scheme/sample-instances/profile-request-sample-instance.json');
const profileResponseSample: ProfileResponse = require('../scheme/sample-instances/profile-response-sample-instance.json');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// util function to prepare a state that utils.marshallProfileForUpload accepts as valid
const getBaseState = () => ({
  // the profile is set in the individual test
  profile: null,
  // additional state data needed
  userGroup: UserGroup.bicycle,
  transportRatings: {mode: TransportRating.never},
  isAgbAccepted: true
})

describe('Kataster state', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('dispatches SUBMIT_PROFILE_PENDING and SUBMIT_PROFILE_COMPLETE ' +
    'during the submit of a valid ProfileRequest', () => {
    // mock api request
    fetchMock.postOnce(profilesEndpointUrl, profileResponseSample);

    // mock store
    const stateBefore = {
      ...getBaseState(),
      profile: profileRequestSample
    };
    const store = mockStore(stateBefore);
    const expectedActions = [SUBMIT_PROFILE_PENDING, SUBMIT_PROFILE_COMPLETE];

    return store.dispatch(submitProfile()).then(() => {
      // test action sequence
      expect(
        store.getActions().map(dispatchedActions => dispatchedActions.type)
      ).toEqual(expectedActions);


      // test reducer TODO

    });
  });

  it('dispatches SUBMIT_PROFILE_PENDING and SUBMIT_PROFILE_ERROR ' +
    'during the submit of an invalid ProfileRequest', async () => {
    // mock failing api request
    fetchMock.postOnce(profilesEndpointUrl, {}); // kept here for savety, request should not get fired

    // mock store
    const invalidProfile = {
      ageGroup: 'BBB',
      isAgbAccepted: {},
      transportRatings: {
        '': 1
      },
      userGroup: [1, 2, 3],
      vehiclesOwned: ['car'],
      zipcode: 345
    };
    const stateBefore = {
      ...getBaseState(),
      profile: invalidProfile
    };
    const store = mockStore(stateBefore);

    const dispatch = jest.fn();
    await submitProfile()(dispatch, store.getState)
    expect(dispatch).toHaveBeenLastCalledWith(
      submitProfileError('Beim Übermitteln des Profils ist etwas schiefgelaufen')
    );
  });
});


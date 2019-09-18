
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import reducer, { types, actions, initialState } from '../SubmitReportState';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('overviewMapState reducer', () => {

  it('returs the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
      .toMatchObject(initialState);
  });

});

import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HTTPError } from 'ky';

import reducer, { types, actions } from '../OverviewMapState';
import { types as errorStateTypes } from '../ErrorState';
import { reportsEndpointUrl } from '~/pages/Reports/apiservice';
import reportSample from './mocks/reportsSample';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  reports: [],
  selectedReport: null,
  selectedReportPosition: { x: 0, y: 0 }
};

describe('overviewMapState reducer', () => {
  it('returs the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
      .toMatchObject(initialState);
  });

  it('sets the position of a selected report', () => {
    const pixelPositxion = { x: 50, y: 100 };
    expect(reducer({}, actions.setSelectedReportPosition(pixelPositxion)))
      .toEqual(
        {
          selectedReportPosition: pixelPositxion
        }
      );
  });

  it('sets the selectedReport', () => { });

  describe('async actions', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    const mockedReportsData = reportSample.slice(0, 5);

    it('fetches reports and creates REPORTS_FETCH_COMPLETE', () => {
      // set up mocked api response
      fetchMock.getOnce(reportsEndpointUrl, {
        body: mockedReportsData,
        headers: { 'content-type': 'application/json' }
      });
      const expectedActions = [
        { type: types.REPORTS_FETCH_PENDING },
        {
          type: types.REPORTS_FETCH_COMPLETE,
          payload: mockedReportsData
        }
      ];
      const store = mockStore({});
      return store.dispatch(actions.loadReportsData()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('fails to fetch reports and creates ADD_ERROR', () => {
      fetchMock.getOnce(reportsEndpointUrl, { throws: new HTTPError('some error') });
      const expectedActionTypes = [ // do not mind the action payloads here
        types.REPORTS_FETCH_PENDING,
        errorStateTypes.ADD_ERROR
      ];
      const store = mockStore({});
      return store.dispatch(actions.loadReportsData()).then(() => {
        expect(
          store.getActions()
            .map(action => action.type)
        )
        .toEqual(expectedActionTypes);
      });
    });
  });
});

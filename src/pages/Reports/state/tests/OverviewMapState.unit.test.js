import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HTTPError } from 'ky';

import reducer, { types, actions, initialState } from '../OverviewMapState';
import { types as errorStateTypes } from '../ErrorState';
import { reportsEndpointUrl } from '~/pages/Reports/apiservice';
import reportSample from './mocks/reportsSample';

// mocking
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockedReportsData = reportSample.slice(0, 5);
const mockFetchReports = () => {
  fetchMock.getOnce(reportsEndpointUrl, {
    body: mockedReportsData,
    headers: { 'content-type': 'application/json' }
  });
};

describe('OverviewMapState reducer and actions', () => {
  it('returs the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
      .toMatchObject(initialState);
  });

  it('sets the popup display position of a selected report', () => {
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


    mockFetchReports();
    it('fetches reports and creates REPORTS_FETCH_COMPLETE', () => {
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
      console.error = jest.fn(); // mute provoked console.error

      fetchMock.getOnce(reportsEndpointUrl, { throws: new HTTPError('some error') });
      const expectedActionTypes = [ // do not mind the action payloads here
        types.REPORTS_FETCH_PENDING,
        errorStateTypes.ADD_ERROR
      ];
      const store = mockStore({});
      return store.dispatch(actions.loadReportsData())
      .then(() => {
        expect(store.getActions().map(action => action.type))
        .toEqual(expectedActionTypes);
      });
    });

    it('sets the selectedReport if reports have been fetched already', () => {
      const reportItem = { some: 'content' };
      const expectedActions = [{
        type: types.SET_SELECTED_REPORT,
        payload: reportItem
      }];

      const store = mockStore({
        ReportsState: {
          OverviewMapState: {
            reports: [reportItem]
          }
        }
      });
      return store.dispatch(actions.setSelectedReport(reportItem))
      .then(() => {
        expect(store.getActions())
        .toEqual(expectedActions);
      });
    });

    it('sets the selectedReport and - if no reports have been fetched yet - fetches the reports before', () => {
      const reportItem = { some: 'other content' };
      const expectedActionTypes = [
        types.REPORTS_FETCH_PENDING,
        types.REPORTS_FETCH_COMPLETE,
        types.SET_SELECTED_REPORT
      ];

      mockFetchReports();
      const store = mockStore({
        ReportsState: {
          OverviewMapState: {
            reports: []
          }
        }
      });
      return store.dispatch(actions.setSelectedReport(reportItem))
      .then(() => {
        expect(store.getActions().map(action => action.type))
        .toEqual(expectedActionTypes);
      });
    });
  });
});

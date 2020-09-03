import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';

import reducer, { actions, types } from '../OverviewMapState';
import reportsInitialState from '../initialState';
import { types as errorStateTypes } from '../ErrorState';
import { reportsEndpointUrl } from '~/pages/Reports/apiservice';
import reportSample from './mocks/reportsSample';
import { formatActionType } from '~/utils/test-utils';
import { mswServer } from '../../../../../jest/msw/mswServer';

// mock redux store
const mockStore = configureMockStore([thunk]);
const initialState = reportsInitialState.OverviewMapState;

// intercept requests and mock responses
const mockedReportsList = reportSample.slice(0, 5);
const mockFetchReports = () => {
  mswServer.use(
    rest.get(reportsEndpointUrl, (_, res, ctx) =>
      res(ctx.json(mockedReportsList))
    )
  );
};

describe('OverviewMapState reducer and actions', () => {
  test('returns the initial state for an empty action', () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  test('sets the popup display position of a selected report', () => {
    const stateBefore = {
      reports: mockedReportsList,
      selectedReport: mockedReportsList[0]
    };
    const pixelPositxion = { x: 50, y: 100 };
    expect(
      reducer(stateBefore, actions.setSelectedReportPosition(pixelPositxion))
    ).toEqual({
      ...stateBefore,
      selectedReportPosition: pixelPositxion
    });
  });

  test('resets the map state', () => {
    const stateBefore = {
      reports: mockedReportsList,
      selectedReport: mockedReportsList[1],
      selectedReportPosition: {
        x: 180.01016568411143,
        y: 319.9945452428112
      }
    };
    expect(reducer(stateBefore, actions.resetMapState())).toEqual(initialState);
  });

  describe('async actions', () => {
    it(`fetches reports and creates ${formatActionType(
      types.REPORTS_FETCH_COMPLETE
    )}`, () => {
      mockFetchReports();
      const expectedActions = [
        { type: types.REPORTS_FETCH_PENDING },
        {
          type: types.REPORTS_FETCH_COMPLETE,
          payload: mockedReportsList
        }
      ];
      const store = mockStore({});
      return store.dispatch(actions.loadReportsData()).then(() => {
        // test action sequence
        expect(store.getActions()).toEqual(expectedActions);

        // test reducer
        expect(
          reducer(initialState, {
            type: types.REPORTS_FETCH_COMPLETE,
            payload: mockedReportsList
          })
        ).toEqual({
          ...initialState,
          reports: mockedReportsList
        });
      });
    });

    test(`fails to fetch reports and creates ${formatActionType(
      errorStateTypes.ADD_ERROR
    )}`, () => {
      mswServer.use(
        rest.get(reportsEndpointUrl, (_, res) => res.networkError('some error'))
      );
      const expectedActionTypes = [
        // do not mind the action payloads here
        types.REPORTS_FETCH_PENDING,
        errorStateTypes.ADD_ERROR
      ];
      const store = mockStore({});
      return store.dispatch(actions.loadReportsData()).then(() => {
        // only test action sequence
        expect(store.getActions().map((action) => action.type)).toEqual(
          expectedActionTypes
        );
      });
    });

    test('sets the selectedReport if reports have been fetched already', () => {
      const reportItem = mockedReportsList[0];
      const expectedActions = [
        {
          type: types.SET_SELECTED_REPORT,
          payload: {
            selectedReport: reportItem,
            zoomIn: false
          }
        }
      ];

      const stateBefore = {
        ReportsState: {
          OverviewMapState: {
            reports: mockedReportsList,
            zoomIn: false
          }
        }
      };
      const store = mockStore(stateBefore);

      return store.dispatch(actions.setSelectedReport(reportItem)).then(() => {
        // test action sequence
        expect(store.getActions()).toEqual(expectedActions);

        // test reducer
        const overviewMapStateBefore =
          stateBefore.ReportsState.OverviewMapState;
        expect(reducer(overviewMapStateBefore, expectedActions[0])).toEqual({
          ...overviewMapStateBefore,
          selectedReport: reportItem,
          zoomIn: false
        });
      });
    });

    test('handles setSelectedReport with an additional zoomIn flag', () => {
      const reportItem = mockedReportsList[0];
      const expectedActions = [
        {
          type: types.SET_SELECTED_REPORT,
          payload: {
            selectedReport: reportItem,
            zoomIn: true
          }
        }
      ];

      const stateBefore = {
        ReportsState: {
          OverviewMapState: {
            reports: mockedReportsList,
            zoomIn: false
          }
        }
      };
      const store = mockStore(stateBefore);

      return store
        .dispatch(actions.setSelectedReport(reportItem, true))
        .then(() => {
          // test action sequence
          expect(store.getActions()).toEqual(expectedActions);

          // test reducer
          const overviewMapStateBefore =
            stateBefore.ReportsState.OverviewMapState;
          expect(reducer(overviewMapStateBefore, expectedActions[0])).toEqual({
            ...overviewMapStateBefore,
            selectedReport: reportItem,
            zoomIn: true
          });
        });
    });

    it(
      'sets the selectedReport and - if no reports have been fetched yet - ' +
        'fetches the reports before',
      () => {
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
        return store
          .dispatch(actions.setSelectedReport(reportItem))
          .then(() => {
            // only test action sequence
            expect(store.getActions().map((action) => action.type)).toEqual(
              expectedActionTypes
            );
          });
      }
    );
  });
});

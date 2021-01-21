import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import debug from 'debug';

import reducer, {
  actions,
  types,
  FETCH_STATE_PENDING,
  FETCH_STATE_SUCCESS,
} from '../OverviewMapState';
import reportsInitialState from '../initialState';
import { types as errorStateTypes } from '../ErrorState';
import { reportsEndpointUrl } from '~/pages/Reports/apiservice';
import reportSample from './mocks/reportsSample';
import { formatActionType as ft } from '~/utils/test-utils';
import { mswServer } from '../../../../../jest/msw/mswServer';

const mswLogger = debug('fmc:reports:msw');

// mock redux store
const mockStore = configureMockStore([thunk]);
const initialState = reportsInitialState.OverviewMapState;

// intercept requests and mock responses
const mockedReportsList = reportSample.slice(0, 5);
const interceptFetchReports = () => {
  mswLogger(`Intercepting ${reportsEndpointUrl}`);
  mswServer.use(
    rest.get(reportsEndpointUrl, (_, res, ctx) =>
      res(ctx.json(mockedReportsList))
    )
  );
};

describe('OverviewMapState reducer and actions', () => {
  it('returns the initial state for an empty action', () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  it('sets the popup display position of a selected report', () => {
    const stateBefore = {
      reports: mockedReportsList,
      selectedReport: mockedReportsList[0],
    };
    const pixelPositxion = { x: 50, y: 100 };

    const newState = reducer(
      stateBefore,
      actions.setSelectedReportPosition(pixelPositxion)
    );

    expect(newState).toEqual({
      ...stateBefore,
      selectedReportPosition: pixelPositxion,
    });
  });

  it('resets the map state', () => {
    const stateBefore = {
      reports: mockedReportsList,
      selectedReport: mockedReportsList[1],
      selectedReportPosition: {
        x: 180.01016568411143,
        y: 319.9945452428112,
      },
    };
    const newState = reducer(stateBefore, actions.resetMapState());

    expect(newState).toEqual(initialState);
  });

  it('sets the hovered report', () => {
    expect(
      reducer({}, actions.setHoveredReport(reportSample)).hoveredReport
    ).toEqual(reportSample);
  });

  it('*un*sets the hovered report', () => {
    expect(
      reducer({}, actions.unSetHoveredReport(reportSample)).hoveredReport
    ).toEqual(null);
  });

  describe('async actions', () => {
    it(`fetches reports and creates ${ft(
      types.REPORTS_FETCH_COMPLETE
    )}`, async () => {
      /* ARRANGE: mock store, intercept requests and respond with mock data */
      const store = mockStore({});
      interceptFetchReports();

      /* ACT: dispatch thunk */
      const loadReportsThunk = actions.loadReportsData();
      await store.dispatch(loadReportsThunk);

      /* ASSERT: make sure thunk dispatched the right action sequence and
                 the reducer produced the right state */
      const expectedActions = [
        { type: types.REPORTS_FETCH_PENDING },
        {
          type: types.REPORTS_FETCH_COMPLETE,
          payload: mockedReportsList,
        },
      ];
      const expectedNewState = {
        ...initialState,
        reportFetchState: 'success',
        reports: mockedReportsList,
      };

      const actualState = reducer(initialState, {
        type: types.REPORTS_FETCH_COMPLETE,
        payload: mockedReportsList,
      });

      const actualActions = store.getActions();

      expect(actualActions).toEqual(expectedActions);
      expect(actualState).toEqual(expectedNewState);
    });

    it(`fails to fetch reports and creates ${ft(
      errorStateTypes.ADD_ERROR
    )}`, async () => {
      /* ARRANGE: mock store, intercept requests and respond with mock data */
      const store = mockStore({});
      mswServer.use(
        rest.get(reportsEndpointUrl, (_, res) => res.networkError('some error'))
      );
      const expectedActionTypes = [
        // do not mind the action payloads here
        types.REPORTS_FETCH_PENDING,
        types.REPORTS_FETCH_ERROR,
        errorStateTypes.ADD_ERROR,
      ];

      /* ACT: dispatch thunk */
      const loadReportsThunk = actions.loadReportsData();
      await store.dispatch(loadReportsThunk);

      // ASSERT: only test action sequence (how the error state looks like is not our concern here
      const actualActionTypes = store.getActions().map((action) => action.type);

      expect(actualActionTypes).toEqual(expectedActionTypes);
    });

    it('sets the selectedReport if reports have been fetched already', async () => {
      /* ARRANGE: mock store with initial reports data */
      const stateBefore = {
        ReportsState: {
          OverviewMapState: {
            reports: mockedReportsList,
            reportFetchState: FETCH_STATE_SUCCESS,
            zoomIn: false,
          },
        },
      };
      const overviewMapStateBefore = stateBefore.ReportsState.OverviewMapState;
      const store = mockStore(stateBefore);

      /* ACT: dispatch thunk */
      const reportItem = mockedReportsList[0];
      const loadReportsThunk = actions.setSelectedReport(reportItem.id);
      await store.dispatch(loadReportsThunk);

      /* ASSERT: make sure thunk dispatched the right action sequence and
                  the reducer produced the right state */
      const expectedActions = [
        {
          type: types.SET_SELECTED_REPORT,
          payload: {
            selectedReport: reportItem,
            zoomIn: false,
          },
        },
      ];
      const expectedState = {
        ...overviewMapStateBefore,
        selectedReport: reportItem,
        zoomIn: false,
      };

      const actualActions = store.getActions();
      const actualState = reducer(overviewMapStateBefore, expectedActions[0]);

      expect(actualActions).toEqual(expectedActions);
      expect(actualState).toEqual(expectedState);
    });

    it('handles setSelectedReport with an additional zoomIn flag', async () => {
      /* ARRANGE: mock store with initial reports data */
      const stateBefore = {
        ReportsState: {
          OverviewMapState: {
            reports: mockedReportsList,
            reportFetchState: FETCH_STATE_SUCCESS,
            zoomIn: false,
          },
        },
      };
      const overviewMapStateBefore = stateBefore.ReportsState.OverviewMapState;
      const store = mockStore(stateBefore);

      /* ACT: dispatch thunk */
      const reportItem = mockedReportsList[0];
      const setSelectedReportThunk = actions.setSelectedReport(
        reportItem.id,
        true
      );
      await store.dispatch(setSelectedReportThunk);

      /* ASSERT: make sure thunk dispatched the right action sequence and
                  the reducer produced the right state */
      const expectedActions = [
        {
          type: types.SET_SELECTED_REPORT,
          payload: {
            selectedReport: reportItem,
            zoomIn: true,
          },
        },
      ];
      const expectedState = {
        ...overviewMapStateBefore,
        selectedReport: reportItem,
        zoomIn: true,
      };

      const actualActions = store.getActions();
      const actualState = reducer(overviewMapStateBefore, expectedActions[0]);

      expect(actualActions).toEqual(expectedActions);
      expect(actualState).toEqual(expectedState);
    });

    it(
      'sets the selectedReport and - if no reports have been fetched yet - ' +
        'fetches the reports beforehand',
      async () => {
        /* ARRANGE: mock store with initial data, intercept requests and respond with mock data */
        const store = mockStore({
          ReportsState: {
            OverviewMapState: {
              reports: [],
              reportFetchState: FETCH_STATE_PENDING,
            },
          },
        });
        interceptFetchReports();

        /* ACT: dispatch thunk */
        const reportItem = mockedReportsList[0];
        await store.dispatch(actions.setSelectedReport(reportItem.id));

        /* ASSERT: make sure thunk dispatched the right action sequence and
                 the reducer produced the right state */
        const expectedActionTypes = [
          types.REPORTS_FETCH_PENDING,
          types.REPORTS_FETCH_COMPLETE,
          types.SET_SELECTED_REPORT,
        ];

        // only test action sequence (reducer is already covered in other tests)
        const actualActionTypes = store
          .getActions()
          .map((action) => action.type);
        expect(actualActionTypes).toEqual(expectedActionTypes);
      }
    );

    it('handles selecting a report that does not exist', async () => {
      const stateBefore = {
        ReportsState: {
          OverviewMapState: {
            reports: mockedReportsList,
            reportFetchState: FETCH_STATE_SUCCESS,
          },
        },
      };
      const overviewMapStateBefore = stateBefore.ReportsState.OverviewMapState;
      const store = mockStore(stateBefore);

      /* ACT: dispatch thunk */
      const invalidReportId = 200;
      expect(
        mockedReportsList.map((r) => r.id).includes(invalidReportId)
      ).toBeFalsy();

      const setSelectedReportThunk = actions.setSelectedReport(
        invalidReportId,
        true
      );
      await store.dispatch(setSelectedReportThunk);

      /* ASSERT: make sure thunk dispatched the right action sequence and
                  the reducer produced the right state */
      const expectedActions = [];
      const expectedState = overviewMapStateBefore;

      const actualActions = store.getActions();
      const actualState = reducer(overviewMapStateBefore, expectedActions[0]);

      expect(actualActions).toEqual(expectedActions);
      expect(actualState).toEqual(expectedState);
    });
  });
});

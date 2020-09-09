import debug from 'debug';
import { apiFetchReports } from '../apiservice';
import { actions as errorStateActions } from './ErrorState';
import initialState from './initialState';

const logger = debug('fmc:reports');

const actions = {};
const types = {};

// action types

types.REPORTS_FETCH_PENDING = 'Reports/OverviewMapState/REPORTS_FETCH_PENDING';
types.REPORTS_FETCH_ERROR = 'Reports/OverviewMapState/REPORTS_FETCH_ERROR';
types.REPORTS_FETCH_COMPLETE =
  'Reports/OverviewMapState/REPORTS_FETCH_COMPLETE';
types.SET_SELECTED_REPORT = 'Reports/OverviewMapState/SET_SELECTED_REPORT';
types.SET_SELECTED_REPORT_POS =
  'Reports/OverviewMapState/SET_SELECTED_REPORT_POS';
types.RESET_MAP_STATE = 'Reports/OverviewMapState/RESET_MAP_STATE';

// action creators

actions.setSelectedReportPosition = ({ x = 0, y = 0 }) => ({
  type: types.SET_SELECTED_REPORT_POS,
  payload: { x, y }
});

actions.resetMapState = () => ({
  type: types.RESET_MAP_STATE
});

// thunks

async function loadReportsThunk(dispatch) {
  logger('Loading reports...');
  try {
    dispatch({ type: types.REPORTS_FETCH_PENDING });
    const reportData = await apiFetchReports();
    dispatch({ type: types.REPORTS_FETCH_COMPLETE, payload: reportData });
  } catch (e) {
    dispatch({ type: types.REPORTS_FETCH_ERROR });
    const message = 'Fehler beim Laden der Meldungen';
    logger(`${message}: \n%O`, e);
    dispatch(
      errorStateActions.addError({
        message
      })
    );
  }
}

actions.loadReportsData = () => async (dispatch) => {
  await loadReportsThunk(dispatch);
};

actions.setSelectedReport = (selectedReport, zoomIn) => async (
  dispatch,
  getState
) => {
  const {
    reports,
    reportFetchState
  } = getState().ReportsState.OverviewMapState;

  if (!reports.length && reportFetchState !== 'pending') {
    logger(reportFetchState);
    await loadReportsThunk(dispatch);
  }

  dispatch({
    type: types.SET_SELECTED_REPORT,
    payload: {
      selectedReport: selectedReport || null,
      zoomIn: zoomIn || false
    }
  });
};

// reducer

function reducer(
  state = initialState.OverviewMapState,
  { type, payload } = {}
) {
  switch (type) {
    case types.RESET_MAP_STATE: {
      return initialState.OverviewMapState;
    }
    case types.REPORTS_FETCH_PENDING:
      return { ...state, reportFetchState: 'pending' };
    case types.REPORTS_FETCH_ERROR:
      return { ...state, reportFetchState: 'error' };
    case types.REPORTS_FETCH_COMPLETE:
      return { ...state, reports: payload, reportFetchState: 'success' };
    case types.SET_SELECTED_REPORT:
      return {
        ...state,
        ...payload
      };
    case types.SET_SELECTED_REPORT_POS:
      return {
        ...state,
        selectedReportPosition: payload
      };
    default:
      return state;
  }
}

export { actions, types, initialState };

export default reducer;

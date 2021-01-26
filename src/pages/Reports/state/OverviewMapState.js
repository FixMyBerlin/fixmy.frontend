import debug from 'debug';
import { createSelector } from 'reselect';
import { apiFetchReports } from '../apiservice';
import * as linkService from '../components/LinkLayer/linkService';
import { actions as errorStateActions } from './ErrorState';
import initialState from './initialState';

const logger = debug('fmc:reports:OverviewMapState');

const actions = {};
const types = {};

// constants

export const FETCH_STATE_WAITING = 'waiting';
export const FETCH_STATE_PENDING = 'pending';
export const FETCH_STATE_SUCCESS = 'success';
export const FETCH_STATE_ERROR = 'error';

// action types

types.REPORTS_FETCH_PENDING = 'Reports/OverviewMapState/REPORTS_FETCH_PENDING';
types.REPORTS_FETCH_ERROR = 'Reports/OverviewMapState/REPORTS_FETCH_ERROR';
types.REPORTS_FETCH_COMPLETE =
  'Reports/OverviewMapState/REPORTS_FETCH_COMPLETE';
types.SET_SELECTED_REPORT = 'Reports/OverviewMapState/SET_SELECTED_REPORT';
types.SET_HOVERED_REPORT = 'Reports/OverviewMapState/SET_HOVERED_REPORT';
types.UNSET_HOVERED_REPORT = 'Reports/OverviewMapState/UNSET_HOVERED_REPORT';
types.SET_SELECTED_REPORT_POS =
  'Reports/OverviewMapState/SET_SELECTED_REPORT_POS';
types.RESET_MAP_STATE = 'Reports/OverviewMapState/RESET_MAP_STATE';

// action creators

actions.setSelectedReportPosition = ({ x = 0, y = 0 }) => ({
  type: types.SET_SELECTED_REPORT_POS,
  payload: { x, y },
});

actions.resetMapState = () => ({
  type: types.RESET_MAP_STATE,
});

actions.setHoveredReport = (report) => ({
  type: types.SET_HOVERED_REPORT,
  payload: report,
});

actions.unSetHoveredReport = () => ({
  type: types.UNSET_HOVERED_REPORT,
});

// thunks

async function loadReportsThunk(dispatch) {
  logger('Loading reports...');
  let reportData = null;
  try {
    dispatch({ type: types.REPORTS_FETCH_PENDING });
    reportData = await apiFetchReports();
    dispatch({ type: types.REPORTS_FETCH_COMPLETE, payload: reportData });
    logger(`${reportData.length} reports loaded`);
  } catch (e) {
    dispatch({ type: types.REPORTS_FETCH_ERROR });
    const message = 'Fehler beim Laden der Meldungen';
    logger(`${message}: \n%O`, e);
    dispatch(
      errorStateActions.addError({
        message,
      })
    );
  }
  return reportData;
}

actions.loadReportsData = () => async (dispatch) => {
  await loadReportsThunk(dispatch);
};

actions.setSelectedReport = (selectedReportId, zoomIn = false) => async (
  dispatch,
  getState
) => {
  let selectedReport = null;
  let reports;

  if (selectedReportId != null) {
    logger(`setting selected report ${selectedReportId}`);

    const mapState = getState().ReportsState.OverviewMapState;
    // Load report list unless it has already been loaded
    if (mapState.reportFetchState === FETCH_STATE_SUCCESS) {
      reports = mapState.reports;
    } else {
      // fall back to empty list if loadReportsThunk fails
      reports = (await loadReportsThunk(dispatch)) || [];
    }

    selectedReport = reports.find(
      (report) => report.id === parseInt(selectedReportId, 10)
    );
    if (selectedReport == null) {
      logger('selected report is not available');
      return;
    }
  } else {
    logger('reset selected report');
  }

  dispatch({
    type: types.SET_SELECTED_REPORT,
    payload: {
      selectedReport,
      zoomIn,
    },
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
      return { ...state, reportFetchState: FETCH_STATE_PENDING };
    case types.REPORTS_FETCH_ERROR:
      return { ...state, reportFetchState: FETCH_STATE_ERROR };
    case types.REPORTS_FETCH_COMPLETE:
      return {
        ...state,
        reports: payload,
        reportFetchState: FETCH_STATE_SUCCESS,
      };
    case types.SET_SELECTED_REPORT:
      return {
        ...state,
        ...payload,
      };
    case types.SET_SELECTED_REPORT_POS:
      return {
        ...state,
        selectedReportPosition: payload,
      };
    case types.SET_HOVERED_REPORT:
      return {
        ...state,
        hoveredReport: payload,
      };
    case types.UNSET_HOVERED_REPORT:
      return {
        ...state,
        hoveredReport: null,
      };

    default:
      return state;
  }
}

const selectors = {};

const selectSelectedReport = (reportState) => reportState.selectedReport;
const selectHoveredReport = (reportState) => reportState.hoveredReport;

/**
 * Gets selected and/or hovered reports.
 */
const selectReportsOfInterest = createSelector(
  selectSelectedReport,
  selectHoveredReport,
  (selectedReport, hoveredReport) => {
    const reportsToConstructDataFor = [];
    if (selectedReport) {
      reportsToConstructDataFor.push(selectedReport);
    }
    if (
      hoveredReport &&
      // do not generate duplicate links for a selectedReport being hovered
      selectedReport !== hoveredReport
    ) {
      reportsToConstructDataFor.push(hoveredReport);
    }
    return reportsToConstructDataFor;
  }
);

/**
 * Select currently visible link layer geometries
 */
selectors.selectLinkLayerGeometries = createSelector(
  selectReportsOfInterest,
  (reports) => {
    const arcData = reports.flatMap(linkService.getLinks);
    return linkService.getFeatureCollection(arcData);
  }
);

export { actions, types, initialState, selectors };

export default reducer;

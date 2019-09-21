/* eslint-disable no-use-before-define */
import { apiFetchReports } from '../apiservice';
import { actions as errorStateActions } from './ErrorState';

const actions = {};
const types = {};

// action types

types.REPORTS_FETCH_PENDING = 'Reports/OverviewMapState/REPORTS_FETCH_PENDING';
types.REPORTS_FETCH_COMPLETE = 'Reports/OverviewMapState/REPORTS_FETCH_COMPLETE';
types.SET_SELECTED_REPORT = 'Reports/OverviewMapState/SET_SELECTED_REPORT';
types.SET_SELECTED_REPORT_POS = 'Reports/OverviewMapState/SET_SELECTED_REPORT_POS';
// TODO: ReportState.js had an action called UNSET_SELECTED_REPORT, for which I did not find a consumption. make sure that omitting the action is OK

// action creators

actions.setSelectedReportPosition = ({ x = 0, y = 0 }) => ({
  type: types.SET_SELECTED_REPORT_POS,
  payload: { x, y }
});

// thunks

actions.loadReportsData = () => async (dispatch) => {
  await loadReportsThunk(dispatch);
};

actions.setSelectedReport = selectedReport => async (dispatch, getState) => {
  const { reports } = getState().ReportsState.OverviewMapState;

  if (!reports.length) {
    await loadReportsThunk(dispatch);
  }

  dispatch({
    type: types.SET_SELECTED_REPORT,
    payload: selectedReport || null
  });
};

async function loadReportsThunk(dispatch) {
  try {
    dispatch({ type: types.REPORTS_FETCH_PENDING });
    const reportData = await apiFetchReports();
    dispatch({ type: types.REPORTS_FETCH_COMPLETE, payload: reportData });
  } catch (e) {
    const message = 'Fehler beim Laden der Meldungen';
    console.error(`${message}: ${e}`);
    dispatch(errorStateActions.addError({
      message
    }));
  }
}

// reducer

const initialState = {
  reports: [], // report items fetched from api
  selectedReport: null, // an entry within reports
  selectedReportPosition: { x: 0, y: 0 } // projected position of report popup
};

function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case types.REPORTS_FETCH_COMPLETE:
      return { ...state, reports: payload };
    case types.SET_SELECTED_REPORT:
      return {
        ...state, selectedReport: payload
      };
    case types.SET_SELECTED_REPORT_POS:
      return {
        ...state, selectedReportPosition: payload
      };
    default:
      return { ...state };
  }
}

export {
  actions,
  types,
  initialState
};

export default reducer;

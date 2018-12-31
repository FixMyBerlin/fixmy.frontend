import ky from 'ky';

const SET_REPORT_DATA = 'OverviewMap/MapState/SET_REPORT_DATA';

const initialState = {
  reports: [], // existing reports, fetched via API
  newReport: null, // the new report object, populated while stepping through the dialog
  error: null // holds an error message to which displaying components can bind to
};


export function loadReportData() {
  return async (dispatch, getState) => {
    const state = getState();
    const { filterReports } = state.MapState;
    if (filterReports) {
      return false;
    }
    const reportData = await ky.get('/data/reports-example.json');
    console.log(SET_REPORT_DATA, reportData);
    // TODO:  Implement further
  };
}


export default function ReportsReducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return { ...state };
  }
}

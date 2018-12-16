import ky from 'ky';

const SET_REPORT_DATA = 'Map/MapState/SET_REPORT_DATA';
const SET_REPORT_FILTER = 'Map/MapState/SET_REPORT_FILTER';

const initialState = {
  filterReports: [true, false, false]
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
    case SET_REPORT_FILTER:
      return {
        ...state,
        filterReports: state.filterReports.map((filter, i) => (i === action.filterIndex ? !filter : filter))
      };
    default:
      return { ...state };
  }
}

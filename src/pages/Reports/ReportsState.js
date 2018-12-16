import ky from 'ky';

const SET_REPORT_DATA = 'Map/MapState/SET_REPORT_DATA';
const SET_REPORT_FILTER = 'Map/MapState/SET_REPORT_FILTER';

const initialState = {
  navStep: 1, // increments while stepping through the dialog
  // reportItem: {
  //   lonLat: [11.2, 52.3],
  //   subject: config.reportSubjects[0].subject, // parking
  //   enhancement_suggestion: {
  //     type: config.reportSubjects[0].enhancement_suggestions.type, // Fahrradbügel
  //     specifications: {
  //     }
  //   }
  // },
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
    case SET_REPORT_FILTER:
      return {
        ...state,
        filterReports: state.filterReports.map((filter, i) => (i === action.filterIndex ? !filter : filter))
      };
    default:
      return { ...state };
  }
}

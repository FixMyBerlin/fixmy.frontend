const LOAD_DATA = 'Analysis/AnalysisState/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'Analysis/AnalysisState/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'Analysis/AnalysisState/LOAD_DATA_FAIL';
const SET_FILTER = 'Analysis/AnalysisState/SET_FILTER';

const initialState = {
  data: null,
  isLoading: true,
  sorting: null,
  selectedDistrict: false
};

export function loadPlanningData() {
  return async (dispatch) => {
    dispatch({ type: LOAD_DATA, payload: { isLoading: true } });

    try {
      const data = await fetch('https://api.fixmyberlin.de/api/plannings?page_size=100')
        .then(r => r.json())
        .then(json => json.results);
      return dispatch({ type: LOAD_DATA_SUCCESS, payload: { data, isLoading: false } });
    } catch (e) {
      return dispatch({ type: LOAD_DATA_FAIL, payload: { isLoading: false } });
    }
  };
}

export function setDistrictFilter(districtName = '') {
  const showAll = districtName.toLowerCase().includes('bezirke');
  const selectedDistrict = showAll ? false : districtName;

  return { type: SET_FILTER, payload: { selectedDistrict } };
}

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA:
    case LOAD_DATA_SUCCESS:
    case LOAD_DATA_FAIL:
    case SET_FILTER:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

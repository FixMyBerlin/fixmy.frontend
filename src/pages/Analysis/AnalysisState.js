const LOAD_DATA = 'Analysis/AnalysisState/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'Analysis/AnalysisState/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'Analysis/AnalysisState/LOAD_DATA_FAIL';
const SET_DISTRICT_FILTER = 'Analysis/AnalysisState/SET_DISTRICT_FILTER';
const SET_PHASE_FILTER = 'Analysis/AnalysisState/SET_PHASE_FILTER';

const initialState = {
  data: [],
  isLoading: true,
  sorting: null,
  selectedDistrict: false,
  selectedPhase: false
};

export function setDistrictFilter(selectedDistrict) {
  return { type: SET_DISTRICT_FILTER, payload: { selectedDistrict } };
}
export function setPhaseFilter(selectedPhase) {
  return { type: SET_PHASE_FILTER, payload: { selectedPhase } };
}

export function loadPlanningData(selectedDistrict = false) {
  return async (dispatch) => {
    dispatch({ type: LOAD_DATA, payload: { isLoading: true } });

    if (selectedDistrict) {
      dispatch(setDistrictFilter(selectedDistrict));
    }

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

export default function MapStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA:
    case LOAD_DATA_SUCCESS:
    case LOAD_DATA_FAIL:
    case SET_DISTRICT_FILTER:
    case SET_PHASE_FILTER:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

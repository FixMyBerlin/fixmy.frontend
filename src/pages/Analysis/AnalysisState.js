const LOAD_DATA = 'Analysis/AnalysisState/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'Analysis/AnalysisState/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'Analysis/AnalysisState/LOAD_DATA_FAIL';
const SET_DISTRICT_FILTER = 'Analysis/AnalysisState/SET_DISTRICT_FILTER';
const SET_PHASE_FILTER = 'Analysis/AnalysisState/SET_PHASE_FILTER';
const SET_SORT = 'Analysis/AnalysisState/SET_PHASE_FILTER';

const initialState = {
  data: [],
  isLoading: true,
  sorting: null,
  selectedDistrict: false,
  selectedPhase: false,
  selectedSort: false
};

function parseData(d) {
  const hasSections = d.planning_sections.length;
  let length = 0;
  const likes = 0;

  if (hasSections) {
    length = d.planning_sections.reduce((res, item) => {
      if (item.details) {
        item.details.forEach((detail) => {
          res += detail.length;
        });
      }

      return res;
    }, 0);
  }

  return {
    ...d,
    length,
    likes
  };
}

export function setDistrictFilter(selectedDistrict) {
  return { type: SET_DISTRICT_FILTER, payload: { selectedDistrict, selectedPhase: false } };
}

export function setPhaseFilter(selectedPhase) {
  return { type: SET_PHASE_FILTER, payload: { selectedPhase } };
}

export function setSort(selectedSort) {
  return { type: SET_SORT, payload: { selectedSort } };
}

export function loadPlanningData(selectedDistrict = false) {
  return async (dispatch) => {
    dispatch({ type: LOAD_DATA, payload: { isLoading: true } });

    if (selectedDistrict) {
      dispatch(setDistrictFilter(selectedDistrict));
    }

    try {
      const data = await fetch(`${config.apiUrl}/plannings?page_size=300`)
        .then(r => r.json())
        .then(json => json.results);

      const dataExtended = data.map(parseData);

      return dispatch({ type: LOAD_DATA_SUCCESS, payload: { data: dataExtended, isLoading: false } });
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
    case SET_SORT:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
}

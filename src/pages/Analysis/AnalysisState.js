/* eslint no-param-reassign: 0 */
import ky from 'ky';

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
  selectedSort: 'likes'
};

function parseData(d) {
  let length = 1000;

  if (d.details) {
    d.details.forEach((detail) => {
      length += detail.length;
    });
  }

  return {
    ...d,
    length
  };
}

export function setDistrictFilter(selectedDistrict) {
  return {
    type: SET_DISTRICT_FILTER,
    payload: { selectedDistrict, selectedPhase: false }
  };
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
      const { results } = await ky
        .get(`${config.apiUrl}/plannings?page_size=200`, { timeout: 200000 })
        .json();
      const dataExtended = results.map(parseData);

      console.log(dataExtended);

      return dispatch({
        type: LOAD_DATA_SUCCESS,
        payload: { data: dataExtended, isLoading: false }
      });
    } catch (e) {
      console.log(e);
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

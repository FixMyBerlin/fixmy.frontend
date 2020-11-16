/* eslint no-param-reassign: 0 */
import ky from 'ky';

import config from '~/config';
import logger from '~/utils/logger';

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

export function loadProjectData(selectedDistrict = false) {
  return async (dispatch) => {
    dispatch({ type: LOAD_DATA, payload: { isLoading: true } });

    if (selectedDistrict) {
      dispatch(setDistrictFilter(selectedDistrict));
    }

    try {
      const endPoint = `${config.apiUrl}/projects?page_size=500`;
      const { results } = await ky.get(endPoint, { timeout: 200000 }).json();

      return dispatch({
        type: LOAD_DATA_SUCCESS,
        payload: { data: results, isLoading: false }
      });
    } catch (e) {
      logger('Error loading project data', e);
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
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

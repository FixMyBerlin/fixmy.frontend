import ky from 'ky';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import config from '~/config';
import logger from '~/utils/logger';

const LOAD_DATA = 'Analysis/AnalysisState/LOAD_DATA';
const LOAD_DATA_SUCCESS = 'Analysis/AnalysisState/LOAD_DATA_SUCCESS';
const LOAD_DATA_FAIL = 'Analysis/AnalysisState/LOAD_DATA_FAIL';
const SET_DISTRICT_FILTER = 'Analysis/AnalysisState/SET_DISTRICT_FILTER';
const SET_PHASE_FILTER = 'Analysis/AnalysisState/SET_PHASE_FILTER';
const SET_SORT = 'Analysis/AnalysisState/SET_PHASE_FILTER';

export interface AnalysisState {
  data: any[];
  isLoading: boolean;
  sorting: null;
  selectedDistrict: string | null;
  selectedPhase: string | null;
  selectedSort: 'likes';
}

export type Phase = string;

export const initialState: AnalysisState = {
  data: [],
  isLoading: true,
  sorting: null,
  selectedDistrict: null,
  selectedPhase: null,
  selectedSort: 'likes',
};

//
// Actions
//

export interface SetDistrictFilterAction {
  type: typeof SET_DISTRICT_FILTER;
  payload: {
    selectedDistrict: string | null;
    selectedPhase: null;
  };
}

export function setDistrictFilter(
  selectedDistrict: string
): SetDistrictFilterAction {
  return {
    type: SET_DISTRICT_FILTER,
    payload: { selectedDistrict, selectedPhase: null },
  };
}

export interface SetPhaseFilterAction {
  type: typeof SET_PHASE_FILTER;
  payload: {
    selectedPhase: Phase;
  };
}

export function setPhaseFilter(selectedPhase: Phase): SetPhaseFilterAction {
  return { type: SET_PHASE_FILTER, payload: { selectedPhase } };
}

export interface SetSortAction {
  type: typeof SET_SORT;
  payload: {
    selectedSort: string;
  };
}

export function setSort(selectedSort: string): SetSortAction {
  return { type: SET_SORT, payload: { selectedSort } };
}

export interface LoadDataAction {
  type: typeof LOAD_DATA;
  payload: { isLoading: boolean };
}

export interface LoadDataSuccessAction {
  type: typeof LOAD_DATA_SUCCESS;
  payload: {
    data: any[];
    isLoading: false;
  };
}

export interface LoadDataFailAction {
  type: typeof LOAD_DATA_FAIL;
  payload: {
    isLoading: false;
  };
}

export function loadProjectData(
  selectedDistrict: string = null
): ThunkAction<void, typeof initialState, unknown, Action<any>> {
  return async (dispatch) => {
    dispatch({ type: LOAD_DATA, payload: { isLoading: true } });

    if (selectedDistrict) {
      dispatch(setDistrictFilter(selectedDistrict));
    }

    try {
      const endPoint = `${config.apiUrl}/projects?page_size=500`;
      const { results } = await ky.get(endPoint, { timeout: 200000 }).json();

      dispatch({
        type: LOAD_DATA_SUCCESS,
        payload: { data: results, isLoading: false },
      });
    } catch (e) {
      logger('Error loading project data', e);
      dispatch({ type: LOAD_DATA_FAIL, payload: { isLoading: false } });
    }
  };
}

const emptyAction = { type: null, payload: {} };

type AnalysisStateAction =
  | SetDistrictFilterAction
  | SetPhaseFilterAction
  | SetSortAction
  | LoadDataAction
  | LoadDataSuccessAction
  | LoadDataFailAction
  | typeof emptyAction;

export default function MapStateReducer(
  state = initialState,
  action: AnalysisStateAction = emptyAction
) {
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

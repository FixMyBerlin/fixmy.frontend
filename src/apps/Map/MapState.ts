import ky from 'ky';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import config from '~/config';
import { MapConfig } from './types';
import { RootState } from '~/store';

const SET_VIEW = 'Map/MapState/SET_VIEW';
const SET_HAS_MOVED = 'Map/MapState/SET_HAS_MOVED';
const GEOCODE_DONE = 'Map/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'Map/MapState/GEOCODE_FAIL';
const SET_HBI_FILTER = 'Map/MapState/SET_HBI_FILTER';
const SET_PLANNING_FILTER = 'Map/MapState/SET_PLANNING_FILTER';
const SET_POPUP_DATA = 'Map/MapState/SET_POPUP_DATA';
const SET_POPUP_LOCATION = 'Map/MapState/SET_POPUP_LOCATION';
const SET_POPUP_VISIBLE = 'Map/MapState/SET_POPUP_VISIBLE';
const SET_PLANNING_DATA = 'Map/MapState/SET_PLANNING_DATA';
const SET_ERROR = 'Map/MapState/SET_ERROR';
const UNSET_ERROR = 'Map/MapState/UNSET_ERROR';

// todo: define this based on fixmy.platform serializer & model
type ProjectData = any;

export type MapState = MapConfig['view'] & {
  animate: boolean;
  dim: boolean;
  displayPopup: boolean;
  error: string | null;
  filterHbi: [boolean, boolean, boolean, boolean];
  filterPlannings: [boolean, boolean, boolean, boolean];
  hasMoved: boolean;
  planningData: boolean;
  popupData: ProjectData;
  popupLocation: null | [number, number];
  show3dBuildings: boolean;
};

type MapView = 'projects' | '';

const initialState: MapState = {
  ...config.apps.map.view,
  animate: false,
  dim: false,
  displayPopup: false,
  error: null,
  filterHbi: [true, true, true, true],
  filterPlannings: [true, true, true, true],
  hasMoved: false,
  planningData: false,
  popupData: null,
  popupLocation: null,
  show3dBuildings: true
};

type SetError = {
  type: typeof SET_ERROR;
  payload: {
    error: string;
  };
};

export function setError(message: string): SetError {
  return { type: SET_ERROR, payload: { error: message } };
}

type UnsetError = {
  type: typeof UNSET_ERROR;
  payload: {
    error: null;
  };
};

export function unsetError(): UnsetError {
  return { type: UNSET_ERROR, payload: { error: null } };
}

type SetView = {
  type: typeof SET_VIEW;
  payload: MapConfig['view'];
};

export function setView(view: MapConfig['view']): SetView {
  return { type: SET_VIEW, payload: view };
}

type SetPopupData = {
  type: typeof SET_POPUP_DATA;
  payload: {
    popupData: ProjectData | null;
  };
};

export function setPopupData(
  popupData: ProjectData | null = null
): SetPopupData {
  return { type: SET_POPUP_DATA, payload: { popupData } };
}

type SetHasMoved = {
  type: typeof SET_HAS_MOVED;
  payload: {
    hasMoved: boolean;
  };
};

export function setHasMoved(hasMoved: boolean): SetHasMoved {
  return { type: SET_HAS_MOVED, payload: { hasMoved } };
}

type ToggleHbiFilter = {
  type: typeof SET_HBI_FILTER;
  filterIndex: number;
};

export function toggleHbiFilter(filterIndex: number): ToggleHbiFilter {
  return { type: SET_HBI_FILTER, filterIndex };
}

type TogglePlanningFilter = {
  type: typeof SET_PLANNING_FILTER;
  filterIndex: number;
};

export function togglePlanningFilter(
  filterIndex: number
): TogglePlanningFilter {
  return { type: SET_PLANNING_FILTER, filterIndex };
}

type SetPopupLocation = {
  type: typeof SET_POPUP_LOCATION;
  payload: {
    popupLocation: [number, number];
  };
};

export function setPopupLocation(
  popupLocation: [number, number]
): SetPopupLocation {
  return { type: SET_POPUP_LOCATION, payload: { popupLocation } };
}

type SetPopupVisible = {
  type: typeof SET_POPUP_VISIBLE;
  payload: {
    displayPopup: boolean;
  };
};

export function setPopupVisible(isVisible: boolean): SetPopupVisible {
  return { type: SET_POPUP_VISIBLE, payload: { displayPopup: isVisible } };
}

interface LoadPlanningData {
  type: typeof SET_PLANNING_DATA;
  payload: {
    planningData: any;
  };
}

export const loadPlanningData: ThunkAction<
  void,
  RootState,
  unknown,
  Action<LoadPlanningData>
> = () => async (dispatch, getState) => {
  if (getState().MapState.planningData) {
    return;
  }

  const planningData = await ky
    .get(`${config.apiUrl}/projects?page_size=500`, { timeout: 50000 })
    .json();

  dispatch({
    type: SET_PLANNING_DATA,
    payload: { planningData }
  });
};

interface GeocodeAddressSuccess {
  type: typeof GEOCODE_DONE;
  payload: {
    center: [number, number];
    zoom: number;
  };
}

interface GeocodeAddressFail {
  type: typeof GEOCODE_FAIL;
  payload: {
    geocodeError: string;
  };
}

export const geocodeAddress: ThunkAction<
  void,
  RootState,
  unknown,
  Action<GeocodeAddressSuccess | GeocodeAddressFail>
> = (searchtext) => async (dispatch) => {
  const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.apps.map;

  try {
    const searchUrl = `${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU&city=Berlin`;
    const data: any = await ky.get(searchUrl).json();

    const geocodeResult =
      data?.Response?.View[0]?.Result[0]?.Location?.DisplayPosition;

    if (!geocodeResult) {
      return dispatch({
        type: GEOCODE_FAIL,
        payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' }
      });
    }

    // we do + (Math.random() / 1000) in order to always get a slightly different center
    const center = [
      geocodeResult.Longitude,
      geocodeResult.Latitude + Math.random() / 1000
    ];
    return dispatch({ type: GEOCODE_DONE, payload: { center, zoom: 17 } });
  } catch (error) {
    return dispatch({
      type: GEOCODE_FAIL,
      payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' }
    });
  }
};

type ActionType =
  | GeocodeAddressFail
  | GeocodeAddressSuccess
  | LoadPlanningData
  | SetError
  | SetHasMoved
  | SetPopupData
  | SetPopupLocation
  | SetPopupVisible
  | SetView
  | ToggleHbiFilter
  | TogglePlanningFilter
  | UnsetError
  | { type: null };

export default function MapStateReducer(
  state: MapState = initialState,
  action: ActionType = { type: null }
): MapState {
  switch (action.type) {
    case SET_ERROR:
    case UNSET_ERROR:
    case SET_VIEW:
    case SET_POPUP_DATA:
    case SET_HAS_MOVED:
    case GEOCODE_DONE:
    case SET_POPUP_LOCATION:
    case SET_POPUP_VISIBLE:
    case SET_PLANNING_DATA:
      return { ...state, ...(action as LoadPlanningData).payload };
    case SET_HBI_FILTER:
      return {
        ...state,
        filterHbi: state.filterHbi.map((filter, i) =>
          i === (action as ToggleHbiFilter).filterIndex ? !filter : filter
        ) as [boolean, boolean, boolean, boolean]
      };
    case SET_PLANNING_FILTER:
      return {
        ...state,
        filterPlannings: state.filterPlannings.map((filter, i) =>
          i === (action as TogglePlanningFilter).filterIndex ? !filter : filter
        ) as [boolean, boolean, boolean, boolean]
      };
    default:
      return state;
  }
}

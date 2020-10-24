import { match, matchPath } from 'react-router-dom';
import qs from 'qs';
import ky from 'ky';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import config from '~/config';
import { MapConfig } from './types';
import { get as apiGet } from '~/services/api/shorthands';
import { RootState } from '~/store';
import { FMCError } from '~/services/api/types';

const UPDATE_HISTORY = 'Map/MapState/UPDATE_HISTORY';
const SET_ACTIVE_SECTION = 'Map/MapState/SET_ACTIVE_SECTION';
const SET_VIEW_ACTIVE = 'Map/MapState/SET_VIEW_ACTIVE';
const SET_VIEW = 'Map/MapState/SET_VIEW';
const SET_HAS_MOVED = 'Map/MapState/SET_HAS_MOVED';
const GEOCODE_DONE = 'Map/MapState/GEOCODE_SUCCESS';
const GEOCODE_FAIL = 'Map/MapState/GEOCODE_FAIL';
const SET_HBI_FILTER = 'Map/MapState/SET_HBI_FILTER';
const SET_PLANNING_FILTER = 'Map/MapState/SET_PLANNING_FILTER';
const SET_POPUP_DATA = 'Map/MapState/SET_POPUP_DATA';
const SET_POPUP_LOCATION = 'Map/MapState/SET_POPUP_LOCATION';
const SET_POPUP_VISIBLE = 'Map/MapState/SET_POPUP_VISIBLE';
export const SET_PLANNING_DATA = 'Map/MapState/SET_PLANNING_DATA';
const SET_ERROR = 'Map/MapState/SET_ERROR';
const UNSET_ERROR = 'Map/MapState/UNSET_ERROR';

type MapView = 'zustand' | 'planungen';

// todo: define this based on fixmy.platform serializer & model
type ProjectData = any;

type MapPath = {
  activeView?: MapView;
  activeSection?: string;
};

export type MapState = MapConfig['view'] & {
  activeView?: MapView;
  activeSection?: number;
  isEmbedMode: boolean;
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

const initialState: MapState = {
  ...config.apps.map.view,
  activeView: null,
  activeSection: null,
  isEmbedMode: false,
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

type UpdateHistory = {
  type: typeof UPDATE_HISTORY;
  payload: {
    isEmbedMode?: boolean;
    activeSection?: number | null;
    activeView?: MapView;
  };
};

export const updateHistory = (props: Location) => (dispatch: Dispatch) => {
  const pathMatch: match<MapPath> = matchPath(props.pathname, {
    path: '/:activeView?/:activeSection?',
    exact: false,
    strict: false
  });

  const { activeSection, activeView } = pathMatch.params;

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection: Number.isNaN(parseInt(activeSection, 10))
        ? null
        : activeSection,
      activeView
    }
  });
};

export const detectEmbedMode = (location: Location) => (dispatch: Dispatch) => {
  const isEmbedMode =
    !!qs.parse(location.search, { ignoreQueryPrefix: true }).embed ||
    window.location.host === 'embed.fixmyberlin.de';

  const action: UpdateHistory = {
    type: UPDATE_HISTORY,
    payload: {
      isEmbedMode
    }
  };

  dispatch(action);
};

type SetActiveSection = {
  type: typeof SET_ACTIVE_SECTION;
  payload: { activeSection: number | null };
};

export function setActiveSection(activeSection: number | null) {
  return {
    type: SET_ACTIVE_SECTION,
    payload: { activeSection }
  };
}

type SetActiveView = {
  type: typeof SET_VIEW_ACTIVE;
  payload: { activeView: MapView };
};

export function setActiveView(activeView: MapView) {
  return { type: SET_VIEW_ACTIVE, payload: { activeView } };
}

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
  payload: Partial<MapConfig['view']>;
};

export function setView(view: SetView['payload']): SetView {
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

export interface SetPlanningData {
  type: typeof SET_PLANNING_DATA;
  payload: {
    planningData: any;
  };
}

export function setPlanningData(apiResponse): SetPlanningData {
  return {
    type: SET_PLANNING_DATA,
    payload: {
      planningData: apiResponse
    }
  };
}

export function loadPlanningData(): ThunkAction<
  void,
  Pick<RootState, 'MapState'>,
  unknown,
  SetPlanningData | SetError
> {
  return async (dispatch, getState) => {
    const isStoreAlreadyPopulated = getState().MapState.planningData;
    if (isStoreAlreadyPopulated) {
      return;
    }

    try {
      const apiRoute = `projects?page_size=500`;
      const apiResponse = await apiGet(apiRoute);
      const setPlanningsAction = setPlanningData(apiResponse);
      dispatch(setPlanningsAction);
    } catch (apiClientError) {
      const errorAction = setError((apiClientError as FMCError).message);
      dispatch(errorAction);
    }
  };
}

interface GeocodeAddressSuccess {
  type: typeof GEOCODE_DONE;
  payload: {
    center: mapboxgl.PointLike;
    zoom: number;
  };
}

interface GeocodeAddressFail {
  type: typeof GEOCODE_FAIL;
  payload: {
    geocodeError: string;
  };
}

export function geocodeAddress(searchtext) {
  return async (dispatch) => {
    const { geocoderUrl, geocoderAppId, geocoderAppCode } = config.apps.map;

    try {
      const searchUrl = `${geocoderUrl}?app_id=${geocoderAppId}&app_code=${geocoderAppCode}&searchtext=${searchtext}&country=DEU&city=Berlin`;
      const data = await ky.get(searchUrl).json();

      // const geocodeResult = idx(
      //   data,
      //   (_) => _.Response.View[0].Result[0].Location.DisplayPosition
      // );
      const geocodeResult = (data as any)?.Response?.View[0]?.Result[0]
        ?.Location.DisplayPosition;
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
}

type MapStateAction =
  | GeocodeAddressFail
  | GeocodeAddressSuccess
  | SetPlanningData
  | SetActiveSection
  | SetActiveView
  | SetError
  | SetHasMoved
  | SetPopupData
  | SetPopupLocation
  | SetPopupVisible
  | SetView
  | ToggleHbiFilter
  | TogglePlanningFilter
  | UnsetError
  | UpdateHistory
  | { type: null };

export default function MapStateReducer(
  state: MapState = initialState,
  action: MapStateAction = { type: null }
): MapState {
  switch (action.type) {
    case GEOCODE_DONE:
    case SET_ACTIVE_SECTION:
    case SET_ERROR:
    case SET_HAS_MOVED:
    case SET_PLANNING_DATA:
    case SET_POPUP_DATA:
    case SET_POPUP_LOCATION:
    case SET_POPUP_VISIBLE:
    case SET_VIEW_ACTIVE:
    case SET_VIEW:
    case UNSET_ERROR:
    case UPDATE_HISTORY:
      // @ts-ignore
      return { ...state, ...action.payload };
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

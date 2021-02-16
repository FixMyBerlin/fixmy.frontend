import { match, matchPath } from 'react-router-dom';
import qs from 'qs';
import ky from 'ky';
import { Dispatch } from 'redux';

import config from '~/config';
import { MapConfig } from './types';
import api from '~/services/api/';

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

const SET_PLANNING_DATA_FETCH_STATE =
  'Map/MapState/SET_PLANNING_DATA_FETCH_STATE';

type MapView = 'zustand' | 'planungen';

// todo: define this based on fixmy.platform serializer & model
type ProjectData = any;

type MapPath = {
  activeView?: MapView;
  activeSection?: string;
};

type PlanningDataFetchState = 'waiting' | 'pending' | 'success' | 'error';

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
  planningDataFetchState: PlanningDataFetchState;
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
  planningDataFetchState: 'waiting',
  popupData: null,
  popupLocation: null,
  show3dBuildings: true,
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
    strict: false,
  });

  const { activeSection, activeView } = pathMatch.params;

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection: Number.isNaN(parseInt(activeSection, 10))
        ? null
        : activeSection,
      activeView,
    },
  });
};

export const detectEmbedMode = (location: Location) => (dispatch: Dispatch) => {
  const isEmbedMode =
    !!qs.parse(location.search, { ignoreQueryPrefix: true }).embed ||
    window.location.host === 'embed.fixmyberlin.de';

  const action: UpdateHistory = {
    type: UPDATE_HISTORY,
    payload: {
      isEmbedMode,
    },
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
    payload: { activeSection },
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

type SetPlanningDataFetchState = {
  type: typeof SET_PLANNING_DATA_FETCH_STATE;
  state: PlanningDataFetchState;
};

export const setPlanningDataFetchState = (
  state: PlanningDataFetchState
): SetPlanningDataFetchState => ({
  type: SET_PLANNING_DATA_FETCH_STATE,
  state,
});

export const setPlanningData = (planningData) => ({
  type: SET_PLANNING_DATA,
  payload: { planningData },
});

export interface LoadPlanningData {
  type: typeof SET_PLANNING_DATA;
  payload: {
    planningData: any;
  };
}

export function loadPlanningData() {
  return async (dispatch, getState) => {
    if (getState().MapState.planningDataFetchState !== 'waiting') return;
    dispatch(setPlanningDataFetchState('pending'));

    let planningData;
    try {
      const apiRoute = `projects?page_size=500`;
      planningData = await api.get(apiRoute);
    } catch (err) {
      dispatch(setPlanningDataFetchState('error'));
      if (err instanceof api.ApiError) dispatch(setError(err.message));
      else {
        dispatch(
          setError(
            'Die Planungsdaten konnten nicht geladen werden. Bitte versuchen Sie es später noch einmal.'
          )
        );
        throw err;
      }
    }

    dispatch(setPlanningData(planningData));
    dispatch(setPlanningDataFetchState('success'));
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
    const { url, appId, appCode } = config.apps.map.geocoder;

    try {
      const searchUrl = `${url}?app_id=${appId}&app_code=${appCode}&searchtext=${searchtext}&country=DEU&city=Berlin`;
      const data = await ky.get(searchUrl).json();

      const geocodeResult = (data as any)?.Response?.View[0]?.Result[0]
        ?.Location.DisplayPosition;
      if (!geocodeResult) {
        return dispatch({
          type: GEOCODE_FAIL,
          payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' },
        });
      }

      // we do + (Math.random() / 1000) in order to always get a slightly different center
      const center = [
        geocodeResult.Longitude,
        geocodeResult.Latitude + Math.random() / 1000,
      ];
      return dispatch({ type: GEOCODE_DONE, payload: { center, zoom: 17 } });
    } catch (error) {
      return dispatch({
        type: GEOCODE_FAIL,
        payload: { geocodeError: 'Die Adresse konnte nicht gefunden werden' },
      });
    }
  };
}

type MapStateAction =
  | GeocodeAddressFail
  | GeocodeAddressSuccess
  | LoadPlanningData
  | SetPlanningDataFetchState
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
    case SET_PLANNING_DATA_FETCH_STATE:
      return {
        ...state,
        planningDataFetchState: (action as SetPlanningDataFetchState).state,
      };
    case SET_HBI_FILTER:
      return {
        ...state,
        filterHbi: state.filterHbi.map((filter, i) =>
          i === (action as ToggleHbiFilter).filterIndex ? !filter : filter
        ) as [boolean, boolean, boolean, boolean],
      };
    case SET_PLANNING_FILTER:
      return {
        ...state,
        filterPlannings: state.filterPlannings.map((filter, i) =>
          i === (action as TogglePlanningFilter).filterIndex ? !filter : filter
        ) as [boolean, boolean, boolean, boolean],
      };
    default:
      return state;
  }
}

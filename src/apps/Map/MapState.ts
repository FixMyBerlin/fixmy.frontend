import ky from 'ky';
import qs from 'qs';
import { match, matchPath } from 'react-router-dom';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import config from '~/config';
import api from '~/services/api/';
import { RootState } from '~/store';

import { HBI_STOPS, BOTH_SIDES, LEFT_SIDE, RIGHT_SIDE } from './constants';
import type {
  HBI,
  HBILevel,
  HBISide,
  MapConfig,
  Side,
  VisionZeroIndex,
} from './types';

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
const SET_ERROR = 'Map/MapState/SET_ERROR';
const UNSET_ERROR = 'Map/MapState/UNSET_ERROR';

export const SET_PLANNING_DATA = 'Map/MapState/SET_PLANNING_DATA';
const SET_PLANNING_DATA_FETCH_STATE =
  'Map/MapState/SET_PLANNING_DATA_FETCH_STATE';
export const SET_HBI_DATA = 'Map/MapState/SET_HBI_DATA';
const SET_HBI_DATA_FETCH_STATE = 'Map/MapState/SET_HBI_DATA_FETCH_STATE';

// parsed from the first path segment of the url
type MapView = 'zustand' | 'planungen' | 'popupbikelanes';

// todo: define this based on fixmy.platform serializer & model
type ProjectFromMapbox = any;

export type SectionAccidents = {
  killed: number;
  // eslint-disable-next-line camelcase
  risk_level: HBILevel;
  // eslint-disable-next-line camelcase
  severely_injured: number;
  side: Side;
  // eslint-disable-next-line camelcase
  slightly_injured: number;
  source: string;
};

type SectionDetails = any;

export type HBIData = {
  accidents: SectionAccidents[];
  borough: string;
  details: SectionDetails[];
  geometry: any;
  // eslint-disable-next-line camelcase
  is_road: boolean;
  // eslint-disable-next-line camelcase
  street_category?: any;
  // eslint-disable-next-line camelcase
  street_name: string;
  suffix?: string;
  url: string;
};

type ProjectData = any;

type HBIFromMapbox = {
  borough: string;
  id: number;
  // eslint-disable-next-line camelcase
  is_road: boolean;
  // eslint-disable-next-line camelcase
  side2_killed: number;
  // eslint-disable-next-line camelcase
  side2_risk_level: VisionZeroIndex;
  // eslint-disable-next-line camelcase
  side2_severely_injured: number;
  // eslint-disable-next-line camelcase
  side2_slightly_injured: number;
  // eslint-disable-next-line camelcase
  side2_source: string;
  // eslint-disable-next-line camelcase
  street_name: string;
};

type PopupData = ProjectFromMapbox | HBIFromMapbox;

type MapPath = {
  activeView?: MapView;
  activeSection?: string;
};

export type FetchState = 'waiting' | 'pending' | 'success' | 'error';

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
  planningData?: ProjectData;
  planningDataFetchState: FetchState;
  hbiData?: PopupData;
  hbiDataFetchState: FetchState;
  popupData?: PopupData;
  popupLocation: null | { x: number; y: number };
  currentHBI?: HBI;
  show3dBuildings: boolean;
};

export const initialState: MapState = {
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
  hbiData: null,
  hbiDataFetchState: 'waiting',
  popupData: null,
  popupLocation: null,
  currentHBI: null,
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

export const updateHistory = (path: string) => (dispatch: Dispatch) => {
  const pathMatch: match<MapPath> = matchPath(path, {
    path: '/:activeView?/:activeSection?',
    exact: false,
    strict: false,
  });
  const { activeSection, activeView } = pathMatch.params;
  const parsedSection = parseInt(activeSection, 10);

  dispatch({
    type: UPDATE_HISTORY,
    payload: {
      activeSection: Number.isNaN(parsedSection) ? null : parsedSection,
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
    popupLocation: mapboxgl.PointLike;
  };
};

export function setPopupLocation(
  popupLocation: mapboxgl.PointLike
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
  state: FetchState;
};

export const setPlanningDataFetchState = (
  state: FetchState
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

type SetHBIDataFetchState = {
  type: typeof SET_HBI_DATA_FETCH_STATE;
  state: FetchState;
};

export const setHBIDataFetchState = (
  state: FetchState
): SetHBIDataFetchState => ({
  type: SET_HBI_DATA_FETCH_STATE,
  state,
});

export const setHbiData = (hbiData: HBIData) => ({
  type: SET_HBI_DATA,
  payload: { hbiData },
});

export interface LoadHBIData {
  type: typeof SET_HBI_DATA;
  payload: {
    hbiData: any;
  };
}

export function loadHBIData() {
  return async (dispatch, getState) => {
    const { hbiDataFetchState, activeSection } = getState().MapState;
    if (hbiDataFetchState !== 'waiting') return;

    dispatch(setHBIDataFetchState('pending'));

    let hbiData: HBIData;
    try {
      const apiRoute = `sections/${activeSection}`;
      hbiData = await api.get(apiRoute);
    } catch (err) {
      dispatch(setHBIDataFetchState('error'));
      if (err instanceof api.ApiError) dispatch(setError(err.message));
      else {
        dispatch(
          setError(
            'Die Daten für diesen Abschnitt konnten nicht geladen werden. Bitte versuchen Sie es später noch einmal.'
          )
        );
        throw err;
      }
    }

    dispatch(setHbiData(hbiData));
    dispatch(setHBIDataFetchState('success'));
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

/**
 * Close popup and reset map view
 */
export function setDetailsMapView(): ThunkAction<
  void,
  typeof initialState,
  unknown,
  Action<any>
> {
  return async (dispatch) => {
    dispatch(setPopupData(null));
    dispatch(setPopupVisible(false));
    dispatch(
      setView({
        show3dBuildings: true,
        pitch: 40,
        dim: true,
        animate: true,
        zoom: 16,
      })
    );
  };
}

type MapStateAction =
  | GeocodeAddressFail
  | GeocodeAddressSuccess
  | LoadPlanningData
  | SetPlanningDataFetchState
  | LoadHBIData
  | SetHBIDataFetchState
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
    case SET_HBI_DATA:
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
    case SET_HBI_DATA_FETCH_STATE:
      return {
        ...state,
        hbiDataFetchState: (action as SetHBIDataFetchState).state,
      };
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

/**
 * Evaluate components to determine the overall HBI rating from them
 *
 * Eventually, this will select the component with the worst rating. Right now,
 * only the Vision-Zero-Index is considered.
 */
const getHBIFromComponents = (
  { visionZeroIndex }: HBI['components'],
  side: Side
): HBISide => {
  const data = visionZeroIndex[side];
  const level =
    data == null || Number.isNaN(data.level)
      ? null
      : ((3 - data.level) as HBISide['level']);
  const color = HBI_STOPS[level]?.color || config.colors.darkgrey;
  const label = HBI_STOPS[level]?.label || 'Nicht genug Daten';
  return {
    label,
    color,
    level,
  };
};

/**
 * Returns vison zero data for a section or `null`.
 */
const visionZeroForSection = (
  section: HBIData
): HBI['components']['visionZeroIndex'] => {
  const rv = {
    [BOTH_SIDES]: null,
    [LEFT_SIDE]: null,
    [RIGHT_SIDE]: null,
  };

  if (section.side2_risk_level != null) {
    rv[BOTH_SIDES] = {
      level: section.side2_risk_level,
      source: section.side2_source,
      killed: section.side2_killed,
      severelyInjured: section.side2_severely_injured,
      slightlyInjured: section.side2_slightly_injured,
    };
  }
  return rv;
};

/**
 * Selector for all HBI data derived from current popup data
 */
const getCurrentHBI = ({ MapState }: RootState): HBI => {
  if (MapState.activeView !== 'zustand' || MapState.popupData == null)
    return null;

  const components: HBI['components'] = {
    visionZeroIndex: visionZeroForSection(MapState.popupData),
  };

  return {
    [BOTH_SIDES]: getHBIFromComponents(components, BOTH_SIDES),
    [LEFT_SIDE]: getHBIFromComponents(components, LEFT_SIDE),
    [RIGHT_SIDE]: getHBIFromComponents(components, RIGHT_SIDE),
    components,
  };
};

export const selectors = {
  getCurrentHBI,
};

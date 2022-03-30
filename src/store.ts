import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AppState from '~/AppState';
import AnalysisState from '~/apps/Analysis/state';
import MapState from '~/apps/Map/MapState';
import SpielstrassenState from '~/apps/Spielstrassen/state';
import KatasterKIState from '~/pages/KatasterKI/state';
import ReportsState from '~/pages/Reports/state';
import UserState from '~/pages/User/UserState';

const Reducer = combineReducers({
  AppState,
  MapState,
  UserState,
  AnalysisState,
  ReportsState,
  KatasterKIState,
  SpielstrassenState,
});

export type RootState = ReturnType<typeof Reducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Configure redux-devtools-extension
// https://github.com/zalmoxisus/redux-devtools-extension#usage

type ExtendedWindow = Window &
  typeof globalThis & {
    store: typeof store;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  };

/* eslint-disable no-underscore-dangle */
const enhancers = (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunk),
      (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(thunk);
/* eslint-enable */

const store = createStore(Reducer, enhancers);

// reenable if we need redux specific error logging in sentry:
// const sentryReduxEnhancer = Sentry.createReduxEnhancer({
//   // Optionally pass options listed below
// });

// const store = createStore(Reducer, compose(enhancers, sentryReduxEnhancer));

// expose store when run in Cypress Test
if (window.Cypress) {
  (window as ExtendedWindow).store = store;
}

export default store;

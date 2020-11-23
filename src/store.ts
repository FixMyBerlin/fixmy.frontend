import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AppState from '~/AppState';
import UserState from '~/pages/User/UserState';
import AnalysisState from '~/pages/Analysis/AnalysisState';
import ReportsState from '~/pages/Reports/state';
import KatasterKIState from '~/pages/KatasterKI/state';
import SpielstrassenState from '~/apps/Spielstrassen/state';
import MapState from '~/apps/Map/MapState';

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

// expose store when run in Cypress Test
if (window.Cypress) {
  (window as ExtendedWindow).store = store;
}

export default store;

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AppState from '~/AppState';
import MapState from '~/pages/Map/MapState';
import UserState from '~/pages/User/UserState';
import AnalysisState from '~/pages/Analysis/AnalysisState';
import ReportsState from '~/pages/Reports/state';
import KatasterKIState from '~/pages/KatasterKI/state';
import SpielstrassenState from '~/pages/Spielstrassen/state';

const Reducer = combineReducers({
  AppState,
  MapState,
  UserState,
  AnalysisState,
  ReportsState,
  KatasterKIState,
  SpielstrassenState
});

// Configure redux-devtools-extension
// https://github.com/zalmoxisus/redux-devtools-extension#usage

/* eslint-disable no-underscore-dangle */
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);
/* eslint-enable */

const store = createStore(Reducer, enhancers);

// expose store when run in Cypress Test
if (window.Cypress) {
  window.store = store;
}

export default store;

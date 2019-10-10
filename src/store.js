import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AppState from '~/AppState';
import MapState from '~/pages/Map/MapState';
import UserState from '~/pages/User/UserState';
import AnalysisState from '~/pages/Analysis/AnalysisState';
import ReportsState from '~/pages/Reports/ReportsState';

const Reducer = combineReducers({
  AppState,
  MapState,
  UserState,
  AnalysisState,
  ReportsState
});

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
);

export default createStore(Reducer, enhancers);

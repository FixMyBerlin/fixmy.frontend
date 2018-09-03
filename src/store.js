import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import AppState from '~/AppState';
import MapState from '~/pages/Map/MapState';
import UserState from '~/pages/User/UserState';
import AnalysisState from '~/pages/Analysis/AnalysisState';

const Reducer = combineReducers({
  AppState,
  MapState,
  UserState,
  AnalysisState
});

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default createStore(
  Reducer,
  enhancers
);

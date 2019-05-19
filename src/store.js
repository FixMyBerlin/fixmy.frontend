import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

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

const loggerMiddleware = createLogger({
    diff: true
  });

function configureStoreProd(initialState) {
  const middlewares = [
    // add middlewares you want in productuon
  ];

  return createStore(Reducer, initialState, compose(
    applyMiddleware(...middlewares)
    ));
}

function configureStoreDev(initialState) {
  const middlewares = [
    thunk,
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant()
  ];
  if (config.useReduxLogger) middlewares.push(loggerMiddleware);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(Reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    ));

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore();

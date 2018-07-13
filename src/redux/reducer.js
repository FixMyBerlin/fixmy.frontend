import { combineReducers } from 'redux';

import AppState from '~/modules/App/AppState';
import MenuState from '~/modules/Menu/MenuState';
import MapState from '~/modules/MapView/MapState';
import UserState from '~/modules/User/UserState';

export default combineReducers({
  AppState,
  MenuState,
  MapState,
  UserState
});

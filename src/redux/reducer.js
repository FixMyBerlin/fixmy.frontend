import { combineReducers } from 'redux';

import MenuState from '~/modules/Menu/MenuState';
import MapState from '~/modules/MapView/MapState';
import UserState from '~/modules/User/UserState';

export default combineReducers({
  MenuState,
  MapState,
  UserState
});

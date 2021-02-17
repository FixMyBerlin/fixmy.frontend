import Store from '~/store';
import * as MapActions from '~/apps/Map/MapState';

function resetMap({ zoom = null } = {}) {
  Store.dispatch(MapActions.setActiveSection(null));
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));

  const nextMapView = {
    show3dBuildings: false,
    dim: false,
    pitch: 0,
    bearing: 0,
    animate: true,
    center: null,
    zoom,
  };

  Store.dispatch(MapActions.setView(nextMapView));
}

export default resetMap;

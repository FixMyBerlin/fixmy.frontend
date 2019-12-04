import Store from '~/store';
import * as MapActions from '~/pages/Map/MapState';
import * as AppActions from '~/AppState';

function resetMap({ zoom = null } = {}) {
  Store.dispatch(AppActions.setActiveSection(null));
  Store.dispatch(MapActions.setPopupData(null));
  Store.dispatch(MapActions.setPopupVisible(false));

  const nextMapView = {
    show3dBuildings: false,
    dim: false,
    pitch: 0,
    bearing: 0,
    animate: true,
    center: null
  };

  if (zoom) {
    nextMapView.zoom = zoom;
  }

  Store.dispatch(MapActions.setView(nextMapView));
}

export default resetMap;

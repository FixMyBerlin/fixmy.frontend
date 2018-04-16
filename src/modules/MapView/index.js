import React, { PureComponent } from 'react';

import Map from '~/components/Map';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map-view.styl';

class MapView extends PureComponent {
  render() {
    return (
      <div className="map-view">
        <Map />
      </div>
    );
  }
}

export default MapView;

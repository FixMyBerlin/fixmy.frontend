import React, { PureComponent } from 'react';
import MapboxGL from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.styl';

class Map extends PureComponent {
  componentDidMount() {
    MapboxGL.accessToken = 'pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q';

    this.map = new MapboxGL.Map({
      container: this.root,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  render() {
    return (
      <div className="map" ref={(ref) => { this.root = ref; }} />
    );
  }
}

export default Map;

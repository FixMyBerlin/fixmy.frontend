import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Map from '~/components/Map';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map-view.styl';

class MapView extends PureComponent {
  render() {
    const zoom = this.props.location.pathname === '/map' ? 8 : 10;

    return (
      <div className="map-view">
        <Map
          accessToken="pk.eyJ1IjoiaGVqY28iLCJhIjoiY2piZjd2bzk2MnVsMjJybGxwOWhkbWxpNCJ9.L1UNUPutVJHWjSmqoN4h7Q"
          view={{
            center: [13, 52],
            zoom
          }}
          animate
        />
      </div>
    );
  }
}

export default withRouter(connect(state => state)(MapView));

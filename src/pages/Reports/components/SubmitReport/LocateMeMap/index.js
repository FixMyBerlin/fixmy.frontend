/**
 *  Provides means to determine a location using
 *  - the current device location OR
 *  - geocoding
 *  This location mode is passed in as prop.
 *  The location can be adjusted by moving the map around.
 */

import React, { Component } from 'react';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import StaticMarker from '../StaticMarker';

const MapView = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const MapWrapper = styled.div`
  flex: 1 1 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledWebGlMap = styled(WebglMap)`
  order: 2; // this makes sure that the NavBar is on top
`;


class LocateMeMap extends Component {
  state = {};

  // onLocate = ({ lng, lat }) => {
  //   // this.updateView({ center: userLocation, zoom: config.map.zoomAfterGeocode, animate: true });
  // };

  render() {
    const { showMarker, pinMarker, onMapDrag } = this.props;
    return (
      <MapView>
        <MapWrapper>
          {showMarker && (
          <StaticMarker
            pinned={pinMarker}
          />
          )}
          <StyledWebGlMap
            className="locate-me-map"
            onMapDrag={onMapDrag}
          />
        </MapWrapper>
      </MapView>
    );
  }
}

export default LocateMeMap;

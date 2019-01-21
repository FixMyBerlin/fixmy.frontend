/**
 *  Provides means to determine a location using
 *  - the current device location OR
 *  - geocoding
 *  This location mode is passed in as prop.
 *  The location can be adjusted by moving the map around.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import StaticMarker from './StaticMarker';
import ConfirmButton from './ConfirmButton';
import SearchBar from './SearchBar';
import HelpText from './HelpText';
import {
  geocodeAddress,
  reverseGeocodeAddress,
  setTempLocationLngLat,
  confirmLocation
} from '~/pages/Reports/ReportsState';

import LocatorControl from '~/pages/Map/components/LocatorControl';


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

  render() {
    return (
      <MapView>
        <SearchBar onSubmit={geocodeAddress} />
        <HelpText />

        <MapWrapper>
          {!!this.props.locationMode && (
          <StaticMarker
            pinned={!!this.props.location}
          />
          )}
          <StyledWebGlMap
            center={this.props.geocodeResult && this.props.geocodeResult.center}
            zoom={this.props.geocodeResult && this.props.geocodeResult.zoom}
            className="locate-me-map"
            onMapDrag={this.props.reverseGeocodeAddress}
          />
        </MapWrapper>

        <LocatorControl
          key="ReportsLocateMap__LocatorControl"
          onChange={this.props.setTempLocationLngLat}
          position="bottom-right"
        />

        <ConfirmButton
          onConfirm={this.props.confirmLocation}
          text="Diese Position bestätigen"
          disabled={!(this.props.tempLocation && this.props.tempLocation.address)}
        />

      </MapView>
    );
  }
}

const mapDispatchToPros = {
  geocodeAddress,
  reverseGeocodeAddress,
  setTempLocationLngLat,
  confirmLocation
};
export default connect(state => state.ReportsState, mapDispatchToPros)(LocateMeMap);

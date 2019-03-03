/**
 *  Provides means to determine a location using
 *  - the current device location OR
 *  - geocoding
 *  This location mode is passed in as prop.
 *  The location can be adjusted by moving the map around.
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import WebglMap from './WebglMap';
import StaticMarker from './StaticMarker';
import PinLocationButton from './PinLocationButton';
import SearchBar from './SearchBar';
import HelpText from './HelpText';
import ConfirmLocationDialog from './ConfirmLocationDialog';
import ErrorMessage from '~/pages/Reports/components/ErrorMessage';

import {
  LOCATION_MODE_GEOCODING,
  setDeviceLocation,
  geocodeAddress,
  reverseGeocodeAddress,
  setTempLocationLngLat,
  confirmLocation,
  pinLocation,
  resetDialogState,
  removeError
} from '~/pages/Reports/ReportsState';

import LocatorControl from '~/pages/Map/components/LocatorControl';


const MapView = styled.div`
  flex: 1;
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

const AddressIndicator = styled.div`
  font-size: 12px;
  width: 200px;
  height: 100px;
  color: ${config.colors.black};
  z-index: 99999999999999;
  text-align: center;
  font-weight: bold;
  position: absolute;
  margin: auto;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0; // TODO: proper positioning
`;

// TODO: when location is pinned: 1. do not allow map drag

class LocateMeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapHasBeenDragged: false
    };
  }

  onMapMove = ({ lat, lng }) => {
    this.props.reverseGeocodeAddress({ lng, lat });
    this.props.setTempLocationLngLat({ lng, lat });
    if (!this.state.mapHasBeenDragged) {
      this.state.mapHasBeenDragged = true;
    }
  };

  getCenter = () => {
    // either device location or geocodeResult will be set
    if (this.props.deviceLocation) {
      const centerObj = this.props.deviceLocation;
      return [centerObj.lng, centerObj.lat];
    }
    if (this.props.geocodeResult) {
      return this.props.geocodeResult.center;
    }
  };

  getPinned = () => this.props.tempLocation && this.props.tempLocation.pinned;

  onSearchAddress = (text) => {
    this.props.geocodeAddress(text)
      .then(() => {
        const [lng, lat] = this.props.geocodeResult.center;
        this.onMapMove({ lng, lat });
      });
  };

  render() {
    return (
      <MapView>

        {
          this.props.error.message && (
            <ErrorMessage
              message={this.props.error.message}
              onDismiss={this.props.removeError}
            />
          )
        }

        {this.props.locationMode === LOCATION_MODE_GEOCODING && (
          <Fragment>
            {!this.getPinned() && (
              <SearchBar onSubmit={this.onSearchAddress} />
            )}
            {!this.state.mapHasBeenDragged && (
              <HelpText />
            )}
          </Fragment>
        )}


        <MapWrapper>
          {this.props.locationMode && (
          <StaticMarker
            pinned={this.getPinned()}
          />
          )}

          {this.props.tempLocation && this.props.tempLocation.address && (
            <AddressIndicator>{this.props.tempLocation.address}</AddressIndicator>
          )}

          <StyledWebGlMap
            center={this.getCenter()}
            className="locate-me-map"
            onMapDrag={this.onMapMove}
            allowDrag={!this.getPinned()}
          />
        </MapWrapper>

        {!this.getPinned() && (
        <LocatorControl
          key="ReportsLocateMap__LocatorControl"
          onChange={this.props.setDeviceLocation}
          position="bottom-right"
        />
        )}

        {!this.getPinned() && (
        <PinLocationButton
          onConfirm={this.props.pinLocation}
          text="Diese Position bestätigen"
          disabled={!(this.props.tempLocation && this.props.tempLocation.address)}
        />
        )}

        {this.getPinned() && (
          <ConfirmLocationDialog
            onConfirm={this.props.confirmLocation}
            onDecline={this.props.resetDialogState}
            address={this.props.tempLocation.address}
          />
        )}


      </MapView>
    );
  }
}

const mapDispatchToPros = {
  geocodeAddress,
  reverseGeocodeAddress,
  setTempLocationLngLat,
  confirmLocation,
  pinLocation,
  setDeviceLocation,
  resetDialogState,
  removeError
};
export default connect(state => state.ReportsState, mapDispatchToPros)(LocateMeMap);

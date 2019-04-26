/**
 *  Provides means to determine a location using
 *  - the current device location OR
 *  - geocoding
 *  This location mode is passed in as prop.
 *  The location can be adjusted by moving the map around.
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import idx from 'idx';
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
  reverseGeocodeCoordinates,
  setTempLocationLngLat,
  confirmLocation,
  resetDialogState,
  removeError
} from '~/pages/Reports/ReportsState';

import LocatorControl from '~/pages/Map/components/LocatorControl';
import ky from '~/utils/ky';


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
  bottom: 0;
  user-select: none;
`;

const InvalidAdressIndicator = styled(AddressIndicator)`
  color: ${config.colors.error};
`;


let validationBoundary = null; // kept here for caching

class LocateMeMap extends Component {
  static propTypes = {
    onProceed: PropTypes.func
  };

  static defaultProps = {
    onProceed: () => console.log('implement me')
  };


  constructor(props) {
    super(props);
    this.state = {
      mapHasBeenDragged: false,
      locationPinned: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    if (!validationBoundary) {
      await this.getValidationGeodata();
    }
  }

  componentWillUnmount() {
    this.setState({
      mapHasBeenDragged: false,
      locationPinned: false
    });
  }

  async getValidationGeodata() {
    validationBoundary = await ky.get(`${config.reportsLocateMeMap.boundaryGeodataUrl}`).json();
  }

  onMapMove = ({ lat, lng }) => {
    if (!validationBoundary) return;
    this.props.reverseGeocodeCoordinates({ lng, lat }, validationBoundary);
    this.props.setTempLocationLngLat({ lng, lat });
    if (!this.state.mapHasBeenDragged) {
      this.state.mapHasBeenDragged = true;
    }
  };

  getCenter = () => {
    // if component is shown because of backwards navigation, use the center already determined
    const alreadyPickedLocation = idx(this.props, _ => _.newReport.location.lngLat);
    if (alreadyPickedLocation) {
      return [alreadyPickedLocation.lng, alreadyPickedLocation.lat];
    }

    // either device location or geocodeResult will be set
    if (this.props.deviceLocation) {
      const centerObj = this.props.deviceLocation;
      return [centerObj.lng, centerObj.lat];
    }
    if (this.props.geocodeResult) {
      return this.props.geocodeResult.center;
    }
  };

  onSearchAddress = (text) => {
    this.props.geocodeAddress(text)
      .then(() => {
        const [lng, lat] = this.props.geocodeResult.center;
        this.onMapMove({ lng, lat });
      });
  };

  onlocateMeMarkerUse = (coords) => {
    // TODO: make this work. drag the map
    const coordsObj = {
      lng: coords[0],
      lat: coords[1]
    };
    this.props.setDeviceLocation(coordsObj);
    this.onMapMove(coordsObj);
  };

  confirmLocation = () => {
    this.props.confirmLocation(); // update state
    this.props.onProceed(); // update route
  }

  togglePinned = () => {
    this.setState(state => ({
      locationPinned: !state.locationPinned
    }));
  };

  onMapLoad = () => {
    this.setState({ isLoading: false });
  }

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

        {!this.state.isLoading && this.props.locationMode === LOCATION_MODE_GEOCODING && (
          <Fragment>
            {!this.state.locationPinned && (
              <SearchBar onSubmit={this.onSearchAddress} />
            )}
            {!this.state.mapHasBeenDragged && (
              <HelpText />
            )}
          </Fragment>
        )}


        <MapWrapper>
          <StyledWebGlMap
            zoomedOut={this.props.tempLocation && !this.props.tempLocation.valid}
            center={this.getCenter()}
            className="locate-me-map"
            onMapDrag={this.onMapMove}
            allowDrag={!this.state.locationPinned}
            onLoad={this.onMapLoad}
          />

          {
            !this.state.isLoading && (
              <Fragment>
                {this.props.locationMode && (
                  <StaticMarker
                    pinned={this.state.locationPinned}
                  />
                )}

                {this.props.tempLocation && this.props.tempLocation.address && this.props.tempLocation.valid && (
                  <AddressIndicator>{this.props.tempLocation.address}</AddressIndicator>
                )}
                {this.props.tempLocation && !this.props.tempLocation.valid && (
                  <InvalidAdressIndicator>{config.reportsLocateMeMap.outofBoundaryText}</InvalidAdressIndicator>
                )}
              </Fragment>
            )
          }

        </MapWrapper>

        {!this.state.isLoading && (this.props.locationMode === LOCATION_MODE_GEOCODING && !this.state.locationPinned) && (
        <LocatorControl
          key="ReportsLocateMap__LocatorControl"
          onChange={this.onlocateMeMarkerUse}
          position="bottom-right"
        />
        )}

        {!this.state.isLoading && !this.state.locationPinned && (
          <PinLocationButton
            onConfirm={this.togglePinned}
            text="Diese Position bestätigen"
            disabled={!(this.props.tempLocation && this.props.tempLocation.valid && this.props.tempLocation.address)}
          />
        )}

        {this.state.locationPinned && (
          <ConfirmLocationDialog
            onConfirm={this.confirmLocation}
            onDecline={this.togglePinned} // TODO: set pinned to false
            address={this.props.tempLocation.address}
          />
        )}
      </MapView>
    );
  }
}

const mapDispatchToPros = {
  geocodeAddress,
  reverseGeocodeCoordinates,
  setTempLocationLngLat,
  confirmLocation,
  setDeviceLocation,
  resetDialogState,
  removeError
};

export default connect(state => state.ReportsState, mapDispatchToPros)(LocateMeMap);

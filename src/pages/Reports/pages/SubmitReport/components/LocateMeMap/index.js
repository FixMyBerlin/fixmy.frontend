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
import ky from 'ky';

import config from '~/pages/Reports/config';
import logger from '~/utils/logger';
import { media, matchMediaSize, breakpoints } from '~/styles/utils';
import WebglMap from './WebglMap';
import StaticMarker from './StaticMarker';
import PinLocationButton from './PinLocationButton';
import AutocompleteGeocoder from '~/components/AutocompleteGeocoder';
import ErrorMessage from '~/components/ErrorMessage';
import HelpText from './HelpText';
import ConfirmLocationDialog from './ConfirmLocationDialog';
import LocatorControl from '~/pages/Map/components/LocatorControl';
import FMBCredits from '~/pages/Map/components/FMBCredits';
import { actions as errorStateActions } from '~/pages/Reports/state/ErrorState';
import {
  actions as submitReportStateActions,
  selectors as submitReportStateSelectors
} from '~/pages/Reports/state/SubmitReportState';

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

const SearchBarWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 11px;
  left: 68px; /* leave space for zoom controls */
  right: 15px;
  margin: auto;

  ${media.m`
    max-width: 400px;
    margin: 0;
    left: 15px;
    top: 15px;
  `}
`;

const AddressIndicator = styled.div`
  background-color: rgba(255,255,255,0.7);
  padding: 6px;
  border-radius: 2px;
  font-size: 12px;
  width: 200px;
  height: fit-content;
  color: ${config.colors.black};
  z-index: 99999999999999;
  text-align: center;
  font-weight: bold;
  position: absolute;
  top: calc(50% + 40px);
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%) }
  user-select: none;
  pointer-events: none;
`;

const InvalidAdressIndicator = styled(AddressIndicator)`
  color: ${config.colors.error};
`;

let validationBoundary = null; // kept here for caching

class LocateMeMap extends Component {
  static async getValidationGeodata() {
    validationBoundary = await ky
      .get(`${config.reports.locateMeMap.boundaryGeodataUrl}`)
      .json();
  }

  constructor(props) {
    super(props);
    this.state = {
      mapHasBeenDragged: false,
      geocoderUsed: false,
      autocompleteHasFocus: false,
      locationPinned: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    if (!validationBoundary) {
      await LocateMeMap.getValidationGeodata();
    }
  }

  componentWillUnmount() {
    this.setState({
      mapHasBeenDragged: false,
      locationPinned: false
    });
  }

  setAutocompleteHasFocus = (hasFocus) =>
    this.setState({ autocompleteHasFocus: hasFocus });

  onMapMove = (coords) => {
    if (!this.state.mapHasBeenDragged) {
      this.state.mapHasBeenDragged = true;
    }
    this.props.unsetAutomatedPositioning();
    this.reverseGeocodeCoords(coords);
  };

  reverseGeocodeCoords = (coords) => {
    this.props
      .validateCoordinates(validationBoundary, coords)
      .then((isValid) => {
        if (isValid) {
          this.props.reverseGeocodeCoordinates(coords);
          this.props.setTempLocationCoords(coords);
        }
      });
  };

  getCenter = () => {
    // if component is shown because of backwards navigation, use the center already determined
    const { alreadyPickedLocation } = this.props;
    if (alreadyPickedLocation) {
      return alreadyPickedLocation;
    }

    // either device location or geocodeResult will be used to tell the containing
    // web gl map to use a certain center instead of wherever the user has moved the map before
    let centerObj;
    if (this.props.deviceLocation) {
      centerObj = this.props.deviceLocation;
    }
    if (this.props.geocodeResult) {
      centerObj = this.props.geocodeResult;
    }
    return centerObj && [centerObj.lng, centerObj.lat];
  };

  ongeocodeUse = () =>
    this.setState({
      geocoderUsed: true
    });

  ongeocodeSuccess = ({ coords, address }) => {
    this.props
      .validateCoordinates(validationBoundary, coords)
      .then(() => this.props.handleGeocodeSuccess({ coords, address }));
  };

  onDevicePosition = (coords) => {
    const coordsObj = {
      lng: coords[0],
      lat: coords[1]
    };
    this.props.setDeviceLocation(coordsObj);
    this.onMapMove(coordsObj);
  };

  confirmLocation = () => {
    this.props.confirmLocation(); // update state
    try {
      this.props.onProceed(); // update route
    } catch (err) {
      logger('LocateMeMap.props.onProceed failed');
    }
  };

  togglePinned = () => {
    this.setState((state) => ({
      locationPinned: !state.locationPinned
    }));
  };

  onMapLoad = () => {
    this.setState({ isLoading: false });
  };

  getLocatorControlPosition = ({ isDesktopView }) =>
    isDesktopView
      ? { bottom: '128px', right: '15px' }
      : { bottom: '128px', right: '8px' };

  render() {
    // TODO: simplify usage by keeping getIsDesktopView() within styles util
    const isDesktopView = matchMediaSize(breakpoints.m);

    return (
      <MapView>
        {this.props.error.message && (
          <ErrorMessage
            message={this.props.error.message}
            onDismiss={this.props.removeError}
          />
        )}

        {!this.state.isLoading && (
          <>
            {!this.state.locationPinned && (
              <SearchBarWrapper>
                <AutocompleteGeocoder
                  onInputFocus={() => this.setAutocompleteHasFocus(true)}
                  onInputBlur={() => this.setAutocompleteHasFocus(false)}
                  onLocationPick={this.ongeocodeSuccess}
                  onSearchStart={this.ongeocodeUse}
                  searchStringMinLength={
                    config.reports.locateMeMap.geocoder.searchStringMinLength
                  }
                  debounceTime={
                    config.reports.locateMeMap.geocoder.debounceTime
                  }
                  onError={this.props.addError}
                />
              </SearchBarWrapper>
            )}
            {this.state.mapHasBeenDragged || this.state.geocoderUsed ? null : (
              <HelpText />
            )}
          </>
        )}

        <MapWrapper data-cy="reports-locateme-wrapper">
          <StyledWebGlMap
            newLocationZoomLevel={
              config.reports.locateMeMap.zoomOnGeocodedLocation
            }
            zoomedOut={!this.props.tempLocation.valid}
            center={this.getCenter()}
            className="locate-me-map"
            onMapMove={this.onMapMove}
            allowDrag={!this.state.locationPinned}
            onLoad={this.onMapLoad}
            zoomControlPosition={isDesktopView ? 'bottom-right' : 'top-left'}
          />

          {!this.state.isLoading && !this.state.autocompleteHasFocus && (
            <>
              {this.props.locationMode && (
                <StaticMarker pinned={this.state.locationPinned} />
              )}

              {this.props.tempLocation.address &&
                this.props.tempLocation.valid && (
                  <AddressIndicator
                    className="pass-touch"
                    data-cy="reports-locateme-address-valid"
                  >
                    {this.props.tempLocation.address}
                  </AddressIndicator>
                )}
              {!this.props.tempLocation.valid && (
                <InvalidAdressIndicator
                  className="pass-touch"
                  data-cy="reports-locateme-address-invalid"
                >
                  {config.reports.locateMeMap.outofBoundaryText}
                </InvalidAdressIndicator>
              )}
            </>
          )}
        </MapWrapper>

        {!this.state.isLoading &&
          !this.state.autocompleteHasFocus &&
          this.props.isLocationModeGeocoding &&
          !this.state.locationPinned && (
            <LocatorControl
              key="ReportsLocateMap__LocatorControl"
              onChange={this.onDevicePosition}
              customPosition={this.getLocatorControlPosition(isDesktopView)}
            />
          )}

        {!this.state.isLoading &&
          !this.state.autocompleteHasFocus &&
          !this.state.locationPinned && (
            <PinLocationButton
              onConfirm={this.togglePinned}
              text="Diese Position bestätigen"
              disabled={
                !(
                  this.props.tempLocation.valid &&
                  this.props.tempLocation.address
                )
              }
            />
          )}

        {this.state.locationPinned && (
          <ConfirmLocationDialog
            onConfirm={this.confirmLocation}
            onDecline={this.togglePinned} // TODO: set pinned to false
            address={this.props.tempLocation.address}
          />
        )}

        <FMBCredits />
      </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.ReportsState.SubmitReportState,
  error: state.ReportsState.ErrorState,
  // selectors
  isLocationModeGeocoding: submitReportStateSelectors.getLocationIsModeGeocoding(
    state.ReportsState.SubmitReportState
  ),
  alreadyPickedLocation: submitReportStateSelectors.getAlreadyPicketLocation(
    state.ReportsState.SubmitReportState
  )
});
const mapDispatchToProps = {
  ...errorStateActions,
  ...submitReportStateActions
};
export default connect(mapStateToProps, mapDispatchToProps)(LocateMeMap);

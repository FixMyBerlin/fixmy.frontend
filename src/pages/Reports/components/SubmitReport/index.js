/**
 * Wires together dialog components to compile a report.
 * Routes:
 * /meldung-machen --> Rewrite to
 * /meldung-machen/wo    // --> can be used to directly enter this step
 * /meldung-machen/was   // gets the location as a route param
 * /meldung-machen/zusatz-infos
 * /meldung-machen/danke
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  setLocationMode,
  LOCATION_MODE_DEVICE,
  LOCATION_MODE_GEOCODING,
  geocodeAddress,
  reverseGeocodeAddress
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap';
import SearchBar from './SearchBar';
import HelpText from './HelpText';

import LocatorControl from '~/pages/Map/components/LocatorControl';

class SubmitReport extends PureComponent {
  handleLocationChange = () => {
    console.log('implement me');
  }

  render() {
    return (
      <Fragment>

        {!this.props.locationMode && (
        <Fragment>
          <OverviewMapNavBar />
          <LocateModeChooser
            heading="Wo benötigst du neue Fahrradbügel?"
            onUseDevicePosition={this.props.onUseDevicePosition}
            onUseGeocoding={this.props.onUseGeocoding}
          />
        </Fragment>
      )}

        {this.props.locationMode === LOCATION_MODE_GEOCODING && (
          <Fragment>
            <SearchBar onSubmit={geocodeAddress} />
            <HelpText />
          </Fragment>
        )}

        <LocateMeMap
          showMarker={!!this.props.locationMode}
          pinMarker={!!this.props.location}
          center={this.props.geocodeResult && this.props.geocodeResult.center}
          zoom={this.props.geocodeResult && this.props.geocodeResult.zoom}
          onMapDrag={this.props.reverseGeocodeAddress}
        />
        <LocatorControl
          key="ReportsLocateMap__LocatorControl"
          onChange={this.handleLocationChange}
          position="bottom-right"
        />
      </Fragment>
);
  }
}
const mapDispatchToPros = {
  onUseDevicePosition: () => setLocationMode(LOCATION_MODE_DEVICE),
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING),
  geocodeAddress,
  reverseGeocodeAddress
};
export default connect(state => state.ReportsState, mapDispatchToPros)(SubmitReport);

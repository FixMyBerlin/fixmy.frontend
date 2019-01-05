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
import { setLocationMode, LOCATION_MODE_DEVICE, LOCATION_MODE_GEOCODING } from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap';


// TODO: find a way to omit /meldungen when stating subroutes
class SubmitReport extends PureComponent {
  render() {
    return (
      <Fragment>

        {!this.props.location_mode && (
        <Fragment>
          <OverviewMapNavBar />
          <LocateModeChooser
            heading="Wo benötigst du neue Fahrradbügel?"
            onUseDevicePosition={this.props.onUseDevicePosition}
            onUseGeocoding={this.props.onUseGeocoding}
          />
        </Fragment>
      )}

        <LocateMeMap />
      </Fragment>
);
  }
}
const mapDispatchToPros = { // shorthand
  onUseDevicePosition: () => setLocationMode(LOCATION_MODE_DEVICE),
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING)
};
export default connect(state => state.ReportsState, mapDispatchToPros)(SubmitReport);

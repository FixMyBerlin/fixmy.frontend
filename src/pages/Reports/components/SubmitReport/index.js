/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  setLocationMode,
  LOCATION_MODE_DEVICE,
  LOCATION_MODE_GEOCODING
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap';


class SubmitReport extends PureComponent {
  render() {
    const { locationMode, newReport, reportCompiled } = this.props;

    if (!locationMode) {
      return (
        <Fragment>
          <OverviewMapNavBar />
          <LocateModeChooser
            heading="Wo benötigst du neue Fahrradbügel?"
            onUseDevicePosition={this.props.onUseDevicePosition}
            onUseGeocoding={this.props.onUseGeocoding}
          />
        </Fragment>
      );
    }

    if (!(newReport.location && newReport.location.address)) {
      return (
        <LocateMeMap />
      );
    }

    if (!newReport.what) {
      // render mainform
    }

    if (!newReport.additionalInfo) {
      // render additionalInfo form
    }

    if (reportCompiled) {
      // render "Meldung fertig"
    }
  }
}

const mapDispatchToProps = {
  onUseDevicePosition: () => setLocationMode(LOCATION_MODE_DEVICE),
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING)
};

export default connect(state => state.ReportsState, mapDispatchToProps)(SubmitReport);

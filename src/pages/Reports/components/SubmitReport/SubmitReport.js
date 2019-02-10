/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  setLocationMode,
  LOCATION_MODE_GEOCODING,
  useDevicePosition,
  resetDialogState
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap/LocateMeMap';
import WhatsNeeded from './WhatsNeeded';

class SubmitReport extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
  }

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
      return (
        <WhatsNeeded />
      );
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
  onUseDevicePosition: useDevicePosition,
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING),
  resetDialogState
};

export default connect(state => state.ReportsState, mapDispatchToProps)(SubmitReport);

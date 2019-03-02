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
  resetDialogState,
  setIroningNeeds
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap/LocateMeMap';
import IroningsForm from './IroningsForm';
import AdditionalDataForm from './AdditionalDataForm';

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
        <IroningsForm onConfirm={this.props.setIroningNeeds} />
      );
    }

    if (!newReport.additionalInfo) {
     return (
       <AdditionalDataForm myProp="TODO" />
     )
    }

    if (reportCompiled) {
      // render "Meldung fertig"
    }
  }
}

const mapDispatchToProps = {
  onUseDevicePosition: useDevicePosition,
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING),
  resetDialogState,
  setIroningNeeds
};

export default connect(state => state.ReportsState, mapDispatchToProps)(SubmitReport);

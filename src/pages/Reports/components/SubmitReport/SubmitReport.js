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
import FormProgressBar from './FormProgressBar';

class SubmitReport extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
  }

  render() {
    const {
      locationMode,
      newReport,
      reportCompiled,
      tempLocation
    } = this.props;

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
        <Fragment>
          {tempLocation && tempLocation.pinned && (
          <FormProgressBar
            stepNumber={1}
            stepCaption="Ort"
            onBackButtonTap={this.props.resetDialogState}
            style={{ position: 'absolute', zIndex: 999999999999 }} // this is a quick fix. TODO: find a clean solution to not push the mapview down. e.g. using display: note
          />
          )}
          <LocateMeMap />
        </Fragment>
      );
    }

    if (!newReport.what) {
      return (
        <Fragment>
          <FormProgressBar
            stepNumber={2}
            stepCaption="Details"
            onBackButtonTap={this.props.resetDialogState} // W.I.P., TODO: only reset ironings data
          />
          <IroningsForm onConfirm={this.props.setIroningNeeds} />
        </Fragment>
      );
    }

    if (!newReport.additionalInfo) {
     return (
       <AdditionalDataForm myProp="TODO" />
     );
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

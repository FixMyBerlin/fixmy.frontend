/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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

const SubmitReportWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

class SubmitReport extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
  }

  getContentByDialogProgress = () => {
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
  };

  render() {
    return (
      <SubmitReportWrapper>
        {this.getContentByDialogProgress()}
      </SubmitReportWrapper>
    );
  }
}

const mapDispatchToProps = {
  onUseDevicePosition: useDevicePosition,
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING),
  resetDialogState,
  setIroningNeeds
};

export default connect(state => state.ReportsState, mapDispatchToProps)(SubmitReport);

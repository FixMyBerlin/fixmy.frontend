/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { PropagateLoader } from 'react-spinners';
import {
  setLocationMode,
  LOCATION_MODE_GEOCODING,
  useDevicePosition,
  resetDialogState,
  setBikestandNeeds,
  setAdditionalData,
  stepBackDialog,
  removeError,
  submitReport
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap/LocateMeMap';
import BikestandsForm from './BikestandsForm';
import AdditionalDataForm from './AdditionalDataForm';
import FormProgressBar from './FormProgressBar';
import ReportSubmitted from './ReportSubmitted';

const SubmitReportWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// TODO: dedupe-logic in FormProgressBar Element creation, factor out to function

class SubmitReport extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
  }

  getContentByDialogProgress = () => {
    const {
      locationMode,
      newReport,
      submitting,
      tempLocation,
      error
    } = this.props.reportsState;

    if (!locationMode) {
      return (
        <Fragment>
          <OverviewMapNavBar />
          <LocateModeChooser
            heading="Wo benötigst du neue Fahrradbügel?"
            onUseDevicePosition={this.props.onUseDevicePosition}
            onUseGeocoding={this.props.onUseGeocoding}
            error={error}
            removeError={this.props.removeError}
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

    if (!(newReport.what && newReport.what.bikestands)) {
      return (
        <Fragment>
          <FormProgressBar
            stepNumber={2}
            stepCaption="Details"
            onBackButtonTap={() => this.props.stepBackDialog(1)}
          />
          <BikestandsForm onConfirm={this.props.setBikestandNeeds} />
        </Fragment>
      );
    }

    if (!newReport.what.additionalInfo) {
      return (
        <Fragment>
          <FormProgressBar
            stepNumber={3}
            stepCaption="Fotos und Beschreibung"
            onBackButtonTap={() => this.props.stepBackDialog(2)}
          />
          <AdditionalDataForm onConfirm={(formData) => {
            this.props.setAdditionalData(formData);
            this.props.submitReport(this.props.token);
          }}
          />
        </Fragment>
      );
    }

    if (submitting) {
      return (
        <LoaderWrapper>
          <PropagateLoader
            color={`${config.colors.interaction}`}
          />
        </LoaderWrapper>
      );
    }

    // finally
    return (
      <Fragment>
        <FormProgressBar
          stepNumber={4}
          stepCaption="Fertig"
          onBackButtonTap={() => this.props.stepBackDialog(3)}
        />
        <ReportSubmitted error={error} />
      </Fragment>
    );
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
  setBikestandNeeds,
  setAdditionalData,
  stepBackDialog,
  removeError,
  submitReport
};

export default connect(state => ({
  reportsState: state.ReportsState,
  token: state.UserState.token
}), mapDispatchToProps)(SubmitReport);

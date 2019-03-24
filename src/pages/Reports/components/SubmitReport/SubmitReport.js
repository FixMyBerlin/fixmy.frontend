/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { css } from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import { PropagateLoader } from 'react-spinners';
import {
  setLocationMode,
  LOCATION_MODE_GEOCODING,
  useDevicePosition,
  resetDialogState,
  setIroningNeeds,
  setAdditionalData,
  stepBackDialog,
  removeError,
  submitReport
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap/LocateMeMap';
import IroningsForm from './IroningsForm';
import AdditionalDataForm from './AdditionalDataForm';
import FormProgressBar from './FormProgressBar';

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
      submitted,
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
      const navStep = 1;
      return (
        <Fragment>
          {tempLocation && tempLocation.pinned && (
            <FormProgressBar
              stepNumber={navStep}
              stepCaption="Ort"
              onBackButtonTap={this.props.resetDialogState}
            />
          )}
          <LocateMeMap />
        </Fragment>
      );
    }

    if (!(newReport.what && newReport.what.ironings)) {
      const navStep = 2;
      return (
        <Fragment>
          <FormProgressBar
            stepNumber={navStep}
            stepCaption="Details"
            onBackButtonTap={() => this.props.stepBackDialog(navStep - 1)}
          />
          <IroningsForm onConfirm={this.props.setIroningNeeds} />
        </Fragment>
      );
    }

    if (!newReport.what.additionalInfo) {
      const navStep = 3;
      return (
        <Fragment>
          <FormProgressBar
            stepNumber={3}
            stepCaption="Fotos und Beschreibung"
            onBackButtonTap={() => this.props.stepBackDialog(navStep - 1)}
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
            loading={submitting}
          />
        </LoaderWrapper>
      );
    }

    if (submitted) {
      // render "Meldung fertig"
      return (
        <div>
          <h1>DONE!</h1>
          <p>Working on the component..</p>
        </div>
      )
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
  setIroningNeeds,
  setAdditionalData,
  stepBackDialog,
  removeError,
  submitReport
};

export default connect(state => ({
  reportsState: state.ReportsState,
  token: state.UserState.token
}), mapDispatchToProps)(SubmitReport);

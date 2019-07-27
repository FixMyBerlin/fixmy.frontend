/**
 * Renders different components of the dialog to submit a report based on
 * the successively populated reports state
 */

import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';

import {
  setLocationMode,
  LOCATION_MODE_GEOCODING,
  useDevicePosition,
  resetDialogState,
  setBikestandNeeds,
  setAdditionalData,
  setDailyRent,
  removeError,
  submitReport
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/pages/OverviewMap/components/OverviewMapNavBar';
import Markdown from '~/pages/Markdown/Markdown';
import LocateModeChooser from './pages/LocateModeChooser';
import LocateMeMap from './components/LocateMeMap/LocateMeMap';
import BikestandsForm from './pages/BikestandsForm';
import AdditionalDataForm from './pages/AdditionalDataForm';
import FormProgressBar from './components/FormProgressBar';
import ReportSubmitted from './pages/ReportSubmitted';
import BicycleParkingGarageForm from './pages/BicycleParkingGarageForm';

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// TODO: dedupe-logic in FormProgressBar Element creation, factor out to function or use some sort of DialogStep HOC

class SubmitReportDialog extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
    // prevent loading the dialog with a step > 1
    if (+this.props.match.params.step > 1) {
      this.navigateDialog(1);
    }
  }

  navigateDialog = (stepNr) => {
    this.props.history.push(`${this.props.match.path.replace(':step', stepNr)}`);
  }

  abortDialog = () => {
    this.props.resetDialogState();
    this.props.history.push(config.routes.reports.map);
  }

  render = () => {
    let content;

    const { match } = this.props;
    const step = +match.params.step;

    const {
      locationMode,
      newReport,
      tempLocation,
      error,
      submitting
    } = this.props.reportsState;

    const proceed = () => {
      // route change
      this.navigateDialog(step + 1);
      // scroll to top
      window.scroll(0, 0);
    };

    switch (step) {
      case 1:
        content = !locationMode ? (
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
        )
          : (
            <Fragment>
              {tempLocation && tempLocation.pinned && (
                <FormProgressBar
                  stepNumber={1}
                  stepCaption="Ort"
                  onAbortButtonTap={this.abortDialog}
                />
              )}
              <LocateMeMap onProceed={proceed} />
            </Fragment>
          );
        break;

      case 2:
        content = (
          <Fragment>
            <FormProgressBar
              stepNumber={2}
              stepCaption="Details"
              onAbortButtonTap={this.abortDialog}
            />
            <BikestandsForm onConfirm={(stateNode) => {
              this.props.setBikestandNeeds(stateNode);
              proceed();
            }}
            />
          </Fragment>
        );
        break;

      case 3:
        content = (
          <Fragment>
            <FormProgressBar
              stepNumber={3}
              stepCaption="Fotos und Beschreibung"
              onAbortButtonTap={this.abortDialog}
            />
            <AdditionalDataForm onConfirm={(formData) => {
              this.props.setAdditionalData(formData);
              proceed();
            }}

            />
          </Fragment>
        );
        break;

      case 4:
        content = (
          <Fragment>
            <FormProgressBar
              stepNumber={4}
              stepCaption="Parkhaus"
              onAbortButtonTap={this.abortDialog}
            />
            <BicycleParkingGarageForm onConfirm={(dailyRent) => {
              this.props.setDailyRent(dailyRent);
              this.props.submitReport(this.props.token);
              proceed();
            }}
            />
          </Fragment>
        );
        break;

      case 5:
        content = submitting ? (
          <LoaderWrapper>
            <PropagateLoader
              color={`${config.colors.interaction}`}
            />
          </LoaderWrapper>
        ) : (
          <Fragment>
            <FormProgressBar
              stepNumber={5}
              stepCaption="Fertig"
            />
            <ReportSubmitted reportId={newReport.id} error={error} />
          </Fragment>
          );
        break;
      default:
        content = (<Markdown page="nomatch" />);
    } // end of switch statement

    return content;
  };
}

const mapDispatchToProps = {
  onUseDevicePosition: useDevicePosition,
  onUseGeocoding: () => setLocationMode(LOCATION_MODE_GEOCODING),
  resetDialogState,
  setBikestandNeeds,
  setAdditionalData,
  setDailyRent,
  removeError,
  submitReport
};

export default connect(state => ({
  reportsState: state.ReportsState,
  token: state.UserState.token
}), mapDispatchToProps)(SubmitReportDialog);

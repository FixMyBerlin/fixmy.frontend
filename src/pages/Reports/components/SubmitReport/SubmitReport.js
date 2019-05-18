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
  removeError,
  submitReport
} from '~/pages/Reports/ReportsState';
import OverviewMapNavBar from '~/pages/Reports/components/OverviewMap/OverviewMapNavBar';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import LocateModeChooser from './LocateModeChooser';
import LocateMeMap from './LocateMeMap/LocateMeMap';
import BikestandsForm from './BikestandsForm';
import AdditionalDataForm from './AdditionalDataForm';
import FormProgressBar from './FormProgressBar';
import ReportSubmitted from './ReportSubmitted';
import history from '~/history';
import Markdown from '~/pages/Markdown/Markdown';

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

// TODO: dedupe-logic in FormProgressBar Element creation, factor out to function or use some sort of DialogStep HOC

class SubmitReport extends PureComponent {
  componentDidMount() {
    this.props.resetDialogState();
  }

  getStep = (step) => {
    let content;

    const {
      locationMode,
      newReport,
      tempLocation,
      error
    } = this.props.reportsState;

    const proceed = () => this.props.history.push(`${this.props.match.path}/${step + 1}`);

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
            />
            <AdditionalDataForm onConfirm={(formData) => {
              this.props.setAdditionalData(formData);
              this.props.submitReport(this.props.token);
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
              stepCaption="Fertig"
            />
            <ReportSubmitted reportId={newReport.id} error={error} />
          </Fragment>
        );
        break;
      default:
        content = (<div>Hier hat etwas nicht geklappt</div>);
    } // end of switch statement

    return content;
  };

  render() {
    const { match, reportsState } = this.props;

    if (reportsState.submitting) {
      return (
        <LoaderWrapper>
          <PropagateLoader
            color={`${config.colors.interaction}`}
          />
        </LoaderWrapper>
      );
    }

    return (
      <SubmitReportWrapper>
        <Router history={history}>
          <Switch>
            <Route
              path={`${match.path}/:step`}
              render={props => this.getStep(+props.match.params.step)}
            />

            <Redirect to={`${match.path}/1`} />
            <Route render={() => <Markdown page="nomatch" />} />
          </Switch>
        </Router>
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
  removeError,
  submitReport
};

export default connect(state => ({
  reportsState: state.ReportsState,
  token: state.UserState.token
}), mapDispatchToProps)(SubmitReport);

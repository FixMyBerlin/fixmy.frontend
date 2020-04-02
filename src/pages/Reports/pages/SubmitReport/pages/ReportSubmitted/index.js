import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import config from '~/pages/Reports/config';
import Button from '~/components/Button';
import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import ErrorMessage from '~/components/ErrorMessage';
import history from '~/history';
import { addUserToReport } from '~/pages/Reports/apiservice';
import { apiUser } from '~/pages/User/apiservice';

import logger from '~/utils/logger';
import thanksImageFMB from '~/images/reports/reports-thanks.png';
import thanksImageAachen from '~/images/aachen/danke-aachen-02@2x.png';

import AuthForm from './AuthForm';
import { StyledHeading, Text, ThanksImg } from './styledComponents';

const thanksImage =
  config.region === 'aachen' ? thanksImageAachen : thanksImageFMB;

class ReportSubmitted extends PureComponent {
  componentDidMount = async () => {
    this.unlistenToHistory = history.listen((location, action) => {
      if (action === 'POP') {
        // if this is an attempt to navigate backwards ..
        // do not allow navigating back within the dialog, instead route somewhere safe
        this.props.history.push(`${config.routes.reports.map}`);
      }
    });

    if (this.props.token) {
      const userData = await apiUser(this.props.token);
      await addUserToReport(this.props.reportId, userData.id);
    }
  };

  componentWillUnmount() {
    this.unlistenToHistory();
  }

  goToMap = () => {
    const { reportId } = this.props;

    if (!reportId) {
      logger('No id was passed to reveal the report on the map');
      return;
    }

    this.props.history.push(`${config.routes.reports.map}/${reportId}`);
  };

  onErrorClick = () => {
    this.props.history.push(config.routes.reports.landing);
    this.props.removeError();
  };

  render() {
    const { error, token, reportId } = this.props;

    if (error.message) {
      return (
        <ErrorMessage message={error.message} onDismiss={this.onErrorClick} />
      );
    }

    return (
      <DialogStepWrapper>
        <StyledHeading>
          Sie helfen mit, {config.reports.region} radfreundlicher zu machen!
        </StyledHeading>

        <ThanksImg src={thanksImage} data-cy="reports-submitted-image" />

        <Text data-cy="reports-submitted-text">
          {config.reports.thankYouNote.base}{' '}
          {token
            ? config.reports.thankYouNote.loggedIn
            : config.reports.thankYouNote.loggedOut}
        </Text>

        {token ? (
          <Button
            onClick={() => this.goToMap()}
            data-cy="reports-submitted-authenticated-show-report"
          >
            Meldung jetzt anzeigen
          </Button>
        ) : (
          <AuthForm
            reportId={reportId}
            goToMap={() => this.goToMap()}
            nextStep={() => this.props.nextStep()}
          />
        )}
      </DialogStepWrapper>
    );
  }
}

export default withRouter(ReportSubmitted);

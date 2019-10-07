import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';

import Button from '~/components/Button';
import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import ErrorMessage from '~/pages/Reports/components/ErrorMessage';
import history from '~/history';
import { addUserToReport } from '~/pages/Reports/apiservice';
import { apiUser } from '~/pages/User/apiservice';

import thanksImageSrc from '~/images/reports/reports-thanks.png';

import AuthForm from './AuthForm';
import { StyledHeading, Text, ThanksImg } from './styledComponents';

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
      console.error('No id was passed to reveal the report on the map');
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
          Du hilfst mit, Friedrichshain-Kreuzberg radfreundlicher zu machen!
        </StyledHeading>

        <ThanksImg src={thanksImageSrc} />

        <Text>
          Deine Meldung ist nun online! Alle Meldungen werden gesammelt und dann
          dem Bezirksamt am 10. Oktober 2019 übergeben. Die Planer:innen im
          Straßen- und Grünflächenamt prüfen, welche Meldungen umgesetzt werden
          können. Die Ergebnisse siehst du anschließend hier auf der Karte{' '}
          {token
            ? 'und wir benachrichtigen dich an deine im Login hinterlegte E-Mail-Adresse.'
            : 'und wenn du deine E-Mail-Adresse eingibst, benachrichtigen wir dich auch per E-Mail.'}
        </Text>

        {token ? (
          <Button onClick={() => this.goToMap()}>Meldung jetzt anzeigen</Button>
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

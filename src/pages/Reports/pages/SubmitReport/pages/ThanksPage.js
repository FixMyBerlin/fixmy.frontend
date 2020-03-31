import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import config from '~/pages/Reports/config';
import logger from '~/utils/logger';
import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import Button from '~/components/Button';
import history from '~/history';

import letterImageFMB from '~/images/reports/letter.png';
import letterImageAachen from '~/images/aachen/mail-illu-01@2x.png';

const letterImage =
  config.region === 'aachen' ? letterImageAachen : letterImageFMB;

const StyledHeading = styled(Heading)`
  margin: 6px 0 8px 0;
`;

const Text = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.4;
`;

const ThanksImg = styled.img`
  width: 140px;
  margin: 20px auto;
  display: block;
`;

class ThanksPage extends PureComponent {
  componentDidMount = () => {
    this.unlistenToHistory = history.listen((location, action) => {
      if (action === 'POP') {
        // if this is an attempt to navigate backwards ..
        // do not allow navigating back within the dialog, instead route somewhere safe
        this.props.history.push(`${config.routes.reports.map}`);
      }
    });
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

  render() {
    return (
      <DialogStepWrapper>
        <StyledHeading>
          Danke, wir haben dir eine E-Mail geschickt. Klicke dort auf den Link
          zur Bestätigung.
        </StyledHeading>

        <ThanksImg src={letterImage} />

        <Text>
          Sobald du deinen Login aktiviert hast, bekommst du Nachrichten zu
          deiner Meldung und kannst andere Meldungen mit einem Herz
          unterstützen.
        </Text>

        <Button
          onClick={this.goToMap}
          style={{ marginTop: 25, marginBottom: 10 }}
        >
          Meldung anzeigen
          <br />
        </Button>

        <Paragraph>
          Schau dir deine Meldung an und erzähle anderen davon.
        </Paragraph>
      </DialogStepWrapper>
    );
  }
}

export default withRouter(ThanksPage);

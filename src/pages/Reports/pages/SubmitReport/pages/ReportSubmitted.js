import React, { PureComponent } from 'react';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import ErrorMessage from '~/pages/Reports/components/ErrorMessage';
import Button from '~/components/Button';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import { breakpoints } from '~/styles/utils';


import history from '~/history';

const StyledHeading = styled(Heading)`
  margin-top: 6px;
  margin-bottom: 8px;
`;

const Text = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 32px;
`;


// TODO: if possible, actually show the overviewMap ine the background like in Zeplin
// TO-dedupe, buttons are declared and styled a many times within /reports
const MeldungAnzeigenButton = styled(Button)`
  display: block;
  height: 48px;
  width: 80%;
  max-width: 240px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
`;


const StyledInput = styled.input`
  width:100%;
  font-size: 16px;
  border: 0.5px solid ${config.colors.lightgrey};
  border-radius: 2px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  padding: 0 0 0 10px
  margin: 26px 0;
  height: 48px;

  &:focus {
    border-bottom:2px solid ${config.colors.interaction};
  }
`;

// TODO: de-dupe
const StyledCheckbox = styled.input`
  cursor: pointer;
  margin-right: 32px;
  display: inline-block;
  transform: scale(1.5);
  transform-origin: top left;
`;

const StyledCheckboxItem = styled.div`
  display: flex;
  width: 100%;
  max-width: ${breakpoints.m}px;
  margin-bottom: 16px;
`;

// TODO: same here
const StyledCheckboxLabel = styled.label`
   font-size: 10px;
   letter-spacing: 0.2px;
   line-height: 1.4;
   color: ${config.colors.darkgrey};
   cursor: pointer;
`;

// TODO: same here
const AbsendenButton = styled(Button)`
  display: block;
  margin-top: 36px;
  height: 48px;
  width: 167px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);

  &&[disabled] {
    background-color: white;
    color: ${config.colors.darkgrey};
    font-weight: bold;
    cursor: default;
    border: 1px solid ${config.colors.interaction};
    &:hover {
     background-color: ${config.colors.lightgrey};
    }
  }
`;

class ReportSubmitted extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmsDataUsage: false,
      wantsNewsletter: false
    };
  }

  componentDidMount = () => {
    this.unlistenToHistory = history.listen((location, action) => {
      if (action === 'POP') { // if this is an attempt to navigate backwards ..
        // do not allow navigating back within the dialog, instead route somewhere safe
        this.props.history.push(`${config.routes.reports.map}`);
      }
    });
  };

  componentWillUnmount() {
    this.unlistenToHistory();
  }

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  toggleByTick = (e) => {
    const stateProperty = e.target.name;
    this.setState(prevState => ({
      [stateProperty]: !prevState[stateProperty]
    }));
  };

  // TODO: wire to endpoint
  submitEmail = () => {
    console.log(`do something with the email ${ this.state.email}`);
  };

  revealReportOnMap = () => {
    const { reportId } = this.props;
    if (!reportId) {
      console.error('No id was passed to reveal the report on the map');
      return;
    }
    this.props.history.push(`${config.routes.reports.map}/${reportId}`);
  }

  render() {
    const { error } = this.props;

    // TODO: extend error handling. The user should be able to retry the request or at least be navigated back somewhere
    // TODO: factor out leave-email section as component
    if (error.message) return <ErrorMessage message={error.message} />;

    return (
      <DialogStepWrapper>
        <StyledHeading>Danke, dass du mithilfst Friedrichshain-Kreuzberg radfreundlicher zu machen!</StyledHeading>
        <Text>
          Deine Meldung ist nun online, alle Meldungen werden gesammt und dem Bezirksamt am 31.Januar übergeben.
          Die Planer:innen im Straßen- und Grünflächenamt prüfen dann, welche Meldungen umgesetzt werden können.
          Die Ergebnisse siehst du hier auf der Karte.
        </Text>


        <Text>Schau dir Deine Meldung an und erzähle anderen davon</Text>


        <HorizontalRuler />

        <Heading>
          Gib hier deine Emailadresse an, dann senden wir dir eine Nachricht, sobald deine Meldung bearbeitet wurden.
        </Heading>

        <StyledInput
          name="email"
          type="email"
          placeholder="deine Emailadresse"
          value={this.state.email}
          onChange={this.updateEmail}
        />
        <StyledCheckboxItem>
          <StyledCheckbox
            type="checkbox"
            id="data-usage-tick"
            name="confirmsDataUsage"
            value="true"
            checked={this.state.confirmsDataUsage}
            onChange={this.toggleByTick}
          />
          <StyledCheckboxLabel htmlFor="data-usage-tick" style={{ alignSelf: 'flex-start' }}>
            Ich möchte einen Login bei FixMyBerlin erstellen, um über den Fortschritt meiner Meldung informiert zu werden.
          </StyledCheckboxLabel>
        </StyledCheckboxItem>

        <StyledCheckboxItem>
          <StyledCheckbox
            type="checkbox"
            id="newsletter-tick"
            name="wantsNewsletter"
            value="true"
            checked={this.state.wantsNewsletter}
            onChange={this.toggleByTick}
          />
          <StyledCheckboxLabel htmlFor="newsletter-tick" style={{ alignSelf: 'flex-start' }}>
            Ich möchte den FixMyBerlin Newsletter mit Updates zu Planungen erhalten
          </StyledCheckboxLabel>
        </StyledCheckboxItem>

        <AbsendenButton
          onClick={this.submitEmail}
          disabled={!this.state.confirmsDataUsage}
        >Absenden
        </AbsendenButton>

        TODO: Ich habe bereits einen Login

        <MeldungAnzeigenButton onClick={this.revealReportOnMap}>Meine Meldung anzeigen (weiter ohne Login)</MeldungAnzeigenButton>

      </DialogStepWrapper>
    );
  }
}

export default withRouter(ReportSubmitted);

import React, { PureComponent } from 'react';
import ErrorMessage from '../ErrorMessage';
import styled from 'styled-components';
import {breakpoints} from "~/styles/utils";


const Wrapper = styled.div`
  padding: 8px;
  max-width: ${breakpoints.s}px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// TODO: factor this out!. This exact same View is used multiple times within /Reports
const Heading = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  text-align: center;
  margin-bottom: 8px;
`;

// TODO: also de-dupe
const Text = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: ${config.colors.darkgrey};
  margin-top: 0;
  margin-bottom: 32px;
`;

class ReportSubmitted extends PureComponent {
  render() {
    const { error } = this.props;
    // TODO: extend error handling. The user should be able to retry the request or at least be navigigated back somewhere
    if (error.message) return <ErrorMessage message={error.message} />;

    return (
      <Wrapper>
        <Heading>Danke, dass du mithilfst Friedrichshain-Kreuzberg radfreundlicher zu machen!</Heading>
        <Text>Deine Meldung ist nun online und wird am 31. Januar dem Bezirksamt übergeben.</Text>
        <Text>Schau dir Deine Meldung an und erzähle anderen davon</Text>
        <Heading>Gib deine Emailadresse an, damit die Verwaltungsmitarbeiter dir Informationen zum Status deiner Meldung schicken können</Heading>

        <p>TODO: email form as extra component</p>

      </Wrapper>
    );
  }
}

export default ReportSubmitted;

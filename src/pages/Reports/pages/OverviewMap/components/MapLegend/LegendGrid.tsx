import React from 'react';
import styled from 'styled-components';
import config from '~/pages/Reports/config';
import ReportPin from '~/pages/Reports/components/ReportPin';

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

const Header = styled.h2`
  flex-basis: 100%;
  margin: 1em 0;
`;

const LegendCol = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
`;

const LegendItem = styled.div`
  align-items: center;
  color: ${config.colors.lightgrey};
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
  line-height: 1.16;
  & + & {
    margin-top: 10px;
  }
  & img {
    margin-right: 10px;
  }
`;

const LegendGrid = (props) => (
  <LegendWrapper {...props}>
    <Header>Legende</Header>
    <LegendCol>
      <LegendItem>
        <ReportPin status="report_verification" role="presentation" />
        Meldung in Prüfung
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_accepted" role="presentation" />
        Meldung wird nahebei umgesetzt
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_rejected" role="presentation" />
        Meldung abgelehnt
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_inactive" role="presentation" />
        Meldung inaktiv
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <LegendItem>
        <ReportPin status="planning" role="presentation" /> In Planung
      </LegendItem>
      <LegendItem>
        <ReportPin status="execution" role="presentation" /> In Umsetzung
      </LegendItem>
      <LegendItem>
        <ReportPin status="done" role="presentation" /> Fertiggestellt
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);

export default LegendGrid;

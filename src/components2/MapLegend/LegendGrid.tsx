import React from 'react';
import styled from 'styled-components';

import ReportPin from '~/pages/Reports/components/ReportPin';
import config from '~/pages/Reports/config';

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
  color: ${config.colors.darkbg};
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
    <LegendCol>
      <LegendItem>
        <ReportPin status="report_verification" />
        Meldung in Prüfung
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_accepted" />
        Meldung wird nahebei umgesetzt
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_rejected" />
        Meldung abgelehnt
      </LegendItem>
      <LegendItem>
        <ReportPin status="report_inactive" />
        Meldung inaktiv
      </LegendItem>
    </LegendCol>
    <LegendCol>
      <LegendItem>
        <ReportPin status="planning" /> In Planung
      </LegendItem>
      <LegendItem>
        <ReportPin status="execution" /> In Umsetzung
      </LegendItem>
      <LegendItem>
        <ReportPin status="done" /> Fertiggestellt
      </LegendItem>
    </LegendCol>
  </LegendWrapper>
);

export default LegendGrid;

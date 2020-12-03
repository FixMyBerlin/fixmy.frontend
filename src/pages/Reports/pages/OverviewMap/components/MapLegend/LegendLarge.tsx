import React from 'react';
import styled from 'styled-components';
import config from '~/pages/Reports/config';
import { BaseWrapper } from './LegendSmall';
import ReportPin from '~/pages/Reports/components/ReportPin';

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 20px;
`;

const LegendCol = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: 10px;
`;

const LegendItem = styled.div`
  color: ${config.colors.lightgrey};
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
  line-height: 1.16;
  margin-bottom: 10px;
  & img {
    margin-right: 10px;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -18px;
  z-index: 900;
  &:focus {
    outline: none;
    & .close-icon-background {
      fill: ${config.colors.midgrey};
    }
  }
`;

const LegendLarge = ({ onToggle }) => (
  <Wrapper role="complementary" aria-expanded="true" id="reports-map-legend">
    <StyledCloseIcon
      onClick={onToggle}
      alt="Legende schließen"
      aria-controls="reports-map-legend"
    />
    <h2>Legende</h2>
    <LegendWrapper>
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
          <ReportPin status="report_new" /> Neue Meldung
        </LegendItem>
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
  </Wrapper>
);

export default LegendLarge;

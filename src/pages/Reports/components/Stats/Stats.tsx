import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import TickIcon from '~/images/aachen/tick-icon.svg';
import { getReportStatusCaption } from '~/pages/Reports/apiservice';
import ReportPin from '~/pages/Reports/components/ReportPin';
import config from '~/pages/Reports/config';
import { ENTRY_STATUS } from '~/pages/Reports/types';

import Brace from './assets/brace-horizontal.svg';

const ICONS = {
  planning: TickIcon,
};

const Container = styled.div`
  background-color: ${config.colors.darkbg};
  color: ${config.colors.lightgrey};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StatsRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em 3em;
  width: 100%;
  flex-wrap: wrap;
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    display: block;
    font-size: 1.8em;
    font-weight: light;
    line-height: 1.5;
  }
`;

const CountStrong = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    display: block;
    font-family: ${config.titleFont};
    font-size: 2.5em;
    line-height: 1.5;
  }
`;

const PinWrapper = styled.div`
  width: 40px;
`;

const StyledBrace = styled(Brace)`
  flex-base: 100%;
  width: 100%;
  margin: 1em auto;
`;

const ProgressBar = styled.div`
  margin: 0.5em 1em;
  border-radius: 20px;
  height: 40px;
`;

const ProgressSection = styled.div<{ pct: number }>`
  height: 100%;
  width: ${(props) => props.pct || 0}%;
`;

const Stats = () => {
  const [stats, setStats] = useState<Stats>(null);
  useEffect(() => {
    const asyncEffect = async () => {
      setStats(await api.loadStats());
    };
    asyncEffect();
  }, []);

  return (
    <Container>
      <StatsRow>
        <PinWrapper>
          <ReportPin status="report_verification" />
        </PinWrapper>
        <Count>
          <span>1671</span>Meldungen
        </Count>
        <CountStrong>
          <span>8726</span> gemeldete Bügel
        </CountStrong>
      </StatsRow>
      <StatsRow>
        <PinWrapper>
          <ReportPin status="planning" />
        </PinWrapper>
        <Count>
          <span>743</span> Planungen
        </Count>
        <CountStrong>
          <span>4650</span> geplante Bügel
        </CountStrong>
        <StyledBrace />
      </StatsRow>
      <ProgressBar>
        <ProgressSection pct={20}>
          <img src={ICONS.planning} alt={getReportStatusCaption('planning')} />
        </ProgressSection>
      </ProgressBar>
    </Container>
  );
};

export default Stats;

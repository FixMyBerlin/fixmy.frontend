import debug from 'debug';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { loadStats } from '~/pages/Reports/apiservice';
import ReportPin from '~/pages/Reports/components/ReportPin';
import config from '~/pages/Reports/config';
import { ENTRY_STATUS, Stats } from '~/pages/Reports/types';

import Brace from './assets/brace.svg';
import DoneIcon from './assets/icon-done.svg';
import ExecutionIcon from './assets/icon-execution.svg';
import PlanningIcon from './assets/icon-planning.svg';

const logger = debug('fmc:Gastro:Stats');

const ICONS = {
  planning: PlanningIcon,
  execution: ExecutionIcon,
  done: DoneIcon,
};

const LABELS = {
  planning: 'in Planung',
  execution: 'im Bau',
  done: 'wurde umgesetzt',
};

const Container = styled.div`
  background-color: ${config.colors.darkbg};
  color: ${config.colors.lightgrey};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em 0;
  align-items: center;
`;

const StatsRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em 2em;
  width: 100%;
  height: 100px;
  max-width: 400px;
`;

const Count = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  span {
    display: block;
    font-size: 1.8em;
    font-weight: light;
    line-height: 1.5;
  }
`;

const CountStrong = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
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
  display: flex;
  flex-direction: row;
  margin: 0.5em 0;
  height: 40px;
  margin-bottom: 3em;
  width: 100%;
  padding: 0 1.5em;
`;

const ProgressSection = styled.div<{
  pct: number;
  status: ENTRY_STATUS;
  isLeftEdge: boolean;
  isRightEdge: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  width: ${(props) => props.pct || 0}%;
  background-color: ${(props) => config.reports.colors[props.status]};
  border-radius: ${(props) => (props.isLeftEdge ? '20px' : '0')}
    ${(props) => (props.isRightEdge ? '20px' : '0')}
    ${(props) => (props.isRightEdge ? '20px' : '0')}
    ${(props) => (props.isLeftEdge ? '20px' : '0')};

  span {
    position: absolute;
    top: 120%;
    font-size: 12px;
    text-align: center;
    color: ${config.colors.inactivegrey};
  }
`;

const StatsCounter = () => {
  const [stats, setStats] = useState<Stats>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const asyncEffect = async () => {
      try {
        setStats(await loadStats());
      } catch (err) {
        logger(err);
        setStats(null);
      }
      setLoading(false);
    };
    asyncEffect();
  }, []);

  if (isLoading == null) return <p>Wird geladen...</p>;
  if (stats == null)
    return (
      <p>
        Leider kann der Zähler bisheriger Meldungen und Planungen derzeit nicht
        angezeigt werden.
      </p>
    );

  const getBarRatio = (status: string): number =>
    (100.0 * stats.planningsByStatus[status]) / stats.plannings;

  return (
    <Container>
      <StatsRow>
        <PinWrapper>
          <ReportPin status="report_verification" />
        </PinWrapper>
        <Count>
          <span>{stats.reports}</span>Meldungen
        </Count>
        <CountStrong>
          <span>{stats.reportsBikeStands}</span> gemeldete Bügel
        </CountStrong>
      </StatsRow>
      <StatsRow>
        <PinWrapper>
          <ReportPin status="planning" />
        </PinWrapper>
        <Count>
          <span>{stats.plannings}</span> Planungen
        </Count>
        <CountStrong>
          <span>{stats.planningsBikeStands}</span> geplante Bügel
        </CountStrong>
      </StatsRow>
      <StyledBrace />
      <ProgressBar>
        {['planning', 'execution', 'done'].map(
          (status: ENTRY_STATUS, i: number, arr: string[]) => {
            const Icon = ICONS[status];
            return (
              <ProgressSection
                pct={getBarRatio(status)}
                status={status}
                isLeftEdge={i === 0}
                isRightEdge={i === arr.length - 1}
              >
                <Icon alt={LABELS[status]} />
                <span>
                  {LABELS[status]} <br />
                  {stats.planningsByStatus[status]}
                </span>
              </ProgressSection>
            );
          }
        )}
      </ProgressBar>
    </Container>
  );
};

export default StatsCounter;

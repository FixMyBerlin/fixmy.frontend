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

const Container = styled.div<{ compact: boolean }>`
  align-items: center;
  background-color: ${config.colors.darkbg};
  color: ${config.colors.lightgrey};
  display: flex;
  flex-direction: column;
  padding: ${({ compact }) => (compact ? '5px 0' : '1em 0')};
  width: 100%;
  z-index: 1000;
  font-size: ${({ compact }) => (compact ? '12px' : 'initial')};
`;

const StatsRow = styled.div<{ compact: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: ${({ compact }) => (compact ? 'initial' : '100px')};
  justify-content: space-between;
  max-width: 350px;
  padding: ${({ compact }) => (compact ? '5px' : '0.5em 0')};
  width: 85%;
`;

const Count = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;

  span {
    display: block;
    font-size: 1.8em;
    font-weight: light;
    line-height: 1.5;
  }
`;

const CountStrong = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
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

const ProgressBar = styled.div<{ compact: boolean }>`
  display: flex;
  flex-direction: row;
  height: 40px;
  margin: ${({ compact }) => (compact ? '0.5em 0' : '0.5em 0 3em')};
  padding: 0 1.5em;
  width: 100%;
`;

const ProgressSection = styled.div<{
  pct: number;
  status: ENTRY_STATUS;
  isLeftEdge: boolean;
  isRightEdge: boolean;
}>`
  align-items: center;
  background-color: ${(props) => config.reports.colors[props.status]};
  border-radius: ${(props) => (props.isLeftEdge ? '20px' : '0')}
    ${(props) => (props.isRightEdge ? '20px' : '0')}
    ${(props) => (props.isRightEdge ? '20px' : '0')}
    ${(props) => (props.isLeftEdge ? '20px' : '0')};
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  position: relative;
  width: ${(props) => props.pct || 0}%;

  span {
    color: ${config.colors.inactivegrey};
    font-size: 12px;
    min-width: 5em;
    position: absolute;
    text-align: center;
    top: 120%;
  }
`;

const StatsCounter = ({
  className = null,
  compact = false,
  stats,
  isLoading,
}) => {
  if (isLoading == null) return <p>Wird geladen...</p>;
  if (stats == null) return null;

  const getBarRatio = (status: string): number =>
    (100.0 * stats.planningsByStatus[status]) / stats.plannings;

  return (
    <Container className={className} compact={compact}>
      <StatsRow compact={compact}>
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
      <StatsRow compact={compact}>
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
      <ProgressBar compact={compact}>
        {['planning', 'execution', 'done'].map(
          (status: ENTRY_STATUS, i: number, arr: string[]) => {
            const Icon = ICONS[status];
            return (
              <ProgressSection
                pct={getBarRatio(status)}
                status={status}
                isLeftEdge={i === 0}
                isRightEdge={i === arr.length - 1}
                key={`progress-section-${status}`}
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

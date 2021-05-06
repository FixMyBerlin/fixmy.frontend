import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import { ENTRY_STATUS } from '~/pages/Reports/types';

import Brace from './assets/brace-horizontal.svg';
import DoneIcon from './assets/icon-done.svg';
import ExecutionIcon from './assets/icon-execution.svg';
import PlanningIcon from './assets/icon-planning.svg';

const ICONS = {
  planning: PlanningIcon,
  execution: ExecutionIcon,
  done: DoneIcon,
};

const LABELS = {
  planning: 'in Planung',
  execution: 'im Bau',
  done: 'wurden umgesetzt',
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
  flex-direction: column;
  height: ${({ compact }) => (compact ? 'initial' : '100px')};
  justify-content: center;
  padding: ${({ compact }) => (compact ? '5px' : '0.5em 0')};
`;

const Count = styled.div`
  display: block;
  font-family: ${config.titleFont};
  font-size: 3em;
  line-height: 1.5;
`;

const CountCaption = styled.div`
  text-align: center;
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
  status: ENTRY_STATUS | 'loading';
  isLeftEdge: boolean;
  isRightEdge: boolean;
}>`
  align-items: center;
  background-color: ${(props) =>
    props.status === 'loading'
      ? config.colors.darkgrey
      : config.reports.colors[props.status]};
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
  getDisplayValue,
}) => {
  const getBarRatio = (status: string): number =>
    (100.0 * stats.planningsByStatus[status]) / stats.plannings;

  return (
    <Container className={className} compact={compact}>
      <StatsRow compact={compact}>
        <Count>{getDisplayValue('reportsBikeStands')}</Count>{' '}
        <CountCaption>
          von Bürger*innen gemeldete <br />
          Fahrradbügelwünsche
        </CountCaption>
      </StatsRow>
      <StyledBrace />
      <ProgressBar compact={compact}>
        {!stats?.planningsByStatus ? (
          <ProgressSection pct={100} status="loading" isLeftEdge isRightEdge>
            Planungen werden gezählt...
          </ProgressSection>
        ) : (
          ['planning', 'execution', 'done'].map(
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
          )
        )}
      </ProgressBar>
    </Container>
  );
};

export default StatsCounter;

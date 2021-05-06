import React from 'react';
import styled from 'styled-components';

import { StatsCounter, StatsExpanded } from '~/pages/Reports/components/Stats';
import config from '~/pages/Reports/config';

import { BaseWrapper } from './LegendCollapsed';
import LegendGrid from './LegendGrid';
import CloseIcon from './close.svg';

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -18px;
  z-index: 1100;
  &:focus {
    outline: none;
    & .close-icon-background {
      fill: ${config.colors.midgrey};
    }
  }
`;

const Header = styled.h2`
  font-size: 1em;
  margin-bottom: 0;
`;

const StyledStatsCounter = styled(StatsCounter)`
  margin-bottom: 2em;
`;

const StyledLegendGrid = styled(LegendGrid)<{ compact: boolean }>`
  h2 {
    font-size: ${({ compact }) => (compact ? '1em' : 'initial')};
  }
`;

const LegendExpanded = ({ onToggle, compact = false }) => (
  <Wrapper role="complementary" id="reports-map-legend">
    <StyledCloseIcon
      onClick={onToggle}
      aria-label="Legende schließen"
      aria-controls="reports-map-legend"
      role="button"
    />
    {config.reports.stats.enabled && (
      <>
        <Header>Was passiert mit den gemeldeten Radbügelwünschen?</Header>
        <StyledStatsCounter
          animate
          component={StatsExpanded}
          compact={compact}
        />
      </>
    )}
    <StyledLegendGrid compact={compact} />
  </Wrapper>
);

export default LegendExpanded;

import React from 'react';
import styled from 'styled-components';
import { StatsCounter, StatsExpanded } from '~/pages/Reports/components/Stats';
import config from '~/pages/Reports/config';
import { ModalCloseIcon } from '../ModalCloseIcon/ModalCloseIcon';
import { BaseWrapper } from './LegendCollapsed';
import LegendGrid from './LegendGrid';

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
  z-index: 1100;
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
    <ModalCloseIcon
      onClick={onToggle}
      label="Legende schließen"
      controlsId="reports-map-legend"
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

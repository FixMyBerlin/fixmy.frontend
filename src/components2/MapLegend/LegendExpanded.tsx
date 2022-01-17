import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

import LegendGrid from './LegendGrid';
import CloseIcon from './close.svg';

const BaseWrapper = styled.section`
  background-color: ${config.colors.lightbg};
  bottom: 0;
  color: ${config.colors.darkbg};
  display: flex;
  position: relative;
  width: 100%;
  line-height: 1.4;
  min-width: 400px;

  ${media.s`
    padding: 0;
  `}

  ${media.m`
    bottom: initial;
    position: absolute;
    left: 15px;
    top: 95px;
    width: 40vw;
    max-width: 24em;
    font-size: 1.5625vw;
  `}

  ${media.l`
    font-size: 16px;
  `}

  ${media.xl`
    left: 15px;
    top: 95px;
  `}
`;

const Wrapper = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
  z-index: 1100;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: ${config.colors.lightgrey};
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: -18px;
  z-index: 1200;
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

const StyledLegendGrid = styled(LegendGrid)<{ compact: boolean }>`
  h2 {
    font-size: ${({ compact }) => (compact ? '1em' : 'initial')};
  }
`;

const LegendListWrapper = styled.div`
  overflow-y: scroll;
  padding: 0.625rem 1.2rem;
`;

const LegendExpanded = ({ onToggle, compact = false }) => (
  <Wrapper role="complementary">
    <StyledCloseIcon
      onClick={onToggle}
      aria-label="Legende schließen"
      aria-controls="reports-map-legend"
      role="button"
    />
    <LegendListWrapper>
      <Header>Legende Unfälle</Header>
      <StyledLegendGrid compact={compact} />

      <Header>Legende Kataster</Header>
      <StyledLegendGrid compact={compact} />
    </LegendListWrapper>
  </Wrapper>
);

export default LegendExpanded;

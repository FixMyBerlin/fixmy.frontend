import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

// This positions the legend-container outside the article grid.
const LegendContainer = styled.div`
  background-color: ${config.colors.lightbg};
  border: 1px solid ${config.colors.lightgrey};
  margin: 0 -16px 1em -16px;
  border-top: none;
  overflow: auto;

  ${media.m`
    margin: 0 auto;
    padding: 0 1em 1em 1em;
  `}

  ${media.l`
    margin: 0 -5em 0 auto;
    width: calc(100% - 24px + 5em);
  `}

  ${media.xl`
    margin: 0 -5em 0 auto;
    width: calc(100% - 151px + 5em);
  `}
`;

const LegendGrid = styled.div`
  font-size: 0.75em;
  padding: 0 1em 1em 1em;

  ${media.s`
    font-size: 1em;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  `}
`;

export const Legend: React.FC = ({ children }) => (
  <LegendContainer>
    <LegendGrid>{children}</LegendGrid>
  </LegendContainer>
);

export const LegendCol = styled.div``;

export const LegendItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5em;

  ${media.m`
    gap: 0;
  `}
`;

export const LegendHeader = styled.h3`
  font-size: 1.2em;
  margin: 1em 0 0.5em;
  font-weight: bold;

  ${media.s`
    font-size: 1em;
    margin: 1.5em 0 1em;
  `}
`;

export const LegendItem = styled.div`
  align-items: center;
  color: ${config.colors.darkgrey};
  display: flex;
  flex-direction: row;
  line-height: 1.16;

  ${media.m`
    & + & {
      margin-top: .5em;
    }
  `}
`;

export const LegendSources = styled.div`
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: ${config.colors.darkgrey};
  margin-top: 1em;

  a:not(:hover) {
    border-bottom: none;
  }

  ${media.s`
    margin-top: 0;
    line-height: 1.25rem;
    grid-column: span 2 / span 2;
  `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

import React from 'react';
import styled from 'styled-components';
import config from '~/config';
import { media } from '~/styles/utils';

// This positions the legend-container outside the article grid.
const LegendContainer = styled.div`
  background-color: ${config.colors.lightbg};
  border: 1px solid ${config.colors.lightgrey};
  margin-top: 0;
  margin-right: -16px;
  margin-bottom: 1em;
  margin-left: -16px;
  border-top: none;
  overflow: auto;

  ${media.s`
    padding: 0 1em 1em 1em;
  `}

  ${media.m`
    margin-top: 0;
    margin-right: auto;
    margin-left: auto;
  `}

  ${media.l`
    margin-right: -5em;
    width: calc(100% - 24px + 5em);
  `}

  ${media.xl`
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

type LegendProps = { children: React.ReactNode };

export const Legend: React.FC<LegendProps> = ({ children }) => (
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
  hyphens: auto;

  ${media.m`
    gap: 0;
  `}
`;

export const LegendHeader = styled.h3`
  font-size: 1.2em;
  margin: 1em 0 0.5em;
  font-weight: bold;

  ${({ onClick }) => onClick && `cursor: pointer;`}

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

  ${({ onClick }) => onClick && `cursor: pointer;`}

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

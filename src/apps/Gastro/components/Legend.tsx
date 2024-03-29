import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

const LegendOuter = styled.div`
  background-color: ${config.colors.lightbg};
  border: 1px solid ${config.colors.lightgrey};
  margin: 1em -16px;
  border-top: none;

  ${media.m`
    margin: 0 -16px;
    padding: 1em;
    padding-bottom: .5em;
  `}
`;

const LegendInner = styled.div`
  margin-top: -1.5em;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.75em;

  ${media.m`
    font-size: 1em;
  `}
`;

export const Legend = ({ children, ...props }) => (
  <LegendOuter {...props}>
    <LegendInner>{children}</LegendInner>
  </LegendOuter>
);

export const LegendCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1em;

  &:last-child {
    flex: 1;
  }
`;

export const LegendItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LegendHeader = styled.h3`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  font-weight: normal;
  margin: 1em 0 0.5em;
  flex-basis: 100%;
  color: ${config.colors.darkbg};

  ${media.m`
    // font-size: 1em;
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
  `};
`;

export const LegendSources = styled.div`
  font-size: 12px;
  flex: 1 0 100%;
  color: ${config.colors.darkgrey};
  margin: 1em 0 0;
  line-height: 1.3;

  ${media.s`
    margin: 2em 0 0;
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

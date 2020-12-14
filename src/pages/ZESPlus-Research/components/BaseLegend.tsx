import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

import config from '~/config';

const LegendOuter = styled.div`
  background-color: ${config.colors.lightbg};
  border: 1px solid ${config.colors.lightgrey};
  margin: 1em -16px;

  ${media.m`
    margin: 0 auto;
    padding: 1em;
  `}

  ${media.xl`
    margin: 0 0 0 auto;
    width: calc(100% - 151px);
  `}
`;

const LegendInner = styled.div`
  margin-top: -1.5em;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
  font-size: 1em;
  margin: 1.5em 0 1em;
`;

export const LegendItem = styled.div`
  align-items: center;
  color: ${config.colors.darkgrey};
  display: flex;
  flex-direction: row;
  line-height: 1.16;
  & + & {
    margin-top: 10px;
  }
`;

export const LegendSources = styled.div`
  font-size: 0.75em;
  flex: 1 0 100%;
  color: ${config.colors.darkgrey};
  margin: 2em 0 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

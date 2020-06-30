import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

const Wrapper = styled.div`
  background-color: ${config.colors.lightbg};
  padding: 1rem;
  margin: 2em -20px;

  ${media.m`
    margin: 3em auto;
    padding: 3em 32px;
  `}
`;

const Title = styled.div`
  color: ${config.colors.darkbg};
  font-size: 1.5rem;
  margin-bottom: 1em;
`;

const Source = styled.div`
  color: #999;
  font-size: 0.75rem;
  margin-top: 8px;

  ${media.m`
    margin-top: 2em;
  `}
`;

interface Props {
  title: string;
  source?: string;
  children: React.ReactNode;
}

const BarChartWrapper = ({ title, source = null, children }: Props) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
    {source && <Source>{source}</Source>}
  </Wrapper>
);

export default BarChartWrapper;

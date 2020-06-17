import React from 'react';
import styled from 'styled-components';

import config from '~/config';

const Wrapper = styled.div`
  background-color: ${config.colors.lightbg};
  padding: 16px;
  margin: 20px 0;

  @media screen and (min-width: 800px) {
    padding: 22px 32px;
  }
`;

const Title = styled.div`
  color: ${config.colors.darkbg};
  font-size: 24px;
  margin-bottom: 15px;
`;

const Source = styled.div`
  color: #999;
  font-size: 12px;
  margin-top: 10px;
`;

interface BarChartWrapperProps {
  title: string;
  source: string;
  children: React.ReactNode;
}

export default ({ title, source, children }: BarChartWrapperProps) => (
  <Wrapper>
    <Title>{title}</Title>
    {children}
    <Source>{source}</Source>
  </Wrapper>
);

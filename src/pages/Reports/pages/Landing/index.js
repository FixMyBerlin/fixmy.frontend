import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import TopSection from './components/TopSection/index';
import { media } from '~/styles/utils';

import AachenLanding from './aachen';
import BerlinLanding from './berlin';

const ContentWrapper = styled.div`
  max-width: 568px;
  margin: 0 auto;
  padding: 0 16px 20px 16px;

  ${media.m`
    padding: 0 24px 40px 24px;
  `}
`;

const RegionalLandingContent = () => {
  if (config.region === 'aachen') return <AachenLanding />;

  return <BerlinLanding />;
};

export default () => (
  <>
    <TopSection toUrl={`${config.routes.reports.new}`} />
    <ContentWrapper>
      <RegionalLandingContent />
    </ContentWrapper>
  </>
);

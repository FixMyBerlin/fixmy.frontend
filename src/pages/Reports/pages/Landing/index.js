import React, { Fragment } from 'react';
import styled from 'styled-components';

import TopSection from './components/TopSection/index';
import JoinButton from './components/JoinButton';
import HowItWorksSection from './components/HowItWorksSecion';
import Quote from './components/Quote';
import MapLink from './components/MapLink';
import Faq from './components/Faq';
import Footer from '~/components/Menu/MenuFooter';
import { media } from '~/styles/utils';

const ContentWrapper = styled.div`
  max-width: 568px;
  margin: 0 auto;
  padding: 0 16px 20px 16px;

  ${media.m`
    padding: 0 24px 40px 24px;
  `}
`;

export default () => (
  <Fragment>
    <TopSection toUrl={`${config.routes.reports.new}`} />
    <ContentWrapper>
      <HowItWorksSection />
      <JoinButton />
      <MapLink />
      <Quote />
      <Faq />
      <JoinButton />
      <MapLink />
    </ContentWrapper>
    <Footer />
  </Fragment>
);

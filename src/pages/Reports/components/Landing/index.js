import React, { Fragment } from 'react';
import styled from 'styled-components';
import TopSection from './TopSection';
import SectionDivider from './SectionDivider';
import JoinButton from './JoinButton';
import HowItWorksSection from './HowItWorksSection';
import QuoteSection from './QuoteSection';
import FaqSection from './FaqSection';
import Footer from '~/components/Menu/MenuFooter';

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 568px;
  margin: 0 auto 20px auto;
`;

export default () => (
  <Fragment>
    <TopSection toUrl={`${config.routes.reports.map}`} />
    <ContentWrapper>
      <SectionDivider />
      <HowItWorksSection />
      <JoinButton />
      <QuoteSection />
      <FaqSection />
      <JoinButton />
    </ContentWrapper>
    <Footer />
  </Fragment>
);

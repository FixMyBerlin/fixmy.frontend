import React from 'react';
import styled from 'styled-components';
import TopSection from './TopSection';
import SectionDivider from './SectionDivider';
import JoinInButton from './JoinInButton';
import HowItWorksSection from './HowItWorksSection';
import QuoteSection from './QuoteSection';
import FaqSection from './FaqSection';
import Footer from '~/components/Menu/MenuFooter';

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 568px;
  margin-left: auto;
  margin-right: auto;
`;

export default () => (
  <div>
    <TopSection toUrl={`${config.routes.reports.map}`} />
    <ContentWrapper>
      <SectionDivider />
      <HowItWorksSection />
      <JoinInButton toUrl={`${config.routes.reports.new}`} />
      <QuoteSection />
      <FaqSection />
      <JoinInButton toUrl={`${config.routes.reports.new}`} />
    </ContentWrapper>
    <Footer />
  </div>
);

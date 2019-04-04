import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TopSection from './TopSection';
import SectionDivider from './SectionDivider';
import JoinInButton from './JoinInButton';
import HowItWorksSection from './HowItWorksSection';
import QuoteSection from './QuoteSection';
import FaqSection from './FaqSection';
import Footer from '~/components/Menu/MenuFooter';
import { breakpoints } from '~/styles/utils';

const StyledReportsMapLink = styled(Link)`
  display: block;
  margin: 18px auto 32px;
  width: 182px;
  color: ${config.colors.interaction};
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: ${breakpoints.m}px;
  margin-left: auto;
  margin-right: auto;
`;

export default () => (
  <div>
    <TopSection toUrl={`${config.routes.reports.new}`} />
    <ContentWrapper>
      <SectionDivider />
      <HowItWorksSection />
      <JoinInButton toUrl={`${config.routes.reports.new}`} />

      <QuoteSection />
      <FaqSection />
      <JoinInButton toUrl={`${config.routes.reports.new}`} />
      <StyledReportsMapLink to={`${config.routes.reports.map}`}>
          Hier geht’s zum aktuellen Stand der Umfrage &gt;
      </StyledReportsMapLink>
    </ContentWrapper>
    <Footer />
  </div>
);

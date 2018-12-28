import React from 'react';
import styled from 'styled-components';
import TopSection from '~/pages/Reports/components/Landing/TopSection';
import SectionDivider from '~/pages/Reports/components/SectionDivider';
import JoinInButton from '~/pages/Reports/components/Landing/JoinInButton';
import HowItWorksSection from '~/pages/Reports/components/Landing/HowItWorksSection';
import QuoteSection from '~/pages/Reports/components/Landing/QuoteSection';
import FaqSection from '~/pages/Reports/components/Landing/FaqSection';
import Footer from '~/components/Menu/MenuFooter';

const StyledReportsMapLink = styled.a`
  display: block;
  margin: 18px auto 32px;
  width: 182px;
  color: #fabe28;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
`;

export default () => (
  <div>
    <TopSection toUrl="/meldungen/wo" />
    <SectionDivider />
    <HowItWorksSection />
    <JoinInButton toUrl="/meldungen/wo" />

    <QuoteSection />
    <FaqSection />
    <JoinInButton toUrl="/meldungen/wo" />
    <StyledReportsMapLink>
      Hier geht’s zum aktuellen Stand der Umfrage &gt;
    </StyledReportsMapLink>
    <Footer />
  </div>
);

import React from 'react';
import styled from 'styled-components';
import { Link} from 'react-router-dom';
import TopSection from './TopSection';
import SectionDivider from './SectionDivider';
import JoinInButton from './JoinInButton';
import HowItWorksSection from './HowItWorksSection';
import QuoteSection from './QuoteSection';
import FaqSection from './FaqSection';
import Footer from '~/components/Menu/MenuFooter';

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

export default () => (
  <div>
    <TopSection toUrl="/meldungen/meldung-machen" />
    <SectionDivider />
    <HowItWorksSection />
    <JoinInButton toUrl="/meldungen/meldung-machen" />

    <QuoteSection />
    <FaqSection />
    <JoinInButton toUrl="/meldungen/meldung-machen" />
    <StyledReportsMapLink to="/meldungen/karte">
      Hier geht’s zum aktuellen Stand der Umfrage &gt;
    </StyledReportsMapLink>
    <Footer />
  </div>
);

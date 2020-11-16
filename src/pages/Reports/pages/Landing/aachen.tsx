import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import CTA from './components/CTA';
import HowItWorksSection from './components/HowItWorksSecion';
import Quote from './components/QuoteAachen';
import MapLink from './components/MapLink';
import Faq from './components/Faq';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import FahrRadLogo from '~/images/aachen/fahr-rad-logo@2x.png';
import config from '~/pages/Reports/config';

const BottomLogo = styled.img`
  margin: 5em auto 3em;
  width: 192px;
  ${media.m`
    display: none;
  `};
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HR = styled(HorizontalRuler)`
  margin-top: 2em;
`;

const AachenLanding = () => (
  <>
    <HowItWorksSection />
    <HR className="light" />
    <Quote />
    <CTA />
    {config.reports.enabled && <MapLink />}
    <HR className="light" />
    <Faq />
    <CTA />
    {config.reports.enabled && <MapLink />}
    <LogoWrapper>
      <BottomLogo src={FahrRadLogo} />
    </LogoWrapper>
  </>
);

export default AachenLanding;

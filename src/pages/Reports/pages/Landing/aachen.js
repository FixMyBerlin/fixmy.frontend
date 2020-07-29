import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import JoinButton from './components/JoinButton';
import HowItWorksSection from './components/HowItWorksSecion';
import Quote from './components/QuoteAachen';
import MapLink from './components/MapLink';
import Faq from './components/Faq';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import FahrRadLogo from '~/images/aachen/fahr-rad-logo@2x.png';

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

const AachenLanding = () => (
  <>
    <HowItWorksSection />
    <HorizontalRuler className="light" />
    <Quote />
    <JoinButton />
    <MapLink />
    <HorizontalRuler className="light" />
    <Faq />
    <JoinButton />
    <MapLink />
    <LogoWrapper>
      <BottomLogo src={FahrRadLogo} />
    </LogoWrapper>
  </>
);

export default AachenLanding;

import React from 'react';
import styled from 'styled-components';

import FahrRadLogo from '~/images/aachen/fahr-rad-logo@2x.png';
import LogoAachen from '~/images/aachen/logo-stadt-aachen@2x.png';
import HorizontalRuler from '~/pages/Reports/components/HorizontalRuler';
import { StatsCounter } from '~/pages/Reports/components/Stats';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

import AboveFold from './components/AboveFold';
import BelowFold from './components/BelowFold';
import CTA from './components/CTA';
import Faq from './components/Faq';
import Intro from './components/Intro';
import MapLink from './components/MapLink';
import Quote from './components/QuoteAachen';

const TopLogo = styled.img`
  position: absolute;
  top: 2em;
  right: 2em;
  width: 92px;

  ${media.m`
    top: 2em;
    right: 2em;
    width: 148px;
  `}
`;

const CenterLogo = styled.img`
  display: none;

  ${media.m`
    display: block;
    width: 80px;
    position: absolute;
    top: 2em;
  `};
`;

const StyledHeading = styled.h2`
  font-family: '${config.titleFont}', sans-serif;
  font-size: 3em;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: white;
  margin-bottom: 39px;

  ${media.m`
  font-size: 4em;
`}
`;

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
    <AboveFold>
      <CenterLogo src={FahrRadLogo} alt="Logo Fahr-Rad Aachen" />
      <TopLogo
        src={LogoAachen}
        alt="Logo Stadt Aachen"
        data-cy="reports-landing-logo"
      />
      <StyledHeading data-cy="reports-landing-header">
        {config.reports.landing?.title}
      </StyledHeading>
    </AboveFold>
    <BelowFold>
      <Intro />
      <StatsCounter />
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
    </BelowFold>
  </>
);

export default AachenLanding;

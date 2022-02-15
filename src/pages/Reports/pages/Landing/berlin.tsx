import React from 'react';
import styled from 'styled-components';

import HorizontalRuler from '~/pages/Reports/components/HorizontalRuler';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

import AboveFold from './components/AboveFold';
import BelowFold from './components/BelowFold';
import CTA from './components/CTA';
import Faq from './components/Faq';
import Intro from './components/Intro';
import LogoFooter from './components/LogoFooter';
import { QuoteWeisbrich } from './components/QuoteWeisbrich';

const CenterLogo = styled.img`
  display: block;
  width: 92px;

  ${media.m`
    position: absolute;
    top: 2em;
  `}
`;

const StyledHeading = styled.h2`
  font-family: '${config.titleFont}', sans-serif;
  font-size: 2.3rem;
  font-weight: bold;
  line-height: 1.25;
  text-align: center;
  color: white;
  margin-bottom: 3rem;

  ${media.m`
    font-size: 3rem;
  `}
`;

const StyledHR = styled(HorizontalRuler)`
  margin: 4em 0;
`;

const BerlinLanding = () => (
  <>
    <AboveFold>
      <CenterLogo
        src={config.reports.landing.logo.source}
        alt="Logo FixMyBerlin"
        data-cy="reports-landing-logo"
      />
      <StyledHeading data-cy="reports-landing-header">
        {config.reports.landing?.title}
      </StyledHeading>
    </AboveFold>
    <BelowFold>
      <Intro />
      <CTA />
      <StyledHR className="light" />
      <QuoteWeisbrich />
      <StyledHR className="light" />
      <Faq />
      <CTA />
      {config.reports.landing.logoFooter && <LogoFooter />}
    </BelowFold>
  </>
);

export default BerlinLanding;

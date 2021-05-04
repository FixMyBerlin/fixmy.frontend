import React from 'react';
import styled from 'styled-components';

import { LinkStyle, RouterLink } from '~/components2/Link';
import { StatsCompact, StatsCounter } from '~/pages/Reports/components/Stats';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

import LegendGrid from './LegendGrid';

export const BaseWrapper = styled.section`
  background-color: ${config.colors.darkbg};
  bottom: 0;
  color: ${config.colors.white};
  display: flex;
  padding: 5px 10px;
  position: relative;
  width: 100%;
  line-height: 1.4;

  ${media.s`
    padding: 0.625rem 1.2rem;
  `}

  ${media.m`
    bottom: initial;
    position: absolute;
    right: 24px;
    top: 24px;
    width: 40vw;
    max-width: 24em;
    font-size: 1.5625vw;
  `}

  ${media.l`
    font-size: 16px;
  `}

  ${media.xl`
    right: 45px;
    top: 45px;
  `}
`;

const WrapperSmall = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  display: none;
  font-size: 1.4em;
  margin: 0.8em 0 0;

  @media (min-height: 800px) {
    font-size: 1.6em;
    margin: 1em 0 0;
    display: block;
  }
`;

const Header2 = styled.h1`
  font-size: 1em;
  margin: 0.5em 0 0;
  display: block;
`;

const StyledLink = styled(RouterLink)`
  background: none;
  border-color: ${config.colors.lightgrey};
  color: ${config.colors.white};
  padding-left: 0;
`;

const LinkButton = styled(LinkStyle('button'))`
  align-self: flex-end;
  background: none;
  border-color: ${config.colors.lightgrey};
  color: ${config.colors.white};
  padding-left: 0;
`;

const MobileLinkButton = styled(LinkButton)`
  ${media.l`
    display: none;
  `}
`;

const StyledLegendGrid = styled(LegendGrid)`
  display: none;
  ${media.l`
    display: flex;
  `}
`;

const LegendCollapsed = ({ onToggle }) => {
  if (config.reports.stats.enabled) {
    return (
      <WrapperSmall role="complementary">
        <Header2>Was passiert mit den Meldungen?</Header2>
        <StatsCounter component={StatsCompact} />
        <LinkButton onClick={onToggle}>weitere Details</LinkButton>
      </WrapperSmall>
    );
  }

  return (
    <WrapperSmall role="complementary">
      <Header>Alle Meldungen und Planungen</Header>
      <p>
        Auf dieser Karte sehen Sie alle von Bürger:innen eingereichten Meldungen
        und Planungen der Verwaltung für neue Radbügelstandorte.{' '}
        <StyledLink to={config.routes.reports.landing}>
          Mehr Informationen
        </StyledLink>
      </p>

      <MobileLinkButton onClick={onToggle}>Legende anzeigen</MobileLinkButton>
      <StyledLegendGrid />
    </WrapperSmall>
  );
};

export default LegendCollapsed;

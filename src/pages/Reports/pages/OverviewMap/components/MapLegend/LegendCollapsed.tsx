import React from 'react';
import styled from 'styled-components';
import { LinkStyle, RouterLink } from '~/components2/Link';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';
import LegendGrid from './LegendGrid';

export const BaseWrapper = styled.section`
  background-color: ${config.colors.darkbg};
  bottom: 0;
  color: ${config.colors.white};
  display: flex;
  padding: 10px 20px;
  position: relative;
  width: 100%;

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

const LegendCollapsed = ({ onToggle }) => (
  <WrapperSmall role="complementary">
    <Header>Alle Meldungen und Planungen</Header>
    <p>
      Auf dieser Karte sehen Sie alle von Bürger:innen eingereichten Meldungen
      für neue Radbügelstandorte.{' '}
      <StyledLink to={config.routes.reports.landing}>
        Auf der Startseite
      </StyledLink>{' '}
      erfahren Sie mehr über die Hintergründe.
    </p>
    <LinkButton onClick={onToggle}>Legende anzeigen</LinkButton>
    <StyledLegendGrid />
  </WrapperSmall>
);

export default LegendCollapsed;

import React from 'react';
import styled from 'styled-components';
import { LinkStyle, RouterLink } from '~/components2/Link';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

export const BaseWrapper = styled.section`
  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
  padding: 10px 20px;
  background-color: ${config.colors.darkbg};
  color: ${config.colors.white};
`;

const WrapperSmall = styled(BaseWrapper)`
  display: flex;
  flex-direction: column;

  & h2 {
    display: none;
    font-size: 1.4em;
    margin: 0.8em 0 0;
  }

  @media (min-height: 800px) {
    h2 {
      display: block;
    }
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
`;

const LegendSmall = ({ onToggle }) => (
  <WrapperSmall role="complementary">
    <p>
      Auf dieser Karte sehen Sie alle von Bürger:innen eingereichten Meldungen
      für neue Radbügelstandorte.{' '}
      <StyledLink to={config.routes.reports.landing}>
        Auf der Startseite
      </StyledLink>{' '}
      erfahren Sie mehr über die Hintergründe.
    </p>
    <LinkButton onClick={onToggle} aria-expanded="false">
      Legende anzeigen
    </LinkButton>
  </WrapperSmall>
);

export default LegendSmall;

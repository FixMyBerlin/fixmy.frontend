import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '~/components2/Article';
import config from '~/config';
import { media } from '~/styles/utils';
import LogoBMBF from './assets/logo-bmbf.png';
import LogoBMBF2 from './assets/logo-bmbf@2x.png';
import LogoBMBF3 from './assets/logo-bmbf@3x.png';
import LogoFONA from './assets/logo-fona.svg';

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;

  ${media.l`
    flex-direction: row;
    /* flex-wrap: wrap; */
  `}

  ${media.xl`
    max-width: 900px;
  `}
`;

const LogoGrid1 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin: 1em auto;

  ${media.m`
    width: 518px;
  `}

  ${media.l`
    width: 598px;
  `}

  ${media.xl`
    width: auto;
  `}
`;

const Text = styled(Paragraph)`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  font-size: 0.8em;
  color: ${config.colors.darkgrey};
`;

const StyledLogoFONA = styled(LogoFONA)`
  width: 120px;
  margin: 0 1em;

  ${media.m`
    margin: 0 2em;
  `}
`;

export const Logos: React.VFC = () => (
  <Footer>
    <LogoGrid1>
      <StyledLogoFONA />
      <img
        src={LogoBMBF2}
        srcSet={`${LogoBMBF} 1x, ${LogoBMBF2} 2x, ${LogoBMBF3} 3x`}
        alt="Logo Bundesministerium für Bildung und Forschung"
      />
    </LogoGrid1>
    <Text>
      Das Bundesministerium für Bildung und Forschung (BMBF) fördert das Projekt
      NUDAFA im Rahmen der Strategie „Forschung für Nachhaltigkeit“ (FONA,
      www.fona.de) im Förderschwerpunkt Sozial-ökologische Forschung unter dem
      Förderkennzeichen 01UV2124. Die Verantwortung für den Inhalt dieser
      Veröffentlichung liegt bei den Autoren.
    </Text>
  </Footer>
);

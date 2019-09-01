import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/reports/noun-bicycle.svg';
import { media } from '~/styles/utils';
import Steps from './Steps';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  ${media.m`
    padding: 80px 0;
  `}
`;

const Headline = styled.p`
  color: black;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
`;

const StyledIcon = styled(BikeIcon)`
  width: 144px;
  margin: 20px 0;

  ${media.m`
    margin: 40px 0;
  `}
`;

const StyledQuestion = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 19px;
  line-height: 1.37;
`;

const stepsConfig = [
  {
    step: 1,
    text: 'Alle Berliner:innen können melden wo neue Bügel benötigt werden.',
    color: config.colors.interaction // TODO: use actual colors
  }, {
    step: 2,
    text: 'Alle Meldungen, die bis zum 15. September eingehen, übergeben wir gesammelt an den Bezirk.',
    color: '#ff99d5' // TODO: add to colors config
  }, {
    step: 3,
    text: 'Die Meldungen werden vom Bezirksamt geprüft.',
    color: '#cf0a7d' // TODO: add to colors config
  }, {
    step: 4,
    text: 'Sofern sie umsetzbar sind, werden sie noch in diesem Jahr installiert.',
    color: config.colors.black
  }
];

export default () => (
  <StyledSection>
    <Headline>
      Damit du dein Fahrrad überall sicher abschließen kannst, installiert das Bezirksamt Friedrichshain-Kreuzberg
      neue Fahrradbügel. Da du als Bürger:in am besten weißt, wo du dein Fahrrad abstellst,
      kannst du hier melden, wo genau im Bezirk du neue Bügel benötigst.
    </Headline>
    <StyledIcon alt="Icon Fahrradparkplätze" />
    <StyledQuestion>Wie läuft das ab?</StyledQuestion>
    <Steps steps={stepsConfig} />
  </StyledSection>
);

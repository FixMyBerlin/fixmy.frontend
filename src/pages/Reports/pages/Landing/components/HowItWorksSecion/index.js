import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/reports/noun-bicycle.svg';
import { media } from '~/styles/utils';
import Steps from './Steps';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;

  ${media.m`
    padding: 80px 0 0 0;
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
  font-size: 22px;
  font-weight: bold;
  margin: 32px 0 19px 0;
  line-height: 1.37;
`;

const stepsConfig = [
  {
    step: 1,
    text: 'Du meldest, wo neue Bügel benötigt werden.',
    color: config.colors.interaction
  }, {
    step: 2,
    text: 'Alle Meldungen, die bis zum 10. Oktober eingegangen sind, werden vom Bezirksamt geprüft.',
    color: '#ff99d5' // TODO: add to colors config
  }, {
    step: 3,
    text: 'Sofern sie umsetzbar sind, werden die Bügel noch in diesem Jahr installiert.',
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
    <HorizontalRuler className="light" />
    <StyledQuestion>Wie läuft das ab?</StyledQuestion>
    <Steps steps={stepsConfig} />
  </StyledSection>
);

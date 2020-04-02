import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
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
  font-size: 1.7em;
  font-family: ${config.titleFont}, 'sans-serif';
  font-weight: bold;
  margin: 32px 0 19px 0;
  line-height: 1.37;
`;

export default () => (
  <StyledSection>
    <Headline>{config.reports.intro}</Headline>
    <StyledIcon alt="Icon Fahrradparkplätze" />
    <HorizontalRuler className="light" />
    <StyledQuestion>Wie läuft das ab?</StyledQuestion>
    <Steps steps={config.reports.steps} />
  </StyledSection>
);

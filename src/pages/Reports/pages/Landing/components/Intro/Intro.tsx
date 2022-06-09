import React from 'react';
import styled from 'styled-components';

import HorizontalRuler from '~/pages/Reports/components/HorizontalRuler';
import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';

/* eslint-disable import/no-unresolved */
import BikeIcon from '~/images/reports/noun-bicycle.svg?component';

import Steps from './Steps';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem auto;

  ${media.m`
    margin: 5em auto 2em;
  `}
`;

const Headline = styled.p`
  color: black;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
`;

const Text = styled(Headline)`
  font-weight: normal;
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
  font-family: '${config.titleFont}', sans-serif;
  font-weight: bold;
  margin: 32px 0 19px 0;
  line-height: 1.37;
`;

const content = config.reports.enabled
  ? config.reports.landing.reportsActive
  : config.reports.landing.reportsInactive;

const Intro = () => (
  <StyledSection>
    <Headline>{content.intro}</Headline>
    <StyledIcon alt="Icon Fahrradparkplätze" />
    {content.sections?.map((sec: { heading: string; text: string }) => (
      <React.Fragment key={`section-${sec.heading}`}>
        <Headline>{sec.heading}</Headline>
        <Text>{sec.text}</Text>
      </React.Fragment>
    ))}
    {content.steps && (
      <>
        <HorizontalRuler className="light" />
        <StyledQuestion>Wie läuft das ab?</StyledQuestion>
        <Steps steps={content.steps} />
      </>
    )}
  </StyledSection>
);

export default Intro;

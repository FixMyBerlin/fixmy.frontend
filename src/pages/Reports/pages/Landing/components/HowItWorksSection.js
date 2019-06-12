import React from 'react';
import styled from 'styled-components';

import BikeIcon from '~/images/reports/noun-bicycle.svg';
import { media } from '~/styles/utils';
import List from '~/components/List';

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

export default () => (
  <StyledSection>
    <Headline>
      Gemeinsam mit dem Bezirksamt Friedrichshain-Kreuzberg versuchen wir herauszufinden: <br />
      Wo genau im Bezirk werden Radabstellplätze gebraucht?
    </Headline>
    <StyledIcon alt="Icon Fahrradparkplätze" />
    <StyledQuestion>Wie läuft das ab?</StyledQuestion>
    <List>
      <List.ListItem>Meldet uns bis zum 31. Januar 2018 wo Fahrradbügel benötigt sind (das dauert ca. 30 Sekunden)</List.ListItem>
      <List.ListItem>Wir sammeln alle Meldungen und übergeben diese dem Bezirk.</List.ListItem>
      <List.ListItem>Die Meldungen werden geprüft und sofern umsetzbar nach und nach vom Bezirk abgearbeitet.</List.ListItem>
      <List.ListItem>Alle Meldungen bekommen öffentliches Feedback auf der Plattform</List.ListItem>
    </List>
  </StyledSection>
);

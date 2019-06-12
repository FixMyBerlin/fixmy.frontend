import React from 'react';
import styled from 'styled-components';

import NounBycicleIcon from '~/images/reports/noun-bicycle.svg';
import { media } from '~/styles/utils';
import List from '~/components/List';

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 34px;
  padding-right: 34px;
`;

const StyledEssenceText = styled.p`
  margin-top: 44px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 44px;

  ${media.m`
    margin-top: 88px;
    margin-bottom: 88px;
  `}
`;

const StyledNounBycicleIcon = styled(NounBycicleIcon)`
  width: 144px;
  margin-bottom: 32px;
`;

const StyledQuestion = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 19px;
  line-height: 1.37;
`;

export default () => (
  <StyledSection>
    <StyledEssenceText>
      Gemeinsam mit dem Bezirksamt Friedrichshain-Kreuzberg versuchen wir herauszufinden: <br />
      Wo genau im Bezirk werden Radabstellplätze gebraucht?
    </StyledEssenceText>
    <StyledNounBycicleIcon alt="Icon Fahrradparkplätze" />
    <StyledQuestion>Wie läuft das ab?</StyledQuestion>
    <List>
      <List.ListItem>Meldet uns bis zum 31. Januar 2018 wo Fahrradbügel benötigt sind (das dauert ca. 30 Sekunden)</List.ListItem>
      <List.ListItem>Wir sammeln alle Meldungen und übergeben diese dem Bezirk.</List.ListItem>
      <List.ListItem>Die Meldungen werden geprüft und sofern umsetzbar nach und nach vom Bezirk abgearbeitet.</List.ListItem>
      <List.ListItem>Alle Meldungen bekommen öffentliches Feedback auf der Plattform</List.ListItem>
    </List>
  </StyledSection>
);

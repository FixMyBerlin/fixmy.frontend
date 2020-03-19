import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';

import Portrait from '~/images/reports/aachen_marcel_philipp.jpg';
import SubHeading from '~/pages/Reports/pages/SubmitReport/components/SubHeading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';

const QuoteSection = styled.div`
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  margin: 50px 0;
  max-width: 320px;
  padding: 28px 8px 58px 8px;
  margin: 0 auto;
`;

const Img = styled.img`
  width: 144px;
  display: block;
  margin: 0 auto;
`;

const BlockQuote = styled.blockquote`
  text-align: center;
  font-style: italic;
  margin: 20px 0 28px 0;
`;

const SourcePerson = styled(SubHeading)`
  margin-bottom: 0;
`;

const SourceFunction = styled(Paragraph)`
  margin-top: 0;
  font-size: 12px;
`;

export default () => (
  <QuoteSection>
    <Img src={Portrait} alt="Oberbürgermeister Marcel Phillip" />
    <BlockQuote>
      „Wir benötigen mehr Sicherheit und mehr Raum für den Radverkehr in Aachen,
      dazu gehören auch mehr Fahrradabstellanlagen. In den letzten Wochen haben
      mir viele Bürgerinnen und Bürger sowie die Initiatoren des Radentscheids
      Standortvorschläge für Fahrradbügel geschickt, diese wurden in das jetzt
      freigeschaltete Online-Tool bereits eingearbeitet und zum großen Teil
      durch die Verwaltung geprüft.“
    </BlockQuote>
    <SourcePerson>Marcel Philipp</SourcePerson>
    <SourceFunction>Oberbürgermeister</SourceFunction>
  </QuoteSection>
);
